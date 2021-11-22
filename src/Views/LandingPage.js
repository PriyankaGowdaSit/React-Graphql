import React from "react";
import { Grid, Typography } from "@mui/material";
import MeetingStats from "./MeetingStats";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    marginTop: 100,
    display: "flex",
    marginLeft: 30,
  },

  subtext: {
    marginTop: 10,
    marginLeft: 30,
  },
  flexwrapper: {
    display: "flex",
  },
  flexChild: {
    marginLeft: "auto",
    marginRight: 50,
    alignItems: "flex-end",
  },
});
export default function LandingPage() {
  const classes = useStyles();

  React.useEffect(() => {
    document.title = "Welcome to Book my Meeting. Start By Adding meeting";
  }, []);

  return (
    <div>
      <div className={classes.root} aria-label="Primary">
        <Typography variant="h4">Welcome to Book My Meeting</Typography>
      </div>
      <div className={classes.subtext}>
        <Typography>
          This tool helps you schedule a meeting by showing the best available
          resources. Happy Meeting!
        </Typography>
      </div>
      <Grid container>
        <Grid item xs={12} sm={6} md={6} className={classes.flexwrapper}>
          <div>
            <MeetingStats aria-label="Secondary" />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6} className={classes.flexwrapper}>
          <img
            src="/Images/CollabLogo.jpeg"
            height="500"
            width="700"
            className={classes.flexChild}
            alt="Home Page Logo is displayed"
          />
        </Grid>
      </Grid>
    </div>
  );
}
