import React from "react";
import { FileSystem } from "../../entities/FileSystem/FileSystem";

interface IBodyProps {
  fs?: FileSystem
}


const Body: React.FC<IBodyProps> = ({fs}) => {
  console.log(fs);
  return (
    <div>
      {fs?.clusters.map(c=><div>{c.fsIndex}</div>)}
    </div>
  )
}

export default Body;