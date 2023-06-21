import * as React from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { Menu } from "@mui/material";
import { useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import GitHubIcon from "@mui/icons-material/GitHub";
import { toast } from "react-hot-toast";
import ReminderContext from "../context/ReminderContext";

const Navbar = () => {
  const handler = React.useContext(ReminderContext);
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
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
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

  async function handleAuthClick() {
    tokenClient.callback = async (resp) => {
      if (resp.error) {
        toast.error("Login Failed..!");
        handler.isLogin = false;
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
      await tokenClient.requestAccessToken({ prompt: "consent" });
      handler.isLogin = true;
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
    toast.success("Logout Successfully");
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

  return (
    <>
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
                      <Link to="/kickstart">
                        <MenuItem onClick={handleClose}>Kickstart</MenuItem>
                      </Link>
                      <Link to="/searchuser">
                        <MenuItem onClick={handleClose}>Search User</MenuItem>
                      </Link>
                      <Link to="/about">
                        <MenuItem onClick={handleClose}>About</MenuItem>
                      </Link>
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
                  <ListItemIcon>
                    <AccountCircleIcon
                      fontSize="large"
                      sx={{ color: "white" }}
                    />
                  </ListItemIcon>
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
                <button
                  className="button_to_text"
                  disabled={accessToken && expiresIn}
                  onClick={handleAuthClick}
                >
                  <MenuItem onClick={handleClose_account}>
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="medium" />
                    </ListItemIcon>
                    Login
                  </MenuItem>
                </button>
                <Divider />
                <a href="https://rishiportfolio.vercel.app">
                  <MenuItem onClick={handleClose_account}>
                    <ListItemIcon>
                      <PersonIcon fontSize="medium" />
                    </ListItemIcon>
                    About Developer
                  </MenuItem>
                </a>
                <a href="https://github.com/Himanshu-Rishi">
                  <MenuItem onClick={handleClose_account}>
                    <ListItemIcon>
                      <GitHubIcon fontSize="medium" />
                    </ListItemIcon>
                    Github
                  </MenuItem>
                </a>
                <button
                  className="button_to_text"
                  disabled={!accessToken && !expiresIn}
                  onClick={handleSignoutClick}
                >
                  <MenuItem onClick={handleClose_account}>
                    <ListItemIcon>
                      <Logout fontSize="medium" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </button>
              </Menu>
            </div>
          </React.Fragment>
        </div>
      </div>
    </>
  );
};

export default Navbar;
