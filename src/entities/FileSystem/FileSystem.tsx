import { Cluster } from "../Claster/Claster";
import { IFile } from "../File/File";

import FS_CONSTANTS, { FS_TYPES } from "../../constants/fileSystem"


export interface IFSOption {
  type?: FS_TYPES | undefined;
  size?: number;
  numFiles?: number;
}

export interface IFileSystem {
  type: FS_TYPES
  clusters: Cluster[];
  files: IFile[];
}


export class FileSystem implements IFileSystem {
  type = FS_TYPES.WITHOUT_TYPE;
  clusters: Cluster[] = [];
  files = [];
  constructor(options: IFSOption) {
    this.type = options.type ? options.type : FS_TYPES.WITHOUT_TYPE;

    this.clusters = options.size ? this.generateClusters(options.size) : this.generateClusters(FS_CONSTANTS.FS_SIZE_DEFAULT);

  }


  generateClusters = (size: number): Cluster[] => {
    const clusters = (new Array(size)).fill('');
    return clusters.map((_, index) =>  new Cluster(index + FS_CONSTANTS.START_FS_INDEX, this));
  }
}