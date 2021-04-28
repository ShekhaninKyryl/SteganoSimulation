import { Cluster } from "../Claster/Claster";
import { File } from "../File/File";

import FS_CONSTANTS, { FS_TYPES } from "../../constants/fileSystem"


export interface IFSOption {
  type?: FS_TYPES | undefined;
  size?: number;
  numFiles?: number;
}

export interface IFileSystem {
  type: FS_TYPES
  clusters: Cluster[];
  files: File[];
}


export class FileSystem implements IFileSystem {

  constructor(options: IFSOption) {
    this.type = options.type ? options.type : FS_TYPES.WITHOUT_TYPE;

    this.clusters = options.size ? this.generateClusters(options.size) : this.generateClusters(FS_CONSTANTS.FS_SIZE_DEFAULT);

    if (options.numFiles) {
      this.files = this.generateFiles(options.numFiles);
    }
  }

  type = FS_TYPES.WITHOUT_TYPE;
  clusters: Cluster[] = [];
  files: File[] = [];


  private generateClusters = (size: number): Cluster[] => {
    const clusters = (new Array(size)).fill('');
    return clusters.map((_, index) => new Cluster(index + FS_CONSTANTS.START_FS_INDEX, this));
  }

  private generateFiles = (numFiles: number): File[] => {
    const files = [];
    while (files.length < numFiles) {
      files.push(new File({ fs: this }));
    }
    return files;
  }

  public swapClusters = (first: Cluster, second: Cluster) => {
    const tmp = {...first};

    first.file = second.file;
    first.fileIndex = second.fileIndex;

    second.file = tmp.file;
    second.fileIndex = tmp.fileIndex;
  }

  public setClusters = (newClusters: Cluster[])=> this.clusters = newClusters;
}