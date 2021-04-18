import { IFile } from "../File/File";
import { IFileSystem } from "../FileSystem/FileSystem"

export interface ICluster {
  fs: IFileSystem;
  fsIndex: number;

  file?: IFile;
  fileIndex?: number;
}


export class Cluster implements ICluster {
  constructor(fsIndex: number, fs: IFileSystem) {
    this.fs = fs;
    this.fsIndex = fsIndex;


  }

  fs;
  fsIndex;

  file = undefined;
  fileIndex = undefined;
}