export enum FS_TYPES {
  "WITHOUT_TYPE",
  "FAT",
  "NTFS",
};

const START_FS_INDEX = 2;
const LAST_FS_INDEX = Number.MAX_SAFE_INTEGER;
const FS_SIZE_DEFAULT = 50;
const FS_NUM_FILES_DEFAULT = 4;

const FileSystemConstants = {
  FS_TYPES,

  START_FS_INDEX,
  LAST_FS_INDEX,

  FS_SIZE_DEFAULT,
  FS_NUM_FILES_DEFAULT,
}

export default FileSystemConstants;