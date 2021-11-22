import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AuthContext from "../Data/auth-context";
import { Grid } from "@mui/material";
import moment from "moment";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import ListComponent from "../Components/List";
import DialogComponent from "../Components/Dialog";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { useMutation, gql } from "@apollo/client";
import debounce from "lodash.debounce";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const useStyles = makeStyles({
  input: {
    width: 250,
    height: 100,
  },
  dialogcontent: {
    color: "blue",
    fontSize: "15px",
  },

  listRoot: {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
    color: "green",
  },
  listitem: {
    marginTop: 20,
    boxShadow: "1px 2px 1px #9E9E9E",
  },
  header: {
    color: "blue",
    fontSize: "18px",
  },
});
export default function BookMeeting() {
  const history = useHistory();
  const classes = useStyles();
  const [selectedBuilding, setSelectedBuilding] = React.useState("");
  const [date, setDate] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");

  const [availableRooms, setAvailableRooms] = React.useState([]);
  const [data, setData] = React.useState(null);
  const contextData = React.useContext(AuthContext);
  const [selectedRoom, setSelectedRoom] = React.useState("");
  const [meetingConfirmation, setMeetingConfirmation] = React.useState(false);
  const [dateError, setDateError] = React.useState(false);
  const [startTimeRangeError, setStartTimeRangeError] = React.useState(false);
  const [endTimeRangeError, setEndTimeRangeError] = React.useState(false);
  const [startTimeErrorMessage, setStartTimeErrorMessage] = React.useState("");
  const [endTimeErrorMessage, setEndTimeErrorMessage] = React.useState("");
  const [displayNoRoomsError, setDisplayNoRoomsError] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [selectedRoomId, setSelectedRoomId] = React.useState(null);
  const enableNextCondition =
    date !== "" &&
    startTime !== "" &&
    endTime !== "" &&
    dateError === false &&
    startTimeRangeError === false &&
    endTimeRangeError === false;

  const CREATE_MEETING_MUTUATION = gql`
    mutation CreateMeeting(
      $title: String!
      $date: String!
      $startTime: String!
      $endTime: String!
      $meetingRoomId: Int!
    ) {
      Meeting(
        id: 23
        title: $title
        date: $date
        startTime: $startTime
        endTime: $endTime
        meetingRoomId: $meetingRoomId
      ) {
        id
        title
      }
    }
  `;
  const [createLink, { loading, error }] = useMutation(
    CREATE_MEETING_MUTUATION
  );
  const changeHandler = (event) => {
    var eventValue = event.target.value;
    debouncedChangeHandler(eventValue);
  };
  const debouncedChangeHandler = React.useMemo(
    () => debounce((value) => handleChangeTitle(value), 100),
    []
  );

  React.useEffect(() => {
    document.title="Book your meeting in the Page"
    console.log(contextData);
    setData(contextData.buildings);
  }, [setData, contextData]);

  if (loading) console.log("Submitting...");
  if (error) console.log(error);
  const handleChange = (event) => {
    setSelectedBuilding(event.target.value);
  };

  const handleChangeDate = (event) => {
    var today = moment();
    console.log(moment(today).format("DD/MM/YYYY"));
    console.log(event.target.value);

    //Validation of the date where the date cannot be lesser than today's date and setting error to display as errorb text
    if (
      moment(today).format("DD/MM/YYYY") >
      moment(event.target.value).format("DD/MM/YYYY")
    ) {
      setDateError(true);
    } else {
      setDateError(false);
    }
    setDate(event.target.value);

    //If the start time is lesser than current time the time range error is displayed
    if (startTime !== "") {
      var todayDate = new Date();
      var now = todayDate.getHours() + ":" + todayDate.getMinutes();
      var formatted_time = moment(now, "hh:mm");
      today = moment();
      console.log(moment(today).format("DD/MM/YYYY"));

      if (
        moment(today).format("DD/MM/YYYY") ===
        moment(event.target.value).format("DD/MM/YYYY")
      ) {
        if (formatted_time > moment(startTime, "hh:mm")) {
          setStartTimeRangeError(true);
          setStartTimeErrorMessage("Cannot create meeting for past");
        } else {
          setStartTimeRangeError(false);
        }
      } else {
        setStartTimeRangeError(false);
      }
    }
  };

  const handleChangeStartTime = (event) => {


    setStartTime(event.target.value);
    var startTimeFormat = moment(event.target.value, "hh:mm");
    var endTimeFormat = moment(endTime, "hh:mm");

    //Validating that the start time cannot be lesser than end time of the meeting
    if (startTimeFormat.isBefore(endTimeFormat)) {
      setStartTimeRangeError(false);
    } else {
      if (endTime !== "") {
        setEndTimeRangeError(true);
        setEndTimeErrorMessage("Starttime cannot be greater than endtime");
      }
    }
    var today = new Date();
    var now = today.getHours() + ":" + today.getMinutes();
    var formatted_time = moment(now, "hh:mm");
    today = moment();
    console.log(moment(today).format("DD/MM/YYYY"));
    console.log(event.target.value);

    //Validating that the start time cannot be lesser than current time
    if (
      moment(today).format("DD/MM/YYYY") === moment(date).format("DD/MM/YYYY")
    ) {
      if (formatted_time > moment(event.target.value, "hh:mm")) {
        setStartTimeRangeError(true);
        setStartTimeErrorMessage("Cannot create meeting for past");
      } else {
        setStartTimeRangeError(false);
      }
    }
  };
  const handleChangeEndTime = (event) => {
    console.log(event.target.value);
    setEndTime(event.target.value);
    console.log(startTime);
    var startTimeFormat = moment(startTime, "hh:mm");
    var endTimeFormat = moment(event.target.value, "hh:mm");
    //Validating that the end time cannot be greater than start time
    if (startTimeFormat.isBefore(endTimeFormat)) {
      setEndTimeRangeError(false);
    } else {
      setEndTimeRangeError(true);
      setEndTimeErrorMessage("Starttime cannot be greater than endtime");
    }
  };

  const findAvailableRooms = () => {
    setAvailableRooms([]);
    setDisplayNoRoomsError(true);
    var selected_Building_Details = data.Buildings.filter(
      (item) => selectedBuilding === item.name
    );
    var availableRooms = [];
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    console.log(time);
    var formatted_date = moment(date).format("DD/MM/YYYY");
    console.log(formatted_date);
    var format = "hh:mm";
    console.log(selected_Building_Details);
    selected_Building_Details.forEach((data) => {
       //The start time or end time of the of the meeting cannot be between any start time and end time of meetings
      data.meetingRooms.forEach((item) => {
        const slots = [];
        item.meetings.forEach((item1) => {
          slots.push(
            item1.date === formatted_date &&
              (moment(startTime, format).isBetween(
                moment(item1.startTime, format),
                moment(item1.endTime, format)
              ) ||
                moment(endTime, format).isBetween(
                  moment(item1.startTime, format),
                  moment(item1.endTime, format)
                ) ||
                moment(item1.startTime, format).isBetween(
                  moment(startTime, format),
                  moment(endTime, format)
                ) ||
                moment(item1.endTime, format).isBetween(
                  moment(startTime, format),
                  moment(endTime, format)
                ))
          );
         
        });
        //If any of the above condition is true then the meeting room is already booked for the selected time 
        if (slots.includes(true)) {
          console.log("Room not avaialable");
        } else {
          //If none of the conditions are true the room can be added to set of available tooms
          setAvailableRooms((oldRooms) => [...oldRooms, item]);
          availableRooms.push(item);
        }
      
      });
    });
  };
  const confirmMeeting = (value) => {

   //Set the selected room name and id and display a confirmation message of meeting
    setSelectedRoom(value.name);
    setSelectedRoomId(value.id);
    setMeetingConfirmation(true);
  };

  const handleDialogClose = (value) => {
    setMeetingConfirmation(value);
  };
  const handleDialogSubmit = (value) => {
    toast.success(`Meeting sucessfully setup`, {
      position: "top-right",
      autoClose: 30000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log(moment(new Date(date)).format("DD/MM/YYYY"));
    createLink({
      variables: {
        id: Math.random(),
        title: title,
        date: moment(new Date(date)).format("DD/MM/YYYY"),
        startTime: startTime,
        endTime: endTime,
        meetingRoomId: selectedRoomId,
      },
    });
    setMeetingConfirmation(value);
    contextData.setBuildings();
    history.replace("/");
  };

  const handleChangeTitle = (value) => {
    console.log("changed");
    setTitle(value);
  };
  const inpuFieldsJSON = [
    {
      id: "title",
      label: "Meeting Title",
      type: "Input",
      value: title,
      onChange: changeHandler,
      error: false,
      helperText: "",
      inputProps: {},
    },
    {
      id: "date",
      label: "Meeting Date",
      type: "date",
      value: date,
      error: dateError,
      helperText: "Cannot setup meeting for past",
      onChange: handleChangeDate,
      inputProps: {},
    },
    {
      id: "time",
      label: "Start Time",
      type: "time",
      value: startTime,
      error: startTimeRangeError,
      helperText: startTimeErrorMessage,
      onChange: handleChangeStartTime,
      inputProps: {
        step: 300, // 5 min
      },
    },
    {
      id: "endtime",
      label: "End Time",
      type: "time",
      value: endTime,
      error: endTimeRangeError,
      helperText: endTimeErrorMessage,
      onChange: handleChangeEndTime,
      inputProps: {
        step: 300,
      },
    },
  ];

  const dialogContent = () => {
    return (
      <div className={classes.dialogcontent}>
        <p>Meeting Date : {date}</p>
        <p>Start Time : {startTime}</p>
        <p>End Time : {endTime}</p>
        <p>Building : {selectedBuilding}</p>
        <p>Room : {selectedRoom}</p>
      </div>
    );
  };

  return (
    <div style={{ marginLeft: 30 }}>
      {data !== null ? (
        <div>
          <h2>Book a Meeting</h2>
          <p style={{ fontSize: 12 }}>
            Please fill the below details to find the best available resources
          </p>
          {console.log(data)}
          <FormControl className={classes.input}>
            <InputLabel id="demo-simple-select-label">Building</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedBuilding}
              label="Select Building"
              onChange={handleChange}
            >
              {data.Buildings.map((item) => {
                return <MenuItem value={item.name}>{item.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
          {selectedBuilding !== "" ? (
            <div>
              <Grid container spacing={3}>
                {inpuFieldsJSON.map((item) => {
                  return (
                    <Grid item>
                      <TextField
                        id={item.id}
                        label={item.label}
                        type={item.type}
                        value={item.value}
                        onChange={item.onChange}
                        className={classes.input}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        error={item.error}
                        helperText={item.error === true ? item.helperText : ""}
                        inputProps={item.inputProps}
                      />
                    </Grid>
                  );
                })}
              </Grid>
              <Button
                variant="contained"
                color="primary"
                onClick={findAvailableRooms}
                disabled={enableNextCondition === true ? false : true}
              >
                Next
              </Button>
            </div>
          ) : (
            <>{console.log(selectedBuilding)}</>
          )}
          <div>
            {availableRooms.length !== 0 ? (
              <>
                <ListComponent
                  data={availableRooms}
                  listRootStyle={classes.listRoot}
                  headingStyle={classes.header}
                  listItemStyle={classes.listitem}
                  listTitle="Available Rooms"
                  secondaryActionType="button"
                  secondaryActionText="Choose Room"
                  listItemTextTitle="name"
                  component="bookMeeting"
                  building={selectedBuilding}
                  onRoomSelected={confirmMeeting}
                />
              </>
            ) : (
              <>
                {displayNoRoomsError === true ? (
                  <>
                    <p style={{ color: "red" }}>
                      No Rooms Available for the selected date and time
                    </p>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}

      <DialogComponent
        title="Meeting Confirmation"
        dialogContentMainText="Below are the meeting details"
        meetingConfirmation={meetingConfirmation}
        dialogContent={dialogContent()}
        actionCloseText="Cancel"
        actionSubmitText="Confirm Meeting"
        onCloseDialog={handleDialogClose}
        onSubmitDialog={handleDialogSubmit}
      />
    </div>
  );
}
