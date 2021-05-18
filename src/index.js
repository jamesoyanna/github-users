import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain= "dev-5nzo0adz.us.auth0.com"
      clientId="RAap2zNshl2zTG6rhzeA7WvpQE6Kb73F" 
      redirectUri= {window.location.origin}
      cacheLocation= "localstorage"
      >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
