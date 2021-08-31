import { FileSystem } from "../../../entities/FileSystem/FileSystem";
import { ISteganoMessage } from "../../message/getSteganoMessage";

export const isEnoughBasic = (steganoMessage: ISteganoMessage, fileSystem: FileSystem) => {
  return fileSystem.files.every((file, index) => file.clusters.length >= steganoMessage.filter(sM => sM === index).length)
};

