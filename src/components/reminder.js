import React from 'react'
import { useEffect } from 'react';

export default function Reminder(){
  // adding gapi
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
    // listUpcomingEvents();
  }
}
}
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
