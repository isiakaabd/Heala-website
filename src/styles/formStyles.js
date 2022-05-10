import { makeStyles } from "@mui/styles";

export const pageOneUseStyles = makeStyles((theme) => ({
  form: theme.mixins.toolbar,
  btn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      width: "100%",
      fontSize: "1.5rem",
    },
  },
  header: {
    "&.MuiGrid-root": {
      fontSize: "2rem",
      lineHeight: "2.6rem",
      color: "#010101",
      fontWeight: "600",
    },
  },
}));

export const pageTwoUseStyles = makeStyles((theme) => ({
  form: theme.mixins.toolbar,
  btn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      width: "100%",
      fontSize: "1.5rem",
      color: "#ffffff",
    },
    "&.MuiButtonBase-root": {
      color: "#40424b !important",
    },
  },
}));

export const useStyles = makeStyles((theme) => ({
  cardContainer: {
    "&.MuiCard-root": {
      width: "100%",
      height: "15.8rem",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      background: "white",
      marginRight: "5rem",
      "&:hover": {
        boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
        cursor: "pointer",
      },
      "&:active": {
        background: "#fafafa",
      },
      "& .MuiCardContent-root .MuiTypography-h5": {
        textDecoration: "none !important",
        textTransform: "uppercase",
      },
    },
  },
  form: theme.mixins.toolbar,

  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardGrid: {
    justifyContent: "center",
    alignItems: "center",
    height: "25.8rem",
  },
  flexContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    margin: "auto",
    width: "100%",

    padding: "2rem 4rem",
    "&:first-child": {
      borderBottom: ".5px solid #F8F8F8",
    },
  },
  lightGreen: {
    color: theme.palette.common.green,
  },

  lightRed: {
    color: theme.palette.common.red,
  },
  mainContainer: {
    flexDirection: "column",
    width: "100%",
    background: "white",
    borderRadius: "2rem",
    boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
  },
  infoBadge: {
    "&.MuiGrid-item": {
      padding: ".2rem 2rem",
      borderRadius: "1.5rem",
      display: "flex",
      alignItems: "center",
      color: theme.palette.common.red,
      background: theme.palette.common.lightRed,
      border: `2px dashed ${theme.palette.common.red}`,
    },
  },
  btn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      width: "100%",
      fontSize: "1.5rem",
    },
  },
  parentGrid: {
    position: "relative",
    textDecoration: "none",
    color: theme.palette.primary.main,
    "&.MuiGrid-item": {
      ...theme.typography.cardParentGrid,
    },
  },
  cardIcon: {
    "&.MuiSvgIcon-root": {
      fontSize: "3rem",
    },
  },
  active: {
    "&> *": {
      background: "#ECF6F3 !important",
    },
  },
}));
