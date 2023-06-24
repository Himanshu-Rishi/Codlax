import * as React from "react";
import Contest from "./Contest";
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
const Codechef = () => {
  const open = false;
  const anchorRef = React.useRef(null);
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open_account = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose_account = () => {
    setAnchorEl(null);
  };
  // fetching api
  const [array, setarray] = useState([]);
  const fetchData = async () => {
    fetch("https://kontests.net/api/v1/code_chef")
      .then((response) => response.json())
      .then((data) => {
        setarray(data);
      });
  };
  const Navigate = useNavigate();
  const home = () => {
    Navigate("/");
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="background__section">
      <Toaster reverseOrder={false} position="bottom-center" />
      <div className="sub_navbar">
        <div className="sub_navbar_arrow_container">
          <HomeIcon
            fontSize="large"
            className="home__button"
            onClick={home}
          ></HomeIcon>
        </div>
        <div className="sub_navbar_heading">
          <h1 className="section__title">CodeChef</h1>
          <span className="section__subtitle">
            CodeChef is an online educational platform and competitive
            programming community of global programmers.
          </span>
        </div>
        <div className="account_box_second">
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
                    style={{ width: "36px", height: "36px" }}
                    src="/Images/profile.png"
                  />
                </IconButton>
              </Tooltip>
            </Box>
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
              <a href="https://github.com/Himanshu-Rishi">
                <MenuItem onClick={handleClose_account}>
                  <i className="uil uil-github menu__icons"></i>
                  Github
                </MenuItem>
              </a>
              <Divider />
              <a href="https://rishiportfolio.vercel.app">
                <MenuItem onClick={handleClose_account}>
                  <i className="uil uil-user-nurse menu__icons"></i> About
                  Developer
                </MenuItem>
              </a>
            </Menu>
          </React.Fragment>
        </div>
      </div>
      <Contest data={array} fetchData={fetchData} />
    </div>
  );
};

export default Codechef;
