import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/home/HomePage";
import FavPage from "./components/favs/FavPage";
import LoginPage from "./components/login/LoginPage";
import { useSelector } from "react-redux";

function PrivateRoute({ path, component, ...rest }) {
  const user = useSelector((state) => state.user);
  if (user && user.loggedIn) {
    return <Route path={path} component={component} {...rest} />;
  } else {
      alert('Inicie sesion para continuar')
    return <Redirect to="/login" {...rest} />;
  }
}

export default function Routes() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute path="/favs" component={FavPage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  );
}
