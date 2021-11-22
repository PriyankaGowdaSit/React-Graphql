import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import AppBarComponent from "../Components/AppBar";
import BookMeeting from "./BookMeeting";
import LandingPage from "./LandingPage";
import Typography from "@mui/material/Typography";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  appBarTitle: {
    display: { xs: "none", sm: "block" },
    marginLeft: 7,
  },

  appBarLogo: {
    color: "green",
    marginTop: -4,
  },
});
export default function Router() {
  const classes = useStyles();
  return (
    <>
      <AppBarComponent
        appNameContent={
          <Typography
            variant="h6"
            color="black"
            noWrap
            component="div"
            className={classes.appBarTitle}
          >
            Book My Meeting
          </Typography>
        }
        logoContent={
          <CalendarTodayIcon className={classes.appBarLogo} fontSize="large" />
        }
      />

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/bookmeeting" component={BookMeeting} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
