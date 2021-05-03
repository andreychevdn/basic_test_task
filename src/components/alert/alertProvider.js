import {useState } from "react";

import {AlertContext } from "./alertContext";

export const AlertProvider = ({ children }) => {
  const initialAlert = {
    text: "",
    isVisible: false,
  };
  const [alert, setAlert] = useState(initialAlert);

  
  return (
    <AlertContext.Provider value={{alert, initialAlert, setAlert}}>
        {children}
    </AlertContext.Provider>
  );
};

