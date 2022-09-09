import styles from "./ResultsList.module.css";
import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "../../Icons/DropCloseIcon";
import ClosedIcon from "../../Icons/DropOpenIcon";
import EmptyReult from "./EmptyReult";
import LabelTree from "./LabelTree";
import { List, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import nodeFinder from "../../utils/nodeFinder";

const ResultsList = ({ data, handleCachedItem, caches, searchKey, selected }) => {
  const [expands, setExpands] = useState([]);

  useEffect(() => {
    let keyCodes = [];

    if (data && data.length) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) keyCodes = [...keyCodes, ...nodeFinder(searchKey, data[key])];
      }
    }

    setTimeout(() => {
      setExpands([]);
      setExpands(keyCodes);
    }, 50);
  }, [data]);

  const handleToggle = (event, nodeIds) => {
    setExpands(nodeIds);
  };

  const renderTree = (node) => {
    return (
      <TreeItem
        className={styles.treeItem}
        key={node.code}
        nodeId={node.code}
        label={
          <LabelTree
            item={node}
            caches={caches}
            handleCachedItem={handleCachedItem}
            searchKey={searchKey}
          />
        }
        sx={{ flexGrow: 1, padding: 1 }}
      >
        {node.hasChildren ? Object.values(node.children).map((child) => renderTree(child)) : null}
      </TreeItem>
    );
  };

  if (data.length === 0 || data.hasOwnProperty("error")) return <EmptyReult />;

  return (
    <div className={styles.root}>
      <Typography fontSize={24} color="#9b9b9b">
        {selected && (
          <>
            Ergebnisse in CPV-Code <strong>{selected.description}</strong>
          </>
        )}
        {!selected && "Alle Abteilungen"}
      </Typography>
      <TreeView
        sx={{ width: "100%", border: "1px solid #d5d5d5" }}
        aria-label="controlled"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ClosedIcon />}
        onNodeToggle={handleToggle}
        expanded={expands}
      >
        {data && data.map((item) => renderTree(item))}
      </TreeView>
    </div>
  );
};

export default ResultsList;
