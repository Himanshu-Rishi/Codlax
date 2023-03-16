import {Button, Divider, ListItem, ListItemAvatar, ListItemText, Typography} from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'

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
          primary="TypeDB Forces 2023 (Div. 1 + Div. 2, Rated, Prizes!)"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Today
              </Typography>
              {" — Contest status: "}
            </React.Fragment>
          }
        />
        <div className="contest_section_buttons">
          <Button variant="contained" sx={{ backgroundColor: "#fd646f" }}>
            Contest Link
          </Button>
        </div>
      </ListItem>
      {props.flag?
        <Divider variant="inset" component="li" />:
        <span></span>
      }
    </Container>
  );
}

export default Contest_item