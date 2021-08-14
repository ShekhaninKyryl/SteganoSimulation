import { FileSystem, IMinificatedCluster } from "../../../entities/FileSystem/FileSystem";
import { getPermutation } from "../../permutation/getPermutation";
import { convertBooleanToStegano } from "../../message/convertBooleanToStegano";
import { convertStringToBoolean } from "../../message/convertStringToBoolean";
import { usePermutation } from "../../permutation/usePermutation";



export const III_Basic = (message: Boolean[] | string, fileSystem: FileSystem) => {
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

  steganoMessage.forEach((s, index) => {
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
  endState = endState.sort((a, b) => a.fsIndex - b.fsIndex);

  const permutations = getPermutation(initState, endState);
  usePermutation(permutations, fileSystem);
}