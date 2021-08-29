import { Cluster } from "../../../entities/Cluster/Cluster";
import { getSerries } from "./getSerries";


export const replaceClustersImproved = (fileClusters: Cluster[], message: number[]) => {
  if(fileClusters.length <= message.length) throw new Error("File length should be more than message on 1 cluster");
  const serries = getSerries(message);
  const fileIndexes = fileClusters.map(c => c.fileIndex).sort();

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