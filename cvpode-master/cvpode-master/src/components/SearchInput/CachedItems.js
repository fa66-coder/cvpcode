import React, { useRef, useState } from "react";
import { Badge, Box, Button, IconButton, Modal, Typography } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import styles from "./SearchInput.module.css";
import ReactToPrint from "react-to-print";
import ListPrintItems from "./ListPrintItems";

const CachedItems = ({ caches, handleCachedItem }) => {
  const [open, setOpen] = useState(false);
  var printListRef = useRef;

  return (
    <>
      <Button variant="contained" disableElevation onClick={() => setOpen(true)} disableRipple>
        <Badge badgeContent={caches?.length} color="warning">
          <FolderOpenIcon fontSize="medium" />
        </Badge>
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className={styles.modal}>
          <Box sx={{ display: "flex" }}>
            <Typography fontWeight={600} fontSize={24} flex={1}>
              Selected CPV Codes
            </Typography>
            <IconButton color="error" onClick={() => setOpen(false)}>
              <CloseIcon fontSize="medium" />
            </IconButton>
          </Box>
          {caches?.length === 0 && (
            <Typography textAlign="center" color="#888" my={10}>
              Nothig Selected yet
            </Typography>
          )}
          {caches?.length > 0 && (
            <ul>
              {caches.map((item) => (
                <li key={item.code} className={styles.listItem}>
                  <IconButton color="error" onClick={() => handleCachedItem(item)}>
                    <DeleteIcon fontSize="medium" />
                  </IconButton>
                  <Typography variant="inherit">
                    <strong>{item.code}</strong>
                    {item.description}
                  </Typography>
                </li>
              ))}
            </ul>
          )}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <ReactToPrint
              trigger={() => (
                <Button variant="contained" startIcon={<PrintIcon fontSize="medium" />}>
                  Drunken
                </Button>
              )}
              content={() => printListRef}
            />
          </Box>
        </div>
      </Modal>
      <div style={{ visibility: "hidden", height: 0, width: 0, overflow: "hidden" }}>
        <ListPrintItems items={caches} ref={(el) => (printListRef = el)} />
      </div>
    </>
  );
};

export default CachedItems;
