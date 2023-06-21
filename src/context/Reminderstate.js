import React from "react";
import ReminderContext from "./ReminderContext";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
const Reminderstate = (props) => {
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
    }
  }
  const details = {
    "title": "",
    "site_name": "",
    "start_time": "",
    "end_time": "",
    "url": ""
  }
const addManualEvent = () => {
    var event = {
    kind: "calendar#event",
    summary: "Contest Reminder",
    location: details.site_name,
    description: details.title,
    start: {
      dateTime: details.start_time,
      timeZone: "UTC",
    },
    end: {
      dateTime: details.end_time,
      timeZone: "UTC",
    },
    recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
    attendees: [
      { email: "himanshuyadav5449@gmail.com", responseStatus: "needsAction" },
    ],
    reminders: {
      useDefault: true,
    },
    guestsCanSeeOtherGuests: true,
  };

  let request = gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event,
    sendUpdates: "all",
  });
  request.execute(
    (event) => {

      toast.success("Event added to calendar!");
      console.log(event)
      console.log(details)
    },
    (error) => {
      toast.error("Please add event manually!");
    }
  );
}
  return (
    <ReminderContext.Provider value={{ addManualEvent, details }}>
      <Toaster position="bottom-center" reverseOrder={false} />
      {props.children}
    </ReminderContext.Provider>
  );
};

export default Reminderstate;