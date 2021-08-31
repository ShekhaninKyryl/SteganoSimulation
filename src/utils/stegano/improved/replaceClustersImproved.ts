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


type IMinClusterWithSerieInd = IMinificatedCluster & { serieIndex: number, fileIndex: number };

//TODO: in progress;
export const replaceClustersImprovedSavePositions = (fileClusters: IMinificatedCluster[], message: number[]) => {
  if (fileClusters.length <= message.length) throw new Error("File length should be more than message on 1 cluster");
  const serries = getSerries(message);
  let fileIndexes = fileClusters
    .filter(cluster => cluster.moved !== false)
    .map((cluster: IMinificatedCluster) => cluster.fileIndex)
    .sort();

  const findFileIndex = (currentUnmoved: IMinClusterWithSerieInd, diff: number, value: boolean) => fileIndexes.find(f => {
    if (!currentUnmoved) return false;
    return f === currentUnmoved.fileIndex + (value ? diff : - diff);
  });


  const result: IMinificatedCluster[] = [];
  let currentClusterIndex = 0;

  let position = 0;
  serries.forEach(oneSerie => {
    const serieLenght = oneSerie.length;
    const seriaValue = oneSerie[0];

    const unmoved: IMinClusterWithSerieInd[] = fileClusters
      .slice(position, serieLenght + position)
      .map((cluster, index) => ({ ...cluster, fileIndex: cluster.fileIndex || 0, serieIndex: index }))
      .filter(f => f.moved === false);


    let seriaIndex = 0;
    while (result.length < serieLenght + position) {

      let currentUnmoved: IMinClusterWithSerieInd | undefined = undefined;
      while (unmoved.length) {
        currentUnmoved = unmoved.shift();
        if (!currentUnmoved) throw new Error("currentUnmoved undefined");

        let diff = currentUnmoved.serieIndex - seriaIndex;
        while (diff) {
          const foundFileIndex = findFileIndex(currentUnmoved, diff, !!seriaValue);
          if (!foundFileIndex) throw new Error("It cannot be done, foundFileIndex was not found");
          result.push({ ...fileClusters[currentClusterIndex], fileIndex: foundFileIndex });
          fileIndexes = fileIndexes.splice(fileIndexes.findIndex(i => i === foundFileIndex), 1);
          diff--; seriaIndex++; currentClusterIndex++;
        };
        result.push(currentUnmoved);
        seriaIndex++;
      }
      if (currentUnmoved && seriaIndex < serieLenght) {
        let diff = currentUnmoved.serieIndex - seriaIndex;
        while (diff) {
          const foundFileIndex = findFileIndex(currentUnmoved, diff, !seriaValue);
          if (!foundFileIndex) throw new Error("It cannot be done, foundFileIndex was not found");
          result.push({ ...fileClusters[currentClusterIndex], fileIndex: foundFileIndex });
          fileIndexes = fileIndexes.splice(fileIndexes.findIndex(i => i === foundFileIndex), 1);
          diff--; seriaIndex++; currentClusterIndex++;
        };
      } else if (!currentUnmoved && seriaIndex < serieLenght) {

      }

    }
  });

  while (fileIndexes.length) {
    result.push({ ...fileClusters[currentClusterIndex], fileIndex: fileIndexes.shift() });
    currentClusterIndex++;
  }

  fileClusters = result;
};