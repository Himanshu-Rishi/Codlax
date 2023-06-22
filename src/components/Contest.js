import { List } from "@mui/material";
import React from "react";
import ContestItem from "./ContestItem";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

const Contest = (props) => {
  const data = props.data;
  return (
    <div className="contest_container glass">
      <List
        sx={{
          width: "100%",
          height: "60vh",
          // maxWidth: "50vw",
          bgcolor: "background.paper",
          borderRadius: "10px",
        }}
      >
        <InfiniteScroll
          dataLength={4} //This is important field to render the next data
          next={props.fetchData}
          hasMore={true}
          loader={<Spinner />}
          endMessage={<span></span>}
        >
          {data.map((element) => {
            let start = element.start_time;
            const start_result = new Date(start).toLocaleString("en-US", {
              timeZone: "Asia/Kolkata",
            });
            let end = element.end_time;
            const end_result = new Date(end).toLocaleString("en-US", {
              timeZone: "Asia/Kolkata",
            });
            const day = new Date(start_result).toLocaleDateString("en-US", {
              dateStyle: "medium",
            });
            const first = new Date(start_result).toLocaleDateString([], {
              hour: "numeric",
              minute: "2-digit",
              hourCycle: "h12",
            });
            const second = new Date(end_result).toLocaleDateString([], {
              hour: "numeric",
              minute: "2-digit",
              hourCycle: "h12",
            });

            return (
              <ContestItem
                flag={true}
                title={element.name}
                key={element.url}
                url={element.url}
                today_flag={element.in_24_hours}
                day={day}
                end_time={second.slice(11)}
                start_time={first.slice(11)}
                status={element.status}
                raw_start_time={element.start_time}
                raw_end_time={element.end_time}
                site_details={props.site_details}
              />
            );
          })}
        </InfiniteScroll>
      </List>
    </div>
  );
};

export default Contest;
