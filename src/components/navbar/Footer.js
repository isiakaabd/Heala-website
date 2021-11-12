import React from "react";
import { makeStyles } from "@mui/styles";
// import { ReactComponent as Vector } from "assets/images/vector.png";
import logo from "assets/images/logo.png";
import play from "assets/images/play.jpg";
// import vector from "assets/images/vector.png";
import store from "assets/images/store.jpg";
import Typography from "@mui/material/Typography";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
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
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" color="primary" sx={{ bottom: 0 }}>
      <Container maxWidth="false" disableGutters>
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
              <Grid item width="80%">
                <img src={logo} style={{ width: 150, objectFit: "contain" }} />
                <Typography variant="h5" color="primary">
                  Accessible Health care for all
                </Typography>
              </Grid>
              <Grid item width="80%">
                <Stack direction="row" spacing={2}>
                  <Avatar>In</Avatar>
                  <Avatar>In</Avatar>
                  <Avatar>In</Avatar>
                  <Avatar>
                    <FacebookOutlinedIcon />
                  </Avatar>
                  <Avatar>F</Avatar>
                </Stack>
              </Grid>
              <Grid item>
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
            <Grid item container flexDirection="column" md={3} xs={12} sm={12}>
              <Grid item container columnSpacing={3}>
                <Grid item padding="2rem">
                  <Typography variant="body1" color="primary">
                    Download App
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container gap={4} flexDirection="column">
                <Grid item>
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
                <Grid item>
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
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
