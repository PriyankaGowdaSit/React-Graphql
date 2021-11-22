import React from "react";

// Creating the context object and passing the default values.
const authContext = React.createContext({
  buildings: null,
  setBuildings: () => {},
});

export default authContext;
