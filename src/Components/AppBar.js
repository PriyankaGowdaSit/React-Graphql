import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
export default function AppBarComponent(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
        {props.logoContent}
        {props.appNameContent}
      </Toolbar>
    </Box>
  );
}
