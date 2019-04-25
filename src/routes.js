import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Main from './pages/main';
import Serie from './pages/serie';
import AddSerie from './pages/createItem';
import SignIn from './pages/login/signin/index';
import SignUp from './pages/login/signup/index';
import { isAuthenticated } from "./services/auth";

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
        )
      }
    />
);
  

const Routes = () => (
        <Switch>
            <PrivateRoute exact path="/" component={Main} />
            <PrivateRoute exact path="/series/:id" component={Serie} />
            <PrivateRoute exact path="/series" component={Main} />
            <PrivateRoute exact path="/series-status/:status" component={Main}/>
            <PrivateRoute exact path="/series-search/:title" component={Main}/>
            <PrivateRoute exact path="/series-create" component={AddSerie} />
            <Route exact path="/signin" component={SignIn}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
);

export default Routes;