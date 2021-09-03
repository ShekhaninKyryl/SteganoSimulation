import { FileSystem, IMinificatedCluster } from "../../../entities/FileSystem/FileSystem";
import { getPermutation } from "../../permutation/getPermutation";
import { usePermutation } from "../../permutation/usePermutation";
import { getSteganoMessage } from "../../message/getSteganoMessage";
import { isEnoughBasic } from "./isEnoughBasic";
import CustomError from "../../../entities/CustomError/CustomError";
import { ErrorTypes } from "../../../constants/customError";
import Statistics from "../../../entities/Statistics/Statistics";



export const II_Basic = (message: Boolean[] | string, fileSystem: FileSystem) => {
  let steganoMessage = getSteganoMessage(message, fileSystem);
  
  if (!isEnoughBasic(steganoMessage, fileSystem)) throw new CustomError({
    message: ErrorTypes.MessageToLarge,
    basic: steganoMessage,
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

  steganoMessage.forEach(s => {
    const foundIndex = copyOfInitState.findIndex(iS => iS.file === s);
    endState.push(copyOfInitState[foundIndex]);
    copyOfInitState.splice(foundIndex, 1);
  });

  copyOfInitState
    .sort((a, b) => a.file - b.file)
    .forEach(iS => endState.push(iS));
  endState = endState.map((eS, index) => ({ ...eS, fsIndex: fsIndexes[index] }));

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