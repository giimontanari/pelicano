import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
  Avatar,
} from "@material-ui/core";
import {
  ABOUT_US_VIEW_ROUTE,
  USER_VIEW_ROUTE,
  LOGIN_VIEW_ROUTE,
  NEW_GAME_VIEW_ROUTE,
  GAMES_VIEW_ROUTE,
  MY_GAMES_VIEW_ROUTE,
  WORKPLAN_VIEW_ROUTE,
  ASSIGNED_VIEW_ROUTE,
} from "../../config/routesConstants";
import MenuIcon from "@material-ui/icons/Menu";
import PlaylistAdd from "@material-ui/icons/PlaylistAdd";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import GamesIcon from "@material-ui/icons/Games";
import VideogameAssetIcon from "@material-ui/icons/VideogameAsset";
import ExitToApp from "@material-ui/icons/ExitToApp";
import AssignmentIcon from "@material-ui/icons/Assignment";
import WorkIcon from "@material-ui/icons/Work";
import Logo from "../../assets/logo.png";

/**
 * Este componente es el Header de la plataforma, con las UI disponibles para navegar.
 */
export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerHomeClose = () => {
    props.history.push(GAMES_VIEW_ROUTE);
    setOpen(false);
  };

  const handleDrawerMyGameClose = () => {
    props.history.push(MY_GAMES_VIEW_ROUTE);
    setOpen(false);
  };

  const handleDrawerCreateClose = () => {
    props.history.push(NEW_GAME_VIEW_ROUTE);
    setOpen(false);
  };

  const handleDrawerExitClose = () => {
    props.exitApp();
    setOpen(false);
  };

  const handleDrawerCreateWork = () => {
    props.history.push(WORKPLAN_VIEW_ROUTE);
    setOpen(false);
  };

  const handleDrawerGameWork = () => {
    props.history.push(ASSIGNED_VIEW_ROUTE);
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {props.login ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Typography variant="h6" className={classes.title}>
            <img src={Logo} alt="tea" className={classes.logo} />
          </Typography>
          {!props.login ? (
            <div className={classes.container}>
              {!props.login ? (
                <Button
                  className={classes.title}
                  color="inherit"
                  onClick={() => props.history.push(USER_VIEW_ROUTE)}
                >
                  Únete
                </Button>
              ) : null}
              {!props.login ? (
                <Button
                  className={classes.title}
                  color="inherit"
                  onClick={() => props.history.push(LOGIN_VIEW_ROUTE)}
                >
                  Inicia sesión
                </Button>
              ) : null}
              <Button
                className={classes.title}
                color="inherit"
                onClick={() => props.history.push(ABOUT_US_VIEW_ROUTE)}
              >
                Nosotros
              </Button>
            </div>
          ) : (
            <div className={classes.containerAvatar}>
              <Avatar
                alt="Avatar"
                src={props.user.avatar}
                className={classes.avatar}
              />
              <div className={classes.containerUser}>
                <span className={classes.textUserNickname}>
                  {props.user.nickname}
                </span>
                <span className={classes.textUserEmail}>
                  {props.user.email}
                </span>
              </div>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton style={{ color: "#ffffff" }} onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List style={{ backgroundColor: "#ffffff" }}>
          <ListItem button key={0} onClick={handleDrawerCreateClose}>
            <ListItemIcon>
              <PlaylistAdd />
            </ListItemIcon>
            <ListItemText primary="Nuevo Juego" />
          </ListItem>
          <ListItem button key={1} onClick={handleDrawerMyGameClose}>
            <ListItemIcon>
              <GamesIcon />
            </ListItemIcon>
            <ListItemText primary="Juegos Creados" />
          </ListItem>
          <ListItem button key={2} onClick={handleDrawerHomeClose}>
            <ListItemIcon>
              <VideogameAssetIcon />
            </ListItemIcon>
            <ListItemText primary="Juegos" />
          </ListItem>
          {props.user.type === "elementary" ? (
            <ListItem button key={3} onClick={handleDrawerGameWork}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Mis Actividades" />
            </ListItem>
          ) : null}
          {props.user.type === "advanced" ||
          props.user.type === "administrator" ? (
            <ListItem button key={4} onClick={handleDrawerCreateWork}>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary="Planes de Trabajo" />
            </ListItem>
          ) : null}
        </List>
        <Divider />
        <List>
          <ListItem button key={6} onClick={handleDrawerExitClose}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Cerrar Sesión" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#ffffff",
  },
  title: {
    flexGrow: 1,
    color: "#ffffff",
  },
  container: {
    justifyContent: "right",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - 240px)`,
    marginLeft: 240,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#6200EE",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -240,
    backgroundColor: "#ffffff",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  avatar: {
    width: 45,
    height: 45,
  },
  containerAvatar: {
    margin: 10,
    display: "flex",
  },
  textUserNickname: {
    fontSize: 14,
    marginLeft: 10,
    color: "#e9b8fe",
  },
  textUserEmail: {
    fontFamily: "Roboto",
    fontSize: 13,
    marginLeft: 10,
  },
  containerUser: {
    fontFamily: "Roboto",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    marginTop: 5,
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:425px)"]: {
      display: "none",
    },
  },
  logo: {
    marginTop: 8,
    width: 90,
    // eslint-disable-next-line no-useless-computed-key
    ["@media (max-width:425px)"]: {
      display: "none",
    },
  },
}));

Header.propTypes = {
  history: PropTypes.object.isRequired,
  login: PropTypes.bool.isRequired,
  exitApp: PropTypes.func,
  user: PropTypes.object.isRequired,
};
