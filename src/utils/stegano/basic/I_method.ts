import { FileSystem } from "../../../entities/FileSystem/FileSystem";
import { getSteganoMessage } from "../../message/getSteganoMessage";
import { isEnoughBasic } from "./isEnoughBasic";


export const I_Basic = (message: Boolean[] | string, fileSystem: FileSystem) => {
  let steganoMessage = getSteganoMessage(message, fileSystem);


  if (!isEnoughBasic(steganoMessage, fileSystem)) throw new Error(`Message too large
   ${steganoMessage}`);



  const { files } = fileSystem;

  const spreadClustersIndex: { [key: number]: number[] } = { };
  steganoMessage.forEach((steganoBlock, index) => {
    if (spreadClustersIndex[steganoBlock] === undefined) spreadClustersIndex[steganoBlock] = [];
    spreadClustersIndex[steganoBlock].push(index)
  });

  const newFs = new FileSystem({ size: fileSystem.clusters.length, fileOptions: files.map(f => ({ color: f.color, name: f.name, sizeInClusters: 0 })) });

  newFs.files.forEach((file, index) => {
    if (spreadClustersIndex[index] === undefined) spreadClustersIndex[index] = [];
    file.setUpNewClasters(spreadClustersIndex[index], true);
  });

  let availableClusterIndexes = files.reduce((res, f) => ([...res, ...f.clusters.map(c => c.fsIndex)]), [] as number[]);

  newFs.files.forEach((f, index) => f.addMissingClusters(fileSystem.files[index].clusters.length - f.clusters.length, availableClusterIndexes));

  return newFs;
}