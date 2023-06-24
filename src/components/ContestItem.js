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
import { toast } from "react-hot-toast";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
const Contest_item = (props) => {
  const history = useNavigate();
  const { isAuthenticated} = useAuth0();
  const handleClick = () => {
    if (!isAuthenticated) {
      toast.error("Go to Homepage and Login First..!");
    } else {
      const url = googleCalendarEventUrl({
        start: "20201212T100000Z",
        end: "20201212T110000Z",
        title: props.title,
        details: `This contest will be held on ${props.site_details}. Contest Link for the contest is ${props.url}`,
        location: props.site_details,
      });
      history(url, {replace: false});
    }
  };
  return (
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
                style={{ width: "5vw", height: "8vh", marginRight: "2vh" }}
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
      {props.flag ? <Divider variant="inset" component="li" /> : <span></span>}
    </Container>
  );
};

export default Contest_item;
