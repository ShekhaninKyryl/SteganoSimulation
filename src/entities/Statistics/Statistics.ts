import { FileSystem } from "../FileSystem/FileSystem"

interface IStatistics {
  fileSystemStart?: FileSystem;
  fileSystemEnd?: FileSystem;
  message?: Boolean[] | string;

  permutation?: number[][];

  headerMoves?: number;
  clustersRead?: number;
  clustersWrite?: number;
  memorySize?: number;

  fragmentations?: {
    before: number;
    after: number;
  }[];
}

class Statistics implements IStatistics {
  fileSystemStart?: FileSystem;
  fileSystemEnd?: FileSystem;
  message?: Boolean[] | string;

  permutation?: number[][];
  headerMoves?: number;
  clustersRead?: number;
  clustersWrite?: number;
  memorySize?: number;
  fragmentations?: {
    before: number;
    after: number;
  }[];

  setStartState = (state: FileSystem) => {
    this.fileSystemStart = new FileSystem({ size: state.clusters.length, fileOptions: state.files.map(f => ({ color: f.color, name: f.name, sizeInClusters: f.clusters.length })) });
    return this
  };

  setEndState = (state: FileSystem) => { this.fileSystemEnd = state; return this };

  setMessage = (message: Boolean[] | string) => { this.message = message; return this };

  setPermutation = (permutation: number[][]) => { this.permutation = permutation; return this }

  calculateClustersRead = () => {
    if (this.clustersWrite) {
      this.clustersRead = this.clustersWrite;
      return this;
    }

    if (this.permutation) {
      this.clustersRead = 0;
      this.permutation.forEach(onePermutation => {
        if (onePermutation.length === 1) return;
        if (this.clustersRead === undefined) this.clustersRead = 0;
        this.clustersRead = this.clustersRead + onePermutation.length;
      })
    } else {
      const movedClusters = this.fileSystemEnd?.clusters
        .filter((eC, index) => {
          const sC = this.fileSystemStart?.clusters[index];
          if (!sC) return false;
          if (!eC.file || eC.fileIndex === undefined) return false;
          if (!sC.file || sC.fileIndex === undefined) return false;
          if (
            eC.fsIndex === sC.fsIndex &&
            eC.fileIndex === sC.fileIndex &&
            eC.file.name === sC.file.name
          ) {
            return false;
          }
          return true;
        });
      this.clustersRead = movedClusters?.length;
    }
    return this;
  }

  calculateClustersWrite = () => {
    if (this.clustersRead) {
      this.clustersWrite = this.clustersRead;
      return this;
    }

    this.clustersWrite = 0;
    if (this.permutation) {
      this.permutation.forEach(onePermutation => {
        if (onePermutation.length === 1) return;
        if (this.clustersWrite === undefined) this.clustersWrite = 0;
        this.clustersWrite = this.clustersWrite + onePermutation.length;
      })
    } else {
      const movedClusters = this.fileSystemEnd?.clusters.filter((eC, index) => {
        const sC = this.fileSystemStart?.clusters[index];
        if (!sC) return false;
        if (!eC.file || eC.fileIndex === undefined) return false;
        if (!sC.file || sC.fileIndex === undefined) return false;
        if (
          eC.fsIndex === sC.fsIndex &&
          eC.fileIndex === sC.fileIndex &&
          eC.file.name === sC.file.name
        ) return false;
        return true;
      });
      this.clustersWrite = movedClusters?.length;
    }
    return this;
  }

  calculateMemorySize = () => {
    if (this.permutation) {
      this.memorySize = 2;
      return this;
    }

    const movedClusters = this.fileSystemEnd?.clusters.filter((eC, index) => {
      const sC = this.fileSystemStart?.clusters[index];
      if (!sC) return false;
      if (!eC.file || eC.fileIndex === undefined) return false;
      if (!sC.file || sC.fileIndex === undefined) return false;
      if (
        eC.fsIndex === sC.fsIndex &&
        eC.fileIndex === sC.fileIndex &&
        eC.file.name === sC.file.name
      ) return false;
      return true;
    });
    this.memorySize = movedClusters?.length;
    return this;
  };

  calculateHeaderMoves = () => {
    if (!this.permutation) {
      if (!this.memorySize) {
        console.error("Please set up memorySize");
        return this;
      }
      this.headerMoves = this.memorySize * 2;
      return this;
    }

    let sum = 0;
    let prevIndex: number;
    this.permutation.forEach(onePermutation => {
      if (onePermutation.length === 1) return;
      onePermutation.forEach(value => {
        if (prevIndex !== undefined) sum += Math.abs(value - prevIndex);
        prevIndex = value;
      })
    });

    this.headerMoves = sum;

    return this;
  };

  calculateFragmentation = () => {
    console.log("here")
    const before: number[] = [];
    const after: number[] = [];
    this.fragmentations = [];

    this.fileSystemStart?.files.forEach(file => {
      let fragmentationBefore = 1;
      let prevIndex: number;
      file.clusters
        .sort((a, b) => Number(a.fileIndex) - Number(b.fileIndex))
        .forEach(cluster => {
          if (prevIndex === undefined) {
            prevIndex = cluster.fsIndex;
            return;
          }
          fragmentationBefore += (cluster.fsIndex - prevIndex) === 1 ? 0 : 1;
          prevIndex = cluster.fsIndex;
        });
      before.push(fragmentationBefore);
    });

    this.fileSystemEnd?.files.forEach(file => {
      let fragmentationAfter = 1;
      let prevIndex: number;
      file.clusters
        .sort((a, b) => Number(a.fileIndex) - Number(b.fileIndex))
        .forEach(cluster => {
          if (prevIndex === undefined) {
            prevIndex = cluster.fsIndex;
            return;
          }
          fragmentationAfter += (cluster.fsIndex - prevIndex) === 1 ? 0 : 1;
          prevIndex = cluster.fsIndex;
        });
      after.push(fragmentationAfter);
    });

    before.forEach((value, index) => this.fragmentations?.push({
      before: value,
      after: after[index],
    }));

    return this;
  }
}

export default Statistics;