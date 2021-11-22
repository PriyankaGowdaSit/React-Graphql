import React from "react";
import AuthContext from "../Data/auth-context";
import moment from "moment";
import { Button, Grid } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import ListComponent from "../Components/List";
import BoxComponent from "../Components/Box";
const useStyles = makeStyles({
  root: {
    width: 600,
    display: "flex",
    marginLeft: 20,
    marginTop: 10,
  },
  box: {
    width: 150,
    fontSize: "14px",
    color: "#3d3d3d",
    boxShadow: "1px 1px 1px 0px #9E9E9E",
  },

  heading: {
    color: "blue",
    fontSize: "15px",
    padding: 7,
  },
  subContent: {
    margin: "auto",

    padding: 7,
  },
  button: {
    width: 200,
    height: 50,
  },
  listRoot: {
    width: "80%",
    marginLeft: 20,
    maxWidth: 500,
    marginTop: 20,
    bgcolor: "background.paper",
    color: "green",
    marginBottom: 20,
  },
  listitem: {
    marginTop: 20,
    boxShadow: "0px 0px 1px 0px #9E9E9E",
  },
  header: {
    color: "blue",
    fontSize: "18px",
  },
  warning: {
    marginLeft: 40,
    marginTop: 30,
    color: "grey",
  },

  listWrapper: {
    maxHeight: 400,
    minHeight: 200,
    width: 500,
    overflow: "auto",
    marginLeft: 50,
    marginTop: 40,
    marginBottom: 30,
    boxShadow: "1px 2px 2px 1px #9E9E9E",
  },
});
export default function HomePage() {
  const classes = useStyles();
  const contextData = React.useContext(AuthContext);
  const [buildingsCount, setBuildingsCount] = React.useState(null);
  const [roomsCount, setRoomsCount] = React.useState(0);
  const [freeRooms, setFreeRooms] = React.useState(0);
  const [ongoingMeetings, setOngoingMeetings] = React.useState(0);
  const [totalMeetings, setTotalMeetings] = React.useState(0);
  const [upcomingMeetings, setUpcomingMeetings] = React.useState([]);

  // const { meetingsData, loading1, error1 } = useQuery(MEETINGS_QUERY);
  const history = useHistory();

  const handleBookMeeting = () => {
    history.push(`/bookmeeting`);
  };
  React.useEffect(() => {
    document.title = "Displaying the Meeting Stats for the day";
    setUpcomingMeetings([]);
    //Define some variables to store meeting stats
    var total_meetings_count = 0;
    var free_rooms_count = 0;
    var ongoing_meetings_count = 0;

    //set today's date and current time
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();

    //format the date to compare with other dates in the list of meetings
    var formatted_date = moment(today).format("DD/MM/YYYY");

    //format the current time to compare with time slots in the list of meetings
    var format = "hh:mm";
    var formatted_time = moment(time, format);

    //initalise buildings data from context temporarily and set the length to the total buildings state variable
    var temp_buildings = contextData.buildings.Buildings;
    setBuildingsCount(temp_buildings.length);
    var count = 0;

    //loop the buildings data to get the stats
    temp_buildings.forEach((item) => {
      count = count + item.meetingRooms.length;
      //set the count of total rooms in all the buildings
      setRoomsCount(count);

      item.meetingRooms.forEach((item1) => {
        //Returns total upcoming meetings set for today
        var total_meetings = item1.meetings.filter((item2) => {
          return (
            item2.date === formatted_date &&
            moment(item2.startTime, format) >= formatted_time
          );
        });
        //Returns total ongoing meetings currently
        var ongoing_meetings = item1.meetings.filter((item2) => {
          return (
            item2.date === formatted_date &&
            formatted_time.isBetween(
              moment(item2.startTime, format),
              moment(item2.endTime, format)
            )
          );
        });
        //If there are no booked meetings currently in the room , total rooms count is incremented by 1
        if (ongoing_meetings.length === 0) {
          free_rooms_count = 1 + free_rooms_count;
        }
        //Incrementing ongoing meetings count
        ongoing_meetings_count =
          ongoing_meetings.length + ongoing_meetings_count;

        //Total on of upcoming meetings + currently ongoing meetings
        total_meetings_count =
          total_meetings.length + total_meetings_count + ongoing_meetings_count;
        total_meetings.forEach((meeting) => {
          setUpcomingMeetings((meetings) => [...meetings, meeting]);
        });
        //Updating the state variable with ongoing meetings data
        ongoing_meetings.forEach((meeting) => {
          setUpcomingMeetings((meetings) => [...meetings, meeting]);
        });
      });
    });

    // Updating the state variables with the values in Temp variables that will be displayed as stats in return
    setFreeRooms(free_rooms_count);
    setOngoingMeetings(ongoing_meetings_count);
    setTotalMeetings(total_meetings_count);
    
  }, [setBuildingsCount, contextData]);

  //Defining the stats data that has to be displayed to be sent through resusable box component
  const boxData = [
    {
      title: "BUILDINGS",
      subContent1: `Total - ${buildingsCount}`,
      subContent2: <br />,
    },
    {
      title: "ROOMS",
      subContent1: `Total - ${roomsCount}`,
      subContent2: `Available Now - ${freeRooms}`,
    },
    {
      title: "MEETINGS",
      subContent1: `Total - ${totalMeetings}`,
      subContent2: `OnGoing - ${ongoingMeetings}`,
    },
  ];
  return (
    <div>
      <Grid container spacing={3} className={classes.root}>
        {boxData.map((item) => {
          return (
            <Grid item xs={12} sm={6} md={4}>
              <BoxComponent
                aria-label="Primary"
                key={item.title}
                title={item.title}
                subContent1={item.subContent1}
                subContent2={item.subContent2}
                boxStyle={classes.box}
                headingStyle={classes.heading}
                subContentStyle={classes.subContent}
              />
            </Grid>
          );
        })}
        <Grid item xs={12} sm={6} md={4}>
          <Button
            aria-label="Secondary"
            color="primary"
            variant="contained"
            onClick={handleBookMeeting}
            className={classes.button}
          >
            Add a Meeting
            <ArrowRightAltIcon />
          </Button>
        </Grid>
      </Grid>
      {upcomingMeetings.length !== 0 ? (
        <div className={classes.listWrapper}>
          <ListComponent
            aria-label="Secondary"
            data={upcomingMeetings}
            listRootStyle={classes.listRoot}
            headingStyle={classes.header}
            listItemStyle={classes.listitem}
            listTitle="Today's Meetings"
            secondaryActionType="text"
            // secondaryActionText="date"
            listItemTextTitle="title"
            component="upcomingMeetings"
          />
        </div>
      ) : (
        <p className={classes.warning}>No Upcoming Meeting's for Today</p>
      )}
    </div>
  );
}
