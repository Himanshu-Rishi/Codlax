import {
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const Contest_item = (props) => {
  return (
    <Container>
      <ListItem
        alignItems="flex-start"
        sx={{
          height: "15vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ListItemAvatar>
          <img
            alt="Add Reminder"
            src="/Images/calendar.png"
            style={{ width: "5vw", height: "8vh", marginRight: "2vh" }}
          />
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
