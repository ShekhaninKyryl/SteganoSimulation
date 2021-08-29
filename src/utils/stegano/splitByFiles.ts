import { IMinificatedCluster } from "../../entities/FileSystem/FileSystem";

export const splitByFiles = (clusters: IMinificatedCluster[]): typeof clusters[] => {
  const split = clusters.reduce((result: typeof clusters[], c) => {
    if (!result[c.file]) result[c.file] = [];
    result[c.file].push(c);
    return result;
  }, []);
  return split;
}