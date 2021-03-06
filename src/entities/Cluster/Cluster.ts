import { File } from "../File/File"
import { IFileSystem } from "../FileSystem/FileSystem"

export const NEED_FOR_BIND = "NEED_FOR_BIND";

export type IFileIndex = number;
export interface ICluster {
  fs: IFileSystem;
  fsIndex: number;

  file?: File;
  fileIndex?: IFileIndex;
  steganoBlock?: number;
}


export class Cluster implements ICluster {
  constructor(fsIndex: number, fs: IFileSystem) {
    this.fs = fs;
    this.fsIndex = fsIndex;
  }

  fs;
  fsIndex;

  file?: File;
  fileIndex?: IFileIndex;

  bindToFile = (file: File, fileIndex: number) => {
    this.file = file;
    this.fileIndex = fileIndex;
  }

  resumeFile = () => {
    this.fileIndex = undefined;
    this.file = undefined;
  };



  isFree = () => this.file === undefined && this.fileIndex === undefined;
}