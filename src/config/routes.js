import React from "react";
import { Switch, Route } from "react-router-dom";
import HomeView from "../screens/homeView";
import PlayGameView from "../screens/playGameView";
import AboutUsView from "../screens/aboutUsView";
import LoginView from "../screens/loginView";
import NewUserView from "../screens/newUserView";
import NewGameView from "../screens/newGameView";
import MyGamesView from "../screens/myGamesView";
import SuccessView from "../screens/successView";
import RecoveryView from "../screens/recoveryView";
import NewGifView from "../screens/newGifView";
import WorkplanView from "../screens/workplanView";
import AssignedActivitiesView from "../screens/assignedActivitiesView";

import {
  INDEX_ROUTE,
  PLAY_GAME_VIEW_ROUTE,
  ABOUT_US_VIEW_ROUTE,
  USER_VIEW_ROUTE,
  LOGIN_VIEW_ROUTE,
  NEW_GAME_VIEW_ROUTE,
  MY_GAMES_VIEW_ROUTE,
  SUCCESS_VIEW_ROUTE,
  RECOVERY_VIEW_ROUTE,
  NEW_GIF_VIEW_ROUTE,
  WORKPLAN_VIEW_ROUTE,
  ASSIGNED_VIEW_ROUTE,
} from "./routesConstants";

const Routes = () => {
  return (
    <Switch>
      <Route path={ASSIGNED_VIEW_ROUTE} component={AssignedActivitiesView} />
      <Route path={WORKPLAN_VIEW_ROUTE} component={WorkplanView} />
      <Route path={NEW_GIF_VIEW_ROUTE} component={NewGifView} />
      <Route path={RECOVERY_VIEW_ROUTE} component={RecoveryView} />
      <Route path={SUCCESS_VIEW_ROUTE} component={SuccessView} />
      <Route path={MY_GAMES_VIEW_ROUTE} component={MyGamesView} />
      <Route path={NEW_GAME_VIEW_ROUTE} component={NewGameView} />
      <Route path={LOGIN_VIEW_ROUTE} component={LoginView} />
      <Route path={USER_VIEW_ROUTE} component={NewUserView} />
      <Route path={ABOUT_US_VIEW_ROUTE} component={AboutUsView} />
      <Route path={PLAY_GAME_VIEW_ROUTE} component={PlayGameView} />
      <Route path={INDEX_ROUTE} component={HomeView} />
    </Switch>
  );
};

export default Routes;
