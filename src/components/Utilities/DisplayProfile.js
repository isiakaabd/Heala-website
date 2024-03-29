import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography, Chip, Avatar, Grid } from "@mui/material";
import CustomButton from "./CustomButton";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { HiChat } from "react-icons/hi";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  gridsWrapper: {
    background: "#fff",
    borderRadius: "1rem",
    padding: "2rem",
    //boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.2)",
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
  type,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { patientId, hcpId } = useParams();

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
      flexWrap="wrap"
      direction="row"
      className={classes.gridsWrapper}
      rowGap={2}
    >
      <Grid item>
        <Grid container gap={2} alignItems="center">
          <Avatar
            alt={"Display Photo"}
            src={displayPhoto}
            sx={{ width: 50, height: 50 }}
          />
          <Typography variant="h3">{fullName}</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container alignItems="center" justifyContent="space-between">
          {specialization ? (
            <Grid item>
              <Typography variant="h4" style={{ fontWeight: 400 }}>
                <span style={{ color: theme.palette.common.lightGrey }}>
                  Specialization:
                </span>{" "}
                <Chip
                  label={specialization}
                  color="success"
                  className={classes.badge}
                />
              </Typography>
            </Grid>
          ) : status ? (
            <Grid item>
              <Typography variant="h4">
                <span style={{ color: theme.palette.common.lightGrey }}>
                  Status:
                </span>{" "}
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
      <Grid item>
        <Typography variant="h4" color="error" style={{ fontWeight: 400 }}>
          <span style={{ color: theme.palette.common.lightGrey }}>
            {medicalTitle}:
          </span>{" "}
          {statusId}
        </Typography>
      </Grid>
      {type !== "" ? (
        <Grid item>
          <CustomButton
            endIcon={<HiChat />}
            title="Message"
            type={greenButton}
            component={Link}
            to={
              type !== "doctor"
                ? `/patients/${patientId}/profile/chat`
                : `/hcps/${hcpId}/profile/chat`
            }
          />
        </Grid>
      ) : null}
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
  type: PropTypes.string,
};

export default DisplayProfile;
