import { IFile } from "../File/File";
import {IFileSystem} from "../FileSystem/FileSystem"

export interface ICluster {
  fs: IFileSystem;
  fsIndex: number;

  file: IFile;
  fileIndex: number;
}