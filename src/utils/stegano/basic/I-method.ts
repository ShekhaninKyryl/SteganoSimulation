import { FileSystem } from "../../../entities/FileSystem/FileSystem";
import { convertBooleanToStegano } from "../../message/convertBooleanToStegano";
import { convertStringToBoolean } from "../../message/convertStringToBoolean";


export const I_Basic = (message: Boolean[] | string, fileSystem: FileSystem) => {
  const bitPerCluster = Math.log2(fileSystem.files.length);
  let steganoMessage: number[] = [];
  switch (typeof message) {
    case "string": {
      steganoMessage = convertBooleanToStegano(convertStringToBoolean(message), bitPerCluster);
      break;
    }
    case "object": {
      steganoMessage = convertBooleanToStegano(message, bitPerCluster);
    }
  }
  console.log(steganoMessage);
}