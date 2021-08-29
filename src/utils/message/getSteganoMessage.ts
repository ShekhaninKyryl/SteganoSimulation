import { convertBooleanToStegano } from "./convertBooleanToStegano";
import { convertStringToBoolean } from "./convertStringToBoolean";
import { FileSystem } from "../../entities/FileSystem/FileSystem";

type ISteganoMessage = number[];
type ISteganoMessageImproved = {
  basic: ISteganoMessage;
  [key: number]: number[];
}


export const getSteganoMessage = (message: Boolean[] | string, fileSystem: FileSystem): ISteganoMessage => {
  const bitPerCluster = Math.log2(fileSystem.files.length);
  switch (typeof message) {
    case "string": {
      return convertBooleanToStegano(convertStringToBoolean(message), bitPerCluster);
    }
    case "object": {
      return convertBooleanToStegano(message, bitPerCluster);
    }
  };
}

export const getSteganoMessageImproved = (message: Boolean[] | string, fileSystem: FileSystem): ISteganoMessageImproved => {
  const bitPerCluster = Math.log2(fileSystem.files.length) + 1;
  let fullMessage = [];
  switch (typeof message) {
    case "string": {
      fullMessage = convertBooleanToStegano(convertStringToBoolean(message), bitPerCluster);
      break;
    }
    case "object": {
      fullMessage = convertBooleanToStegano(message, bitPerCluster);
      break;
    }
  };

  const steganoMessage: ISteganoMessageImproved = {
    basic: [],
  }
  fullMessage.forEach(m => {
    let corectBlock = m.toString(2);
    while (corectBlock.length < bitPerCluster) corectBlock = "0" + corectBlock;
    const basicPart = parseInt(corectBlock.slice(0, bitPerCluster - 1), 2);
    const improvedPart = parseInt(corectBlock.slice(-1), 2);

    steganoMessage.basic.push(basicPart);
    if (steganoMessage[basicPart] === undefined) steganoMessage[basicPart] = [];
    steganoMessage[basicPart].push(improvedPart)
  });

  return steganoMessage;
}


