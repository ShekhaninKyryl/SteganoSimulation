import { FileSystem } from "../FileSystem/FileSystem"

interface ICustomError {
  message: string;
  basic?: number[];
  improved?: { [key: number]: number[] };

  fileSystem?: FileSystem;
}

class CustomError implements ICustomError {
  basic?: number[];
  improved?: { [key: number]: number[] };
  message: string;
  fileSystem?: FileSystem;

  constructor({ message, basic, improved, fileSystem }: ICustomError) {
    this.message = message;
    this.basic = basic || [];
    this.improved = improved || { };
    this.fileSystem = fileSystem;
  };
};

export default CustomError;