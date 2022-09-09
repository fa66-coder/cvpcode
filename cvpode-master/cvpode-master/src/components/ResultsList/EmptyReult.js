import { Box } from "@mui/material";
import React from "react";

const EmptyReult = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: 10 }}>
      <img src="/empty.png" alt="null" />
    </Box>
  );
};

export default EmptyReult;
