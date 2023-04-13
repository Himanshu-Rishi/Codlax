import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { Menu } from '@mui/material';
import { useEffect } from 'react';

const Navbar = () => {
  const gapi = window.gapi;
  const google = window.google;

  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const DISCOVERY_DOC =
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
  const SCOPES = "https://www.googleapis.com/auth/calendar";

  const accessToken = localStorage.getItem("access_token");
  const expiresIn = localStorage.getItem("expires_in");

  let gapiInited = false,
    gisInited = false,
    tokenClient;

  function gapiLoaded() {
    gapi.load("client", initializeGapiClient);
  }
  function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: "", // defined later
    });

    gisInited = true;
  }
  useEffect(() => {
    gapiLoaded();
    gisLoaded();
  });

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    // account menu functions

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open_account = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose_account = () => {
        setAnchorEl(null);
    };
    



  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;

    if (accessToken && expiresIn) {
      gapi.client.setToken({
        access_token: accessToken,
        expires_in: expiresIn,
      });
      // listUpcomingEvents();
    }
  }

  

  //Enables user interaction after all libraries are loaded.

  function handleAuthClick() {
    tokenClient.callback = async (resp) => {
      if (resp.error) {
        throw resp;
      }
      // await listUpcomingEvents();
      const { access_token, expires_in } = gapi.client.getToken();
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("expires_in", expires_in);
    };

    if (!(accessToken && expiresIn)) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({ prompt: "" });
    }
  }

  //Sign out the user upon button click.

  function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken("");
      localStorage.clear();
    }
  }

  // async function listUpcomingEvents() {
  //   let response;
  //   try {
  //     const request = {
  //       calendarId: "primary",
  //       timeMin: new Date().toISOString(),
  //       showDeleted: false,
  //       singleEvents: true,
  //       maxResults: 10,
  //       orderBy: "startTime",
  //     };
  //     response = await gapi.client.calendar.events.list(request);
  //   } catch (err) {
  //     document.getElementById("content").innerText = err.message;
  //     return;
  //   }

  //   const events = response.result.items;
  //   if (!events || events.length === 0) {
  //     document.getElementById("content").innerText = "No events found.";
  //     return;
  //   }
  //   // Flatten to string to display
  //   const output = events.reduce(
  //     (str, event) =>
  //       `${str}${event.summary} (${
  //         event.start.dateTime || event.start.date
  //       })\n`,
  //     "Events:\n"
  //   );
  //   document.getElementById("content").innerText = output;
  // }

  function addManualEvent() {
    var event = {
      kind: "calendar#event",
      summary: "Event 2",
      location: "Masai School, Bangalore",
      description: "Paty time",
      start: {
        dateTime: "2023-03-18T01:05:00.000Z",
        timeZone: "UTC",
      },
      end: {
        dateTime: "2023-03-18T01:35:00.000Z",
        timeZone: "UTC",
      },
      recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
      attendees: [
        { email: "techmovieadd@gmail.com", responseStatus: "needsAction" },
      ],
      reminders: {
        useDefault: true,
      },
      guestsCanSeeOtherGuests: true,
    };

    var request = gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
      sendUpdates: "all",
    });
    request.execute(
      (event) => {
        console.log(event);
        window.open(event.htmlLink);
      },
      (error) => {
        console.error(error);
      }
    );
  }

    return (
      <div className="navbar_container">
        <div>
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <MenuIcon
              sx={{ color: "white", marginLeft: "10px", marginTop: "10px" }}
            ></MenuIcon>
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper sx={{ marginLeft: "15px" }}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleClose}>
                        <Link to="/kickstart">Kickstart</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="/searchuser">Search User</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Link to="/about">About</Link>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
        <div className="account_box">
          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <img
                    alt="My account"
                    style={{ width: "32px", height: "32px" }}
                    src="/Images/profile.png"
                  />
                </IconButton>
              </Tooltip>
            </Box>
            <div className="home_profile_section">
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open_account}
                onClose={handleClose_account}
                onClick={handleClose_account}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose_account}>
                  <i className="uil uil-user-circle menu__icons"></i>
                  <button
                    className="button_to_text"
                    disabled={accessToken && expiresIn}
                    onClick={handleAuthClick}
                  >
                    Login
                  </button>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose_account}>
                  <i className="uil uil-user-nurse menu__icons"></i> About
                  Developer
                </MenuItem>
                <MenuItem onClick={handleClose_account}>
                  <i className="uil uil-github menu__icons"></i>
                  Github
                </MenuItem>
                <MenuItem onClick={handleClose_account}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <button
                    className="button_to_text"
                    disabled={!accessToken && !expiresIn}
                    onClick={handleSignoutClick}
                  >
                    Logout
                  </button>
                </MenuItem>
              </Menu>
            </div>
          </React.Fragment>
        </div>
      </div>
    );
}

export default Navbar
