import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography, Chip, Avatar, Grid } from "@mui/material";
import CustomButton from "./CustomButton";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { HiChat } from "react-icons/hi";
// import CallIcon from "@mui/icons-material/Call";
// import VideocamIcon from "@mui/icons-material/Videocam";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  gridsWrapper: {
    background: "#fff",
    borderRadius: "1rem",
    padding: "2rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.2)",
  },

  badge: {
    "&.MuiChip-root": {
      fontSize: "1.3rem !important",
      borderRadius: "1.5rem",
    },
  },
}));

const DisplayProfile = ({
  fullName,
  displayPhoto,
  medicalTitle,
  statusId,
  specialization,
  status,
  chatPath,
  callPath,
  videoPath,
  setChatMediaActive,
  setSelectedSubMenu,
  selectedMenu,
  setSelectedPatientMenu,
  setSelectedScopedMenu,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { patientId } = useParams();

  const greenButton = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.success.dark,
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      className={classes.gridsWrapper}
    >
      <Grid item>
        <Grid container alignItems="center">
          <Grid item style={{ marginRight: "2rem" }}>
            <Avatar alt={`Display Photo`} src={displayPhoto} sx={{ width: 50, height: 50 }} />
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item style={{ marginBottom: "1rem" }}>
                <Typography variant="h3">{fullName}</Typography>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item style={{ marginRight: "3rem" }}>
                    <Typography variant="h4" color="error" style={{ fontWeight: 400 }}>
                      <span style={{ color: theme.palette.common.lightGrey }}>{medicalTitle}:</span>{" "}
                      {statusId}
                    </Typography>
                  </Grid>
                  {specialization ? (
                    <Grid item>
                      <Typography variant="h4" style={{ fontWeight: 400 }}>
                        <span style={{ color: theme.palette.common.lightGrey }}>
                          Specialization:
                        </span>{" "}
                        <Chip label={specialization} color="success" className={classes.badge} />
                      </Typography>
                    </Grid>
                  ) : status ? (
                    <Grid item>
                      {" "}
                      <Typography variant="h4">
                        <span style={{ color: theme.palette.common.lightGrey }}>Status:</span>{" "}
                        <Chip
                          label={status}
                          color={status === "Active" ? "success" : "error"}
                          className={classes.badge}
                          style={{
                            background:
                              status === "Active"
                                ? theme.palette.common.lightGreen
                                : theme.palette.common.lightRed,
                            color:
                              status === "Active"
                                ? theme.palette.common.green
                                : theme.palette.common.red,
                          }}
                        />
                      </Typography>
                    </Grid>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* Action Buttons grid */}
      <Grid item>
        <Grid container alignItems="center">
          <Grid item style={{ marginRight: "2rem" }}>
            <CustomButton
              endIcon={<HiChat />}
              title="Chat"
              type={greenButton}
              component={Link}
              to={`/patients/${patientId}/profile/chat`}
              // onClick={() => setChatMediaActive(true)}
              onClick={() => setSelectedSubMenu(6)}
            />
          </Grid>
          {/* <Grid item style={{ marginRight: "2rem" }}>
            <CustomButton
              endIcon={<CallIcon />}
              title="Call"
              type={greenButton}
              onClick={() => setChatMediaActive(true)}
              component={Link}
              to={callPath}
            />
          </Grid> */}
          {/* <Grid item>
            <CustomButton
              endIcon={<VideocamIcon />}
              title="Video"
              type={greenButton}
              onClick={() => setChatMediaActive(true)}
              component={Link}
              to={videoPath}
            />
          </Grid> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

DisplayProfile.propTypes = {
  fullName: PropTypes.string,
  displayPhoto: PropTypes.string,
  medicalTitle: PropTypes.string,
  statusId: PropTypes.string,
  specialization: PropTypes.string,
  status: PropTypes.string,
  chatPath: PropTypes.string,
  callPath: PropTypes.string,
  videoPath: PropTypes.string,
  setChatMediaActive: PropTypes.func,
  setSelectedSubMenu: PropTypes.func,
  selectedMenu: PropTypes.func,
  setSelectedPatientMenu: PropTypes.func,
  setSelectedScopedMenu: PropTypes.func,
};

export default DisplayProfile;
