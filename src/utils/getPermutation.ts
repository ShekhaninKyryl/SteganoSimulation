import { IMinificatedCluster } from "../entities/FileSystem/FileSystem";

type IPermutations = number[][];

type IMarkedCluster = IMinificatedCluster & { selected: boolean }

export const getPermutation = (initState: IMinificatedCluster[], endState: IMinificatedCluster[]): IPermutations => {
  const permutations: IPermutations = [];

  const localInitState: IMarkedCluster[] = initState.map(s => ({ ...s, selected: false }));
  const localEndState: IMarkedCluster[] = endState.map(s => ({ ...s, selected: false }));


  let currentCluster: IMarkedCluster = localInitState[0];
  let index = 0;

  while (index !== -1) {
    const permutation = [];

    while (!localInitState[index].selected) {
      localInitState[index].selected = true;
      currentCluster = localInitState[index];

      permutation.push(index);

      index = localEndState.findIndex(s => s.file === currentCluster.file && s.fileIndex === currentCluster.fileIndex);
    }
    permutations.push(permutation);
    index = localInitState.findIndex(s => !s.selected);
  }

  return permutations;
}