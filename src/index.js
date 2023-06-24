import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from "@auth0/auth0-react";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-pf3lr4v3cl1y4l6u.us.auth0.com"
    clientId="pi9sGjMXqMNedPpwKayrhFg0OrEdtbYO"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);
