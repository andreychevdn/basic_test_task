import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import CssBaseline from '@material-ui/core/CssBaseline';

import {Users} from "./pages/users";
import {AlertProvider} from "./components/alert/alertProvider";
import {UserInfo} from "./pages/userInfo";
import {USERS, USER_INFO} from "./router/constants";


export const App = () => {
  return (
    <AlertProvider>
        <CssBaseline />
        <Router>
          <Switch>
            <Redirect exact from="/" to={USERS}/>
            <Route path={USERS} component={Users}/>
            <Route path={`${USER_INFO}/:id`} component={UserInfo}/>
          </Switch>
        </Router>
    </AlertProvider>
  );
};


