import { FileSystem, IMinificatedCluster } from "../../../entities/FileSystem/FileSystem";
import { getSteganoMessage } from "../../message/getSteganoMessage";
import { getPermutation } from "../../permutation/getPermutation";
import { usePermutation } from "../../permutation/usePermutation";



export const IV_Basic = (message: Boolean[] | string, fileSystem: FileSystem) => {
  let steganoMessage = getSteganoMessage(message, fileSystem);

  const initState = fileSystem.getMinState();
  const fsIndexes = initState.map(iS => iS.fsIndex);
  let endState: IMinificatedCluster[] = [];
  const copyOfInitState: IMinificatedCluster[] = JSON.parse(JSON.stringify(initState));

  steganoMessage.forEach((s, index) => {
    const foundUnmovedIndex = copyOfInitState.findIndex((iS, iSIndex) => iS.file === s && !iS.moved && index === iSIndex);
    const foundIndex = foundUnmovedIndex === -1 ? copyOfInitState.findIndex(iS => iS.file === s && !iS.moved) : foundUnmovedIndex;
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