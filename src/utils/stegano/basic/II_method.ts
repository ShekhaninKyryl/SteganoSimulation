import { FileSystem, IMinificatedCluster } from "../../../entities/FileSystem/FileSystem";
import { getPermutation } from "../../permutation/getPermutation";
import { convertBooleanToStegano } from "../../message/convertBooleanToStegano";
import { convertStringToBoolean } from "../../message/convertStringToBoolean";
import { usePermutation } from "../../permutation/usePermutation";



export const II_Basic = (message: Boolean[] | string, fileSystem: FileSystem) => {
  const bitPerCluster = Math.log2(fileSystem.files.length);
  let steganoMessage: number[] = [];
  switch (typeof message) {
    case "string": {
      steganoMessage = convertBooleanToStegano(convertStringToBoolean(message), bitPerCluster);
      break;
    }
    case "object": {
      steganoMessage = convertBooleanToStegano(message, bitPerCluster);
      break;
    }
  };

  const initState = fileSystem.getMinState();
  const fsIndexes = initState.map(iS => iS.fsIndex);
  let endState: IMinificatedCluster[] = [];
  const copyOfInitState = [...initState];

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
}