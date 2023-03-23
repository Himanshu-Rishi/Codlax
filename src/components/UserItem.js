import {
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const UserItem = (props) => {
  return (
    <Container>
      <ListItem
        alignItems="flex-start"
        sx={{
          height: "15vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ListItemAvatar>
          <img
            alt="Add Reminder"
            src="/Images/user.png"
            style={{ width: "5vw", height: "8vh", marginRight: "2vh" }}
          />
        </ListItemAvatar>
        <h1 className="site_heading">{props.title}</h1>
        <div className="contest_section_buttons">
          <Button
            className="link__button"
            variant="contained"
            sx={{ backgroundColor: "#606f79" }}
            href={props.url}
          >
            Profile Link
          </Button>
        </div>
      </ListItem>
      {props.flag ? <Divider variant="inset" component="li" /> : <span></span>}
    </Container>
  );
};

export default UserItem;
