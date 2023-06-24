import {
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { googleCalendarEventUrl } from "google-calendar-url";
import {  toast } from "react-hot-toast";
import { useAuth0 } from "@auth0/auth0-react";
const Contest_item = (props, history) => {
  const { isAuthenticated} = useAuth0();
  const handleClick = () => {
    console.log(isAuthenticated)
    if (isAuthenticated === false) {
      toast.error("Go to Homepage and Login First..!");
    } else {
      let temp = props.raw_start_time.replace(/\-/g, "");
      temp = temp.replace(/\:/g, "");
      temp = temp.replace(/\./g, "");
      temp = temp.slice(0, 12);
      let temp1 = props.raw_end_time.replace(/\-/g, "");
      temp1 = temp1.replace(/\:/g, "");
      temp1 = temp1.replace(/\./g, "");
      temp1 = temp1.slice(0, 12);
      const url = googleCalendarEventUrl({
        start: `${temp}000Z`,
        end: `${temp1}000Z`,
        title: props.title,
        details: `This contest will be held on ${props.site_details}. Contest Link for the contest is ${props.url}. The Contest will be held on ${props.day} and  Timings : ${props.start_time}-${props.end_time}`,
        location: props.site_details,
      });
      window.location.replace(url);
    }
  };
  return (
    <>
      <Container className="contest__box">
        <ListItem
          alignItems="flex-start"
          sx={{
            height: "15vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="context__box"
        >
          <ListItemAvatar>
            <Tooltip title="Add Reminder">
              <button className="button_to_text" onClick={handleClick}>
                {" "}
                <img
                  alt="Add Reminder"
                  src="/Images/calendar.png"
                  className="reminder__image"
                  style={{ minWidth: "5vw", height: "8vh", marginRight: "2vh" }}
                />
              </button>
            </Tooltip>
          </ListItemAvatar>
          <ListItemText
            primary={props.title}
            secondary={
              <React.Fragment>
                <div className="upper">
                  <Typography
                    sx={{ display: "inline" }}
                    component="div"
                    variant="body2"
                    color="text.primary"
                  >
                    {props.today_flag === "Yes" ? "Today" : `${props.day}`}
                  </Typography>
                  {props.status === "CODING" ? (
                    <div className="status">
                      <span className="dash">-</span> Contest status:
                      <span style={{ color: "red" }}>Live</span>
                    </div>
                  ) : (
                    <div className="status">
                      <span className="dash">-</span> Contest status:
                      <span style={{ color: "green" }}> Register</span>
                    </div>
                  )}
                  <br />
                </div>
                <Typography
                  sx={{ display: "inline" }}
                  component="div"
                  variant="body2"
                  color="text.primary"
                >
                  Timings: {props.start_time}-{props.end_time}
                </Typography>
              </React.Fragment>
            }
          />
          <div className="contest_section_buttons">
            <Button
              className="link__button"
              variant="contained"
              sx={{ backgroundColor: "#fd646f" }}
              href={props.url}
            >
              Contest Link
            </Button>
          </div>
        </ListItem>
        {props.flag ? (
          <Divider variant="inset" component="li" />
        ) : (
          <span></span>
        )}
      </Container>

      <Container className="mobile__contest__box">
       
            <Tooltip title="Add Reminder" className="mobile__reminder__image">
              <button className="button_to_text" onClick={handleClick}>
                {" "}
                <img
                  alt="Add Reminder"
                  src="/Images/calendar.png"
                  className="reminder__image"
                  style={{ minWidth: "5vw", height: "8vh", marginRight: "2vh" }}
                />
              </button>
            </Tooltip>
          <ListItemText
          className="mobile__text"
            primary={props.title}
            secondary={
              <React.Fragment>
                <div className="upper">
                  <Typography
                    sx={{ display: "inline"}}
                    component="div"
                    variant="body2"
                    color="text.primary"
                  >
                    {props.today_flag === "Yes" ? "Today" : `${props.day}`}
                  </Typography>
                  {props.status === "CODING" ? (
                    <div className="status">
                      <span className="dash">-</span> Contest status:
                      <span style={{ color: "red" }}>Live</span>
                    </div>
                  ) : (
                    <div className="status">
                      <span className="dash">-</span> Contest status:
                      <span style={{ color: "green" }}> Register</span>
                    </div>
                  )}
                  <br />
                </div>
                <Typography
                  sx={{ display: "inline" }}
                  component="div"
                  variant="body2"
                  color="text.primary"
                >
                  Timings: {props.start_time}-{props.end_time}
                </Typography>
              </React.Fragment>
            }
          />
          <div className="contest_section_buttons">
            <Button
              className="link__button"
              variant="contained"
              sx={{ backgroundColor: "#fd646f" }}
              href={props.url}
            >
              Contest Link
            </Button>
          </div>
        {props.flag ? (
          <Divider variant="inset" component="li" className="mobile__divider" />
        ) : (
          <span></span>
        )}
      </Container>
    </>
  );
};

export default Contest_item;
