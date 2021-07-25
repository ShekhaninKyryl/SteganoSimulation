import { colorArray } from "../../constants/colors";
import { takeColor } from "../../utils/colors/takeColor";
import { Cluster, NEED_FOR_BIND } from "../Claster/Claster";
import { FileSystem } from "../FileSystem/FileSystem";

let FILE_COUNTER = 0;

const COLORS = colorArray.map(c => ({ color: c, busy: false }));

type FileCluster = (Cluster);

export interface IFileOptions {
  name?: string;
  fs: FileSystem;
  color?: string;
  sizeInClusters?: number;
}

export interface IFile {
  name: string;
  fs: FileSystem;
  clusters: FileCluster[];
  needForBind: number;
  color: string;
}


export class File implements IFile {
  constructor(fileOptions: IFileOptions) {
    this.name = fileOptions.name ? fileOptions.name : `File_${FILE_COUNTER}`; FILE_COUNTER++;
    this.fs = fileOptions.fs;
    this.color = takeColor(COLORS, fileOptions.color);
    this.generateClusters(fileOptions.sizeInClusters)
  }


  name = '';
  fs;
  color = '';
  clusters: FileCluster[] = [];
  needForBind = 0;


  private generateClusters = (numberClusters = 10) => {
    while (this.clusters.length < numberClusters) {
      const freeCluster = this.fs.clusters.find(c => c.isFree());
      if (!freeCluster) throw new Error(`File ${this.name} cannot find free cluster in file system ${this.fs}`);

      freeCluster.bindToFile(this, this.clusters.length);
      this.clusters.push(freeCluster);
    }
  };

  public setUpNewClasters = (clustersIndex: number[], retrospective = false) => {
    if (!retrospective) this.cleareClusters();
    else this.needForBind = this.clusters.length > clustersIndex.length ? this.clusters.length - clustersIndex.length : 0;

    this.clusters.forEach(c => c.resumeFile(true));
    this.clusters = [];


    clustersIndex.forEach(cI => {
      const foundCluster = this.fs.clusters[cI];
      if (!foundCluster) throw new Error(`Cluster ${cI} is not found`);
      foundCluster.bindToFile(this, this.clusters.length);
      this.clusters.push(foundCluster);
    });
  }

  public cleareClusters = () => {
    this.clusters.forEach(c => { if (c instanceof Cluster) c.resumeFile() });
    this.clusters = [];
  }
  public addMissingClusters = (numberOfClusters: number, availableClusterIndexes?: number[]) => {
    let availableIndexes = availableClusterIndexes || this.fs.clusters.map(c => c.fsIndex);

    availableIndexes.forEach(aI => {
      if (numberOfClusters <= 0) return;

      const isFreeCluster = this.fs.clusters.find(c => c.fsIndex === aI && c.isFree());
      if (!isFreeCluster) return;

      isFreeCluster.bindToFile(this, this.clusters.length);
      this.clusters.push(isFreeCluster)
      numberOfClusters--;
    })

  };


}