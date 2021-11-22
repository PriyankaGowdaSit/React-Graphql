import React from "react";
import { Box } from "@mui/system";
import Paper from "@material-ui/core/Paper";
export default function BoxComponent(props) {
  return (
    <Box className={props.boxStyle}>
      <Paper>
        <p className={props.headingStyle}>{props.title}</p>
        <p className={props.subContentStyle}>{props.subContent1}</p>
        <p className={props.subContentStyle}>{props.subContent2}</p>
        <br />
      </Paper>
    </Box>
  );
}
