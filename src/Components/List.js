import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
export default function ListComponent(props) {
  return (
    <List className={props.listRootStyle}>
      {console.log(props.data)}
      <p className={props.headingStyle}>{props.listTitle}</p>
      {props.data.map((item) => {
        return (
          <>
            <ListItem
              id={item.id}
              alignItems="flex-start"
              className={props.listItemStyle}
              secondaryAction={
                props.secondaryActionType === "button" ? (
                  <Button
                    variant="text"
                    color="secondary"
                    size="small"
                    onClick={() => props.onRoomSelected(item)}
                  >
                    {props.secondaryActionText}
                  </Button>
                ) : (
                  <></>
                )
              }
            >
              <ListItemText
                primary={item[props.listItemTextTitle]}
                secondary={
                  <div>
                    <Typography
                      id="secondaryTitle"
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {props.component === "bookMeeting" ? (
                        <>
                          {props.building} - Floor {item.floor}
                        </>
                      ) : (
                        <>
                          {props.component === "upcomingMeetings" ? (
                            <>
                              {item.startTime} -{item.endTime}
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </Typography>
                  </div>
                }
              />
            </ListItem>
          </>
        );
      })}
    </List>
  );
}
