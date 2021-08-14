import { IPermutation } from "./getPermutation";
import { FileSystem } from "../../entities/FileSystem/FileSystem";


export const usePermutation = (permutations: IPermutation[], fileSystem: FileSystem) => {
  permutations.forEach(permutation => {
    if (permutation.length === 1) return;

    fileSystem.readClusterToMemory(permutation[0]);
    permutation.slice(1).forEach((iPermutation) => {
      fileSystem.readClusterToMemory(iPermutation);
      fileSystem.writeClusterFromMemory(iPermutation);
    });
    fileSystem.writeClusterFromMemory(permutation[0]);
  });
}