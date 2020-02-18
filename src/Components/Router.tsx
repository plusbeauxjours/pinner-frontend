import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// import HomeHome from "../Routes/Login/HomeHome";
import Home from "../Routes/Login/Home";
import Verification from "../Routes/Login/Verification";
import EditEmailAddress from "../Routes/User/EditEmailAddress";
import Approach from "../Routes/Login/Approach";
import NotFound from "./NotFound";
import NoValid from "./NoValid";

import LoggedInPages from "./LoggedInPages";

interface IProps {
  isLoggedIn: boolean;
  history: any;
  onUpdate: () => void;
}

const LoggedOutPages = () => (
  <Switch>
    {/* <Route path="/" exact={true} component={HomeHome} /> */}
    <Route path="/" exact={true} component={Home} />
    <Route path="/verification/:key" component={Verification} />
    <Route path="/confirm/:key" component={EditEmailAddress} />
    <Route path="/verification" component={Verification} />
    <Route path="/approach" component={Approach} />
    <Route path="/404" exact={true} component={NotFound} />
    <Route path="/novalid" exact={true} component={NoValid} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter: React.FunctionComponent<IProps> = ({
  isLoggedIn,
  history,
  onUpdate
}) => {
  return <Router>{isLoggedIn ? <LoggedInPages /> : <LoggedOutPages />}</Router>;
};

export default AppRouter;
