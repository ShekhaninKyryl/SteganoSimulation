import { FileSystem, IMinificatedCluster } from "../../../entities/FileSystem/FileSystem";
import { getSteganoMessageImproved } from "../../message/getSteganoMessage";
import { getPermutation } from "../../permutation/getPermutation";
import { usePermutation } from "../../permutation/usePermutation";
import { splitByFiles } from "../splitByFiles";
import { replaceClustersImproved } from "./replaceClustersImproved";



export const III_Improved = (message: Boolean[] | string, fileSystem: FileSystem) => {
  let { basic, ...rest } = getSteganoMessageImproved(message, fileSystem);

  const initState = fileSystem.getMinState();
  const fsIndexes = initState.map(iS => iS.fsIndex);
  let endState: IMinificatedCluster[] = [];
  const copyOfInitState: IMinificatedCluster[] = JSON.parse(JSON.stringify(initState));

  basic.forEach((s, index) => {
    const foundIndex = copyOfInitState.findIndex(iS => iS.file === s && !iS.moved);
    endState.push({ ...copyOfInitState[foundIndex], fsIndex: fsIndexes[index] });
    copyOfInitState[foundIndex].moved = true;
  });

  copyOfInitState.forEach((currentInitState, index) => {
    if (currentInitState.moved) return;
    const currentEndState = endState[index];
    if (currentEndState) {
      const foundFirstMoved = copyOfInitState.find(iS => iS.moved && !endState.find(eS => eS.fsIndex === iS.fsIndex));
      if (!foundFirstMoved) {
        endState.push(currentInitState);
        return
      }
      endState.push({ ...currentInitState, fsIndex: foundFirstMoved.fsIndex });
      return;
    }
    endState.push(currentInitState);
  });

  const splited = splitByFiles(endState);

  splited.forEach((clusters, index) => {
    if (!rest[index]) return;
    replaceClustersImproved(clusters, rest[index]);
  })

  endState = splited.reduce((result: IMinificatedCluster[], state) => {
    return [...result, ...state]
  });

  const permutations = getPermutation(initState, endState);
  usePermutation(permutations, fileSystem);
}