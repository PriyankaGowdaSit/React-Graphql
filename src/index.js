import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import reportWebVitals from "./reportWebVitals";
const client = new ApolloClient({
  uri: "https://smart-meeting.herokuapp.com",
  cache: new InMemoryCache({}),
  headers: {
    token: "token_priyankanew",
  },
});
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
