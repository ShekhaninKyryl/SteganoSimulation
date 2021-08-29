import { Cluster } from "../../../entities/Cluster/Cluster";
import { IMinificatedCluster } from "../../../entities/FileSystem/FileSystem";
import { getSerries } from "../../message/getSerries";


export const replaceClustersImproved = (fileClusters: Cluster[] | IMinificatedCluster[], message: number[]) => {
  if (fileClusters.length <= message.length) throw new Error("File length should be more than message on 1 cluster");
  const serries = getSerries(message);
  const fileIndexes = fileClusters.map((c: Cluster | IMinificatedCluster) => c.fileIndex).sort();

  let currentClusterIndex = 0;
  serries.forEach(oneSerie => {
    oneSerie.forEach(value => {
      if (value) {
        fileClusters[currentClusterIndex].fileIndex = fileIndexes.pop();
        currentClusterIndex++;
      } else {
        fileClusters[currentClusterIndex].fileIndex = fileIndexes.shift();
        currentClusterIndex++;
      }
    })
  });

  while (fileIndexes.length) {
    fileClusters[currentClusterIndex].fileIndex = fileIndexes.shift();
    currentClusterIndex++;
  }
};