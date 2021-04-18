import { ICluster } from "../Claster/Claster";
import { IFileSystem } from "../FileSystem/FileSystem";

export interface IFile {
  name: string;
  fs: IFileSystem;
  clusters: ICluster[];
  color: string;
}