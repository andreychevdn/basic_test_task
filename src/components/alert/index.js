import {useContext} from "react";

import { Alert } from "@material-ui/lab";

import { AlertContext } from "./alertContext";

export const AppAlert = () => {
  const { alert } = useContext(AlertContext);
  let { text } = alert;

  return (
    <div >
      <Alert 
        style={{position: "fixed", bottom: 0, left: '38%'}}
        variant="filled"
        severity="error"
      >
        {text}
      </Alert>
    </div>
  );
};



