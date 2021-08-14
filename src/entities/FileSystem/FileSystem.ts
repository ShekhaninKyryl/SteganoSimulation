import { Cluster, IFileIndex } from "../Cluster/Cluster";
import { File } from "../File/File";

import FS_CONSTANTS, { FS_TYPES } from "../../constants/fileSystem"

type IFileOption = {
  name?: string;
  color?: string;
  sizeInClusters?: number;
}

export interface IFSOption {
  type?: FS_TYPES | undefined;
  size?: number;
  fileOptions?: IFileOption[];
}

export interface IFileSystem {
  type: FS_TYPES
  clusters: Cluster[];
  files: File[];
  clustersInMemory: Cluster[];
}

export type IMinificatedCluster = { fsIndex: number, fileIndex?: IFileIndex, file: number };

export class FileSystem implements IFileSystem {

  constructor(options: IFSOption) {
    this.type = options.type ? options.type : FS_TYPES.WITHOUT_TYPE;

    this.clusters = options.size ? this.generateClusters(options.size) : this.generateClusters(FS_CONSTANTS.FS_SIZE_DEFAULT);

    this.files = this.generateFiles(options.fileOptions);
  }

  type = FS_TYPES.WITHOUT_TYPE;
  clusters: Cluster[] = [];
  clustersInMemory: Cluster[] = [];
  files: File[] = [];


  private generateClusters = (size: number): Cluster[] => {
    const clusters = (new Array(size)).fill('');
    return clusters.map((_, index) => new Cluster(index + FS_CONSTANTS.START_FS_INDEX, this));
  }

  private generateFiles = (fileOptions?: IFileOption[]): File[] => {

    if (!fileOptions) return [];
    const files: File[] = [];
    fileOptions.forEach(f => {
      files.push(new File({ fs: this, name: f.name || `File_${files.length}`, color: f.color, sizeInClusters: f.sizeInClusters }));
    });
    return files;
  }

  public swapClusters = (first: Cluster, second: Cluster) => {
    const tmp = { ...first };

    first.file = second.file;
    first.fileIndex = second.fileIndex;

    second.file = tmp.file;
    second.fileIndex = tmp.fileIndex;
  }

  public setClusters = (newClusters: Cluster[]) => this.clusters = newClusters;

  public getMinState = (): IMinificatedCluster[] => this.files.reduce(
    (result, f, index) =>
      [
        ...result,
        ...f.clusters.map(
          c => (
            {
              fsIndex: c.fsIndex,
              fileIndex: c.fileIndex,
              file: index
            }
          )
        )
      ], [] as IMinificatedCluster[])
    .sort((a, b) => a.fsIndex - b.fsIndex);


  public readClusterToMemory = (fsIndex: number) => {
    const cluster = this.clusters.find(c => c.fsIndex === fsIndex);
    if (!cluster) {
      console.warn("Cluster was not found!");
      return;
    }
    cluster.file?.removeCluster(cluster);
    this.clustersInMemory.push({ ...cluster });
    cluster.resumeFile();
  }

  public writeClusterFromMemory = (fsIndex: number) => {
    const cluster = this.clusters.find(c => c.fsIndex === fsIndex);
    const [memoriedCluster] = this.clustersInMemory;

    if (!memoriedCluster.file || memoriedCluster.fileIndex === undefined) {
      console.warn("Memocluster doesn't have file or file index!");
      return;
    }
    if (!cluster) {
      console.warn("Cluster was not found!");
      return;
    }

    cluster.bindToFile(memoriedCluster.file, memoriedCluster.fileIndex);
    memoriedCluster.file.addCluster(cluster);

    this.clustersInMemory.shift();
  }
}