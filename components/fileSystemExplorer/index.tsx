import React, { useEffect, useMemo, useState } from 'react';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import IFileSystem from './fse.types';
import styles from "./fse.module.css";

const FileSystemExplorer:React.FC<IFileSystem> = (props) => {

    const [displayChildren, setDisplayChildren] = useState<boolean>(false);

    const orderingFilesAndDirectories = (childrenFiles:IFileSystem[]) => {
      
      if(!childrenFiles || childrenFiles.length === 0) return; 
      return childrenFiles.sort((a:IFileSystem,b:IFileSystem) => {
        return  (a.isDirectory === b.isDirectory)? 0 : a.isDirectory? 1 : -1;
      })

    }

    useEffect(()=> {
      orderingFilesAndDirectories(props.childrenFiles!);
    },[props.childrenFiles])

    const handleClick = (isDirectory:boolean) => {
      if(!isDirectory) return;
      setDisplayChildren(!displayChildren);
    }

    function getDisplayConditions(){
      return displayChildren && props.childrenFiles && props.childrenFiles.length > 0;
    }

    const displayConditions = useMemo(()=>getDisplayConditions(),[displayChildren, JSON.stringify(props.childrenFiles)])

    return (
      <details 
        className={styles.directory}
        style={{border: props.name === "root" || props.isDirectory && displayChildren ? "1px solid #999" : "transparent"}}>
          <summary onClick={()=> handleClick(props.isDirectory)} className={styles.directoryHeader}>
            <p 
            style={{fontWeight:props.isDirectory ? "800":"300"}}>{props.name}</p>
            <span 
              className={styles.cheveron}>
            {props.isDirectory && !displayChildren && <GoChevronDown />}
            {props.isDirectory && displayChildren && <GoChevronUp />}
            </span>
          </summary>
        
        {displayConditions && props.childrenFiles!.map((file:IFileSystem) => {
          return (
            <FileSystemExplorer {...file} key={file.name}/>
          )}
        )}
        
      </details>
      
    )
}

export default FileSystemExplorer;
