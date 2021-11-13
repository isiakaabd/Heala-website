import React from "react";
import { makeStyles } from "@mui/styles";
// import { ReactComponent as Vector } from "assets/images/vector.png";
import logo from "assets/images/logo.png";
import play from "assets/images/play.jpg";
// import vector from "assets/images/vector.png";
import store from "assets/images/store.jpg";
import Typography from "@mui/material/Typography";
// import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import {
  AppBar,
  Toolbar,
  Grid,
  Avatar,
  Stack,
  Container,
  ListItemText,
  ListItemButton,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  grow: {
    flex: 1,
    justifyContent: "space-between",
  },
  listbutton: {
    "& .MuiListItemButton-root": {
      "& .MuiTypography-root": {
        [theme.breakpoints.down("sm")]: {
          fontSize: "1.2rem",
        },
      },
      "&:hover": {
        background: "transparent",
        "& .MuiTypography-root": {
          color: theme.palette.common.red,
        },
      },
    },
  },
  container: {
    "& .MuiGrid-root": {
      padding: 0,
      "& > *": {
        width: "inherit",
        // padding: " .5rem .8rem",
        textAlign: "left",
        [theme.breakpoints.down("sm")]: {
          //   padding: " .5rem .8rem",
        },
      },
    },
  },
  link: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
      // order: 4,
    },
  },
  footerBottom: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
      // order: 4,
    },
  },
  footer: {
    boxShadow: "none",
    borderTop: "1px solid #CCCCCC",
    paddingBottom: "2rem",
  },
  footerImage: {
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <AppBar elevation={0} position="static" sx={{ bottom: 0 }} className={classes.footer}>
      <Container maxWidth="false">
        <Toolbar>
          <Grid container gap={2} justifyContent="center">
            <Grid
              item
              container
              md={3}
              xs={12}
              sm={12}
              gap={2}
              justifyContent="center"
              flexDirection="column"
            >
              <Grid item>
                <img src={logo} style={{ width: 150, objectFit: "contain" }} />
                <Typography fontSize="1rem" color="primary">
                  Accessible Health care for all
                </Typography>
              </Grid>
              <Grid item container className={classes.link}>
                <Stack direction="row" spacing={2}>
                  <Avatar>In</Avatar>
                  <Avatar>W</Avatar>
                  <Avatar>In</Avatar>
                  <Avatar>T{/* <FacebookOutlinedIcon /> */}</Avatar>
                  <Avatar>F</Avatar>
                </Stack>
              </Grid>
              <Grid item className={classes.link}>
                <Typography variant="h5" color="primary">
                  &copy; 2021 Doci Health Care Inc.
                </Typography>
              </Grid>
            </Grid>
            <Grid item container flexDirection="column" md={4} xs={12} sm={12}>
              <Grid item md container className={classes.container}>
                <Grid item container columnSpacing={2}>
                  <Grid item xs={6} className={classes.listbutton}>
                    <ListItemButton disableRipple>
                      <ListItemText> Category</ListItemText>
                    </ListItemButton>
                  </Grid>
                  <Grid item xs={6} className={classes.listbutton}>
                    <ListItemButton disableRipple>
                      <ListItemText> Others</ListItemText>
                    </ListItemButton>
                  </Grid>
                </Grid>
                {/* 2 */}
                <Grid item container columnSpacing={2}>
                  <Grid item xs={6} className={classes.listbutton}>
                    <ListItemButton disableRipple>
                      <ListItemText> About Us</ListItemText>
                    </ListItemButton>
                  </Grid>
                  <Grid item xs={6} className={classes.listbutton}>
                    <ListItemButton disableRipple>
                      <ListItemText> FAQ</ListItemText>
                    </ListItemButton>
                  </Grid>
                </Grid>
                <Grid item container columnSpacing={2}>
                  <Grid item xs={6} className={classes.listbutton}>
                    <ListItemButton disableRipple>
                      <ListItemText> Become A partner</ListItemText>
                    </ListItemButton>
                  </Grid>
                  <Grid item xs={6} className={classes.listbutton}>
                    <ListItemButton disableRipple>
                      <ListItemText>Blog</ListItemText>
                    </ListItemButton>
                  </Grid>
                </Grid>
                <Grid item container columnSpacing={2}>
                  <Grid item xs={6} className={classes.listbutton}>
                    <ListItemButton disableRipple>
                      <ListItemText>Career</ListItemText>
                    </ListItemButton>
                  </Grid>
                  <Grid item xs={6} className={classes.listbutton}>
                    <ListItemButton disableRipple>
                      <ListItemText>Contact Us</ListItemText>
                    </ListItemButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container flexDirection="column" md={3} gap={3} sm={12}>
              <Grid item container>
                <Grid item>
                  <Typography variant="body1" color="primary">
                    Download App
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container spacing={4} className={classes.footerImage}>
                <Grid container item sm={6}>
                  <img
                    src={play}
                    style={{
                      width: "200px",
                      height: "60px",
                      objectFit: "contain",
                      cursor: "pointer",
                    }}
                  />
                </Grid>
                <Grid container item sm={6}>
                  <img
                    src={store}
                    style={{
                      width: "200px",
                      height: "60px",
                      objectFit: "contain",
                      cursor: "pointer",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              container
              justifyContent="center"
              p="2"
              gap={3}
              className={classes.footerBottom}
            >
              <Grid item container gap={2} flexWrap="nowrap">
                <Avatar>In</Avatar>
                <Avatar>W</Avatar>
                <Avatar>In</Avatar>
                <Avatar>F{/* <FacebookOutlinedIcon /> */}</Avatar>
                <Avatar>F</Avatar>
              </Grid>
              <Grid item>
                <Typography variant="h5" textAlign="center" color="primary">
                  &copy; 2021 Doci Health Care Inc.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
