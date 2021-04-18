import { ICluster } from "../Claster/Claster";

export interface IFileSystem {
  type: string;
  clusters: ICluster[];
}