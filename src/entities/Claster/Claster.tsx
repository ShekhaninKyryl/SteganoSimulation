import { File } from "../File/File"
import { IFileSystem } from "../FileSystem/FileSystem"

export interface ICluster {
  fs: IFileSystem;
  fsIndex: number;

  file?: File;
  fileIndex?: number;
}


export class Cluster implements ICluster {
  constructor(fsIndex: number, fs: IFileSystem) {
    this.fs = fs;
    this.fsIndex = fsIndex;
  }

  fs;
  fsIndex;

  file?: File;
  fileIndex?: number;

  bindToFile = (file: File, fileIndex: number) => {
    this.file = file;
    this.fileIndex = fileIndex;
  }

  isFree = () => !this.file;
}