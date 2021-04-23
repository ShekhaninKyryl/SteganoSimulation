import { colorArray } from "../../constants/colors";
import { takeColor } from "../../utils/colors/takeColor";
import { Cluster } from "../Claster/Claster";
import { FileSystem } from "../FileSystem/FileSystem";

let FILE_COUNTER = 0;

const COLORS = colorArray.map(c => ({ color: c, busy: false }));

export interface IFileOptions {
  name?: string;
  fs: FileSystem;
  color?: string;
  sizeInClusters?: number;
}

export interface IFile {
  name: string;
  fs: FileSystem;
  clusters: Cluster[];
  color: string;
}


export class File implements IFile {
  constructor(fileOptions: IFileOptions) {
    this.name = fileOptions.name ? fileOptions.name : `File_${FILE_COUNTER}`; FILE_COUNTER++;
    this.fs = fileOptions.fs;
    this.color = takeColor(COLORS, fileOptions.color);
    this.generateClusters(fileOptions.fs, fileOptions.sizeInClusters)
  }


  name = '';
  fs;
  color = '';
  clusters: Cluster[] = [];

  private generateClusters = (fileSystem: FileSystem, numberClusters = 10) => {
    while (this.clusters.length < numberClusters) {
      const freeCluster = fileSystem.clusters.find(c => c.isFree());
      if (!freeCluster) throw new Error(`File ${this.name} cannot find free cluster in file system ${this.fs}`);

      freeCluster.bindToFile(this, this.clusters.length);
      this.clusters.push(freeCluster);
    }
  }
}