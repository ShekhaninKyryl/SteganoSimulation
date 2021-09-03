import { ErrorTypes } from "../../../constants/customError";
import CustomError from "../../../entities/CustomError/CustomError";
import { FileSystem, IMinificatedCluster } from "../../../entities/FileSystem/FileSystem";
import Statistics from "../../../entities/Statistics/Statistics";
import { getSteganoMessageImproved } from "../../message/getSteganoMessage";
import { getPermutation } from "../../permutation/getPermutation";
import { usePermutation } from "../../permutation/usePermutation";
import { splitByFiles } from "../splitByFiles";
import { isEnoughImproved } from "./isEnoughImproved";
import { replaceClustersImproved } from "./replaceClustersImproved";



export const IV_Improved = (message: Boolean[] | string, fileSystem: FileSystem) => {
  let { basic, ...rest } = getSteganoMessageImproved(message, fileSystem);

  if (!isEnoughImproved({ basic, ...rest }, fileSystem)) throw new CustomError({
    message: ErrorTypes.MessageToLarge,
    basic: basic,
    improved: rest,
    fileSystem: fileSystem,
  });

  const statistic = new Statistics();
  statistic
    .setStartState(Object.assign({}, fileSystem))
    .setMessage(message);


  const initState = fileSystem.getMinState();
  const fsIndexes = initState.map(iS => iS.fsIndex);
  let endState: IMinificatedCluster[] = [];
  const copyOfInitState: IMinificatedCluster[] = JSON.parse(JSON.stringify(initState));

  basic.forEach((s, index) => {
    const foundUnmovedIndex = copyOfInitState.findIndex((iS, iSIndex) => iS.file === s && !iS.moved && index === iSIndex);
    const foundIndex = foundUnmovedIndex === -1 ? copyOfInitState.findIndex(iS => iS.file === s && !iS.moved) : foundUnmovedIndex;
    endState.push({ ...copyOfInitState[foundIndex], fsIndex: fsIndexes[index], moved: foundUnmovedIndex !== -1 ? false : undefined });
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
  endState = endState.sort((a, b) => a.fsIndex - b.fsIndex);


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

  statistic
    .setEndState(Object.assign({}, fileSystem))
    .setPermutation(permutations)
    .calculateClustersRead()
    .calculateClustersWrite()
    .calculateMemorySize()
    .calculateHeaderMoves();

  console.log(statistic);
}