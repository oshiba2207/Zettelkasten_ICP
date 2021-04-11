import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from "@chakra-ui/core";
import { Auth0Provider } from "@auth0/auth0-react";
/*  import { SpaceClient } from '@fleekhq/space-client';

  // default port exposed by the daemon for client connection is 9998
  const client = new SpaceClient({
    url: `http://0.0.0.0:9998`,
  });*/
/* import { Auth0Provider } from '@auth0/auth0-react';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID; */

ReactDOM.render(
  <Auth0Provider
    domain="dev-xrqyheme.eu.auth0.com"
    clientId="fLN6d5cB4piL9388kH6flyWl06gzRv0t"
    redirectUri={window.location.origin}
  >
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Auth0Provider>,
  document.getElementById('root')
);
