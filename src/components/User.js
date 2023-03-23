import { List } from "@mui/material";
import React from "react";
import UserItem from "./UserItem";

const User = (props) => {
  return (
    <div className="contest_container_user glass">
      <List
        sx={{
          width: "100%",
          maxWidth: "50vw",
          bgcolor: "background.paper",
          borderRadius: "10px",
        }}
      >
        <UserItem
          title={"Leetcode"}
          url={`https://leetcode.com/${props.name}`}
          user={props.name}
          flag={true}
        />
        <UserItem
          title={"Codechef"}
          url={`https://www.codechef.com/users/${props.name}`}
          user={props.name}
          flag={true}
        />
        <UserItem
          title={"Codeforces"}
          url={`https://codeforces.com/profile/${props.name}`}
          user={props.name}
          flag={false}
        />
      </List>
    </div>
  );
};

export default User;
