import { FileSystem } from "../../../entities/FileSystem/FileSystem";
import { ISteganoMessageImproved } from "../../message/getSteganoMessage";

export const isEnoughImproved = (steganoMessage: ISteganoMessageImproved, fileSystem: FileSystem) => {
  return fileSystem.files.every((file, index) =>
    file.clusters.length >= steganoMessage.basic.filter(sM => sM === index).length
    && file.clusters.length >= (steganoMessage[index] || []).length + 1)
};

