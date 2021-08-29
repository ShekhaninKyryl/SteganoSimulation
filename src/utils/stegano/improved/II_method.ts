import { FileSystem, IMinificatedCluster } from "../../../entities/FileSystem/FileSystem";
import { getSteganoMessageImproved } from "../../message/getSteganoMessage";
import { getPermutation } from "../../permutation/getPermutation";
import { usePermutation } from "../../permutation/usePermutation";
import { splitByFiles } from "../splitByFiles";
import { replaceClustersImproved } from "./replaceClustersImproved";



export const II_Improved = (message: Boolean[] | string, fileSystem: FileSystem) => {
  let { basic, ...rest } = getSteganoMessageImproved(message, fileSystem);

  const initState = fileSystem.getMinState();
  const fsIndexes = initState.map(iS => iS.fsIndex);
  let endState: IMinificatedCluster[] = [];
  const copyOfInitState = [...initState];

  basic.forEach(s => {
    const foundIndex = copyOfInitState.findIndex(iS => iS.file === s);
    endState.push(copyOfInitState[foundIndex]);
    copyOfInitState.splice(foundIndex, 1);
  });

  copyOfInitState
    .sort((a, b) => a.file - b.file)
    .forEach(iS => endState.push(iS));
  endState = endState.map((eS, index) => ({ ...eS, fsIndex: fsIndexes[index] }));

  const splited = splitByFiles(endState);

  splited.forEach((clusters, index) => {
    if (!rest[index]) return;
    replaceClustersImproved(clusters, rest[index]);
  })

  endState = splited.reduce((result: IMinificatedCluster[], state) => {
    return [...result, ...state]
  });
  const permutations = getPermutation(initState, endState);
  console.log(permutations);
  usePermutation(permutations, fileSystem);
}