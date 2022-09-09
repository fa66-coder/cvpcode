import styles from "./ResultsList.module.css";
import { Box, Checkbox } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { getCached } from "../../services/cacheService";
import highlighter, { keyExists } from "../../utils/highliter";
import FixedTopParent from "./FixedTopParent";
import DroppInfo from "./DroppInfo";
import CheckedIcon from "../../Icons/CheckedMark"
import jsonDB from "../../Hintsdata.json";

const LabelTree = ({ item, handleCachedItem, caches, searchKey }) => {
  const [checked, setChecked] = useState(!!getCached(item.code));

  const handleCheckedItem = () => setChecked(handleCachedItem(item));

  const ref = useRef();

  useEffect(() => {
    setChecked(!!getCached(item.code));
  }, [caches]);

  const hint = getHint(item);
  const [openHint, setOpenHint] = useState(false);

  useEffect(() => {
    if (hint.hasContent) setOpenHint(keyExists(searchKey, hint.all));
  }, []);

  return (
    <FixedTopParent isParent={!item.parent_id} parentRef={ref}>
      <div ref={ref} className={styles.item} onClick={(e) => e.stopPropagation()}>
        <Checkbox
          className={styles.checkbox}
          checked={checked}
          onChange={() => handleCheckedItem(item)}
          onClick={(e) => e.stopPropagation()}
          disableRipple
          checkedIcon={<CheckedIcon />}
        />
        <Box sx={{ width: "100%" }}>
          {!item.parent_id && getDepartmentLabel(item.code)}
          <div className={styles.itemContent}>
            <strong dangerouslySetInnerHTML={{ __html: highlighter(searchKey, item.code) }} />
            <span dangerouslySetInnerHTML={{ __html: highlighter(searchKey, item.description) }} />
            {hint.hasContent && (
              <span className={styles.dropper}>
                <div className={styles.infoMark} onClick={() => setOpenHint(!openHint)}>
                  i
                </div>
              </span>
            )}
          </div>
        </Box>
      </div>
      {hint.hasContent && <DroppInfo content={hint} searchKey={searchKey} open={openHint} />}
    </FixedTopParent>
  );
};

const getDepartmentLabel = (code) => {
  code = parseFloat(code.replace("-", "."));
  let styles = {
    color: "white",
    fontSize: "13px",
    borderRadius: "3px",
    textTransforom: "uppercase",
    paddingRight: "5px",
    paddingLeft: "5px",
    paddingTop: "2px",
    paddingBottom: "2px",
    marginLeft: "2px",
  };

  if (code < 44000000)
    return (
      <span style={{ ...styles, backgroundColor: "rgba(244,67,54,0.2)", color: "rgb(244,67,54)" }}>
        Lieferleistungen
      </span>
    );
  if (code > 48000000.8)
    return (
      <span style={{ ...styles, backgroundColor: "rgba(0,150,136,0.2)", color: "rgb(0,150,136)" }}>
        Bauleistungen
      </span>
    );
  if (code === 45000000.7)
    return (
      <span style={{ ...styles, backgroundColor: "rgba(0,150,136,0.2)", color: "rgb(0,150,136)" }}>
        Dienstleistungen
      </span>
    );
};

const getHint = (item) => {
  // get hinwise from jsonDB
  const hinwise = jsonDB.HintsData.find((v) => item.code.includes(v.code))?.hint;
  const synonyme = item.synonyme;

  return {
    hinwise,
    synonyme,
    all: hinwise + synonyme,
    hasContent: hinwise?.length > 0 || synonyme?.length > 0,
  };
};

export default LabelTree;
