import { IMinificatedCluster } from "../../entities/FileSystem/FileSystem";


export type IPermutation = number[];

type IMarkedCluster = IMinificatedCluster & { selected: boolean }

const sortStates = (a: IMinificatedCluster, b: IMinificatedCluster) => a.fsIndex - b.fsIndex;

export const getPermutation = (initState: IMinificatedCluster[], endState: IMinificatedCluster[]): IPermutation[] => {
  const permutations: IPermutation[] = [];

  const localInitState: IMarkedCluster[] = initState.sort(sortStates).map(s => ({ ...s, selected: false }));
  const localEndState: IMarkedCluster[] = endState.sort(sortStates).map(s => ({ ...s, selected: false }));


  let currentCluster: IMarkedCluster = localInitState[0];
  let index = 0;
  const getEndStateIndex = (s: IMarkedCluster) => s.file === currentCluster.file && s.fileIndex === currentCluster.fileIndex

  while (index !== -1) {
    const permutation: IPermutation = [];

    while (!localInitState[index].selected) {
      localInitState[index].selected = true;
      currentCluster = localInitState[index];

      permutation.push(index);

      index = localEndState.findIndex(getEndStateIndex);
    }
    permutations.push(permutation);
    index = localInitState.findIndex(s => !s.selected);
  }

  return permutations;
}