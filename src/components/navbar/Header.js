import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import { menu } from "helpers/headerMenu";
import { makeStyles, useTheme } from "@mui/styles";
import logo from "assets/images/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import Menu from "@mui/material/Menu";
import {
  AppBar,
  Toolbar,
  Grid,
  Avatar,
  List,
  ListItem,
  Container,
  ListItemText,
  ListItemButton,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    flexGrow: 1,
  },
  appBar: {
    paddingTop: "2em",
  },
  grow: {
    flex: 1,
    justifyContent: "space-between",
  },
  list: {
    "& .MuiListItemText-root": {
      textAlign: "center",
      width: "inherit",
      maxWidth: "100%",
    },
  },
  title: {
    [theme.breakpoints.down("md")]: {
      flexGrow: 1,
    },
  },
  registerBtn: {
    background: theme.palette.common.red,
    borderRadius: "2rem",
    "& .MuiTypography-root": {
      color: theme.palette.common.white,
    },
    "&:hover": {
      background: theme.palette.common.lightRed,
      "& .MuiTypography-root": {
        color: theme.palette.common.red,
      },
    },
  },

  active: {
    "& .MuiListItemButton-root": {
      color: theme.palette.common.red,

      "& .MuiListItemIcon-root": {
        color: theme.palette.common.red,
      },

      "& .MuiTypography-root": {
        color: theme.palette.common.red,
      },
    },
    listItem: {
      "&.MuiListItemButton-root": {
        "&:hover": {
          background: "transparent",
          "& .MuiTypography-root": {
            color: theme.palette.common.red,
          },
        },
      },
    },
  },
}));
const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  console.log(location.pathname);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="fixed">
      <Container maxWidth="false" disableGutters>
        <Toolbar sx={{ justifyContent: "space-around" }}>
          <Grid item className={classes.title}>
            <Grid item width="80%">
              <Avatar src={logo} sx={{ width: 100, height: "80%" }} />
            </Grid>
          </Grid>
          <div>
            {isMobile ? (
              <>
                <IconButton
                  // size="large"
                  edge="start"
                  aria-label="menu"
                  sx={{ color: "red", fontSize: "3rem" }}
                  onClick={handleMenu}
                >
                  <MenuIcon fontSize="3rem" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  color="secondary"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <List style={{ display: "flex", flexDirection: "column" }}>
                    {menu.map((item) => {
                      return (
                        <ListItem
                          key={item.id}
                          style={{ width: "inherit" }}
                          className={location.pathname === item.path ? classes.active : null}
                          // classes.active
                        >
                          <ListItemButton
                            disableRipple
                            component={Link}
                            onClick={handleClose}
                            to={item.path}
                          >
                            <ListItemText>{item.title}</ListItemText>
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Menu>
              </>
            ) : (
              <>
                <Grid container className={classes.grow}>
                  <List style={{ display: "flex" }}>
                    {menu.map((item) => {
                      return (
                        <ListItem
                          key={item.id}
                          style={{ width: "inherit" }}
                          className={location.pathname === item.path ? classes.active : null}
                        >
                          <ListItemButton disableRipple component={Link} to={item.path}>
                            <ListItemText>{item.title}</ListItemText>
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                    <ListItemButton
                      className={`${classes.list} ${classes.registerBtn}  ${classes.listItem}`}
                    >
                      <ListItemText>Download App</ListItemText>
                    </ListItemButton>
                  </List>
                </Grid>
              </>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
