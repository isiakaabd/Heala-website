import React, { useState } from "react";
import { Avatar, CardMedia, CircularProgress, Grid, Typography } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { rows } from "components/Utilities/DataHeader";
import { subscriptionHeader } from "components/Utilities/tableHeaders";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import CustomButton from "components/Utilities/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Modals from "components/Utilities/Modal";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const useStyles = makeStyles((theme) => ({
  searchGrid: {
    "&.css-13i4rnv-MuiGrid-root": {
      flex: 1,
      marginRight: "5rem",
    },
  },
  button: {
    "&.css-1zf5oc-MuiButtonBase-root-MuiButton-root": {
      background: "#fff",
      color: theme.palette.common.grey,
      textTransform: "none",
      borderRadius: "2rem",
      display: "flex",
      alignItems: "center",
      padding: "1rem",
      maxWidth: "15rem",

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },

      "& .css-9tj150-MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "1.2rem",
      },

      "& .css-9tj150-MuiButton-endIcon": {
        marginLeft: ".3rem",
        marginTop: "-.2rem",
      },
    },
  },
  redBtn: {
    "&.css-1zf5oc-MuiButtonBase-root-MuiButton-root": {
      background: theme.palette.common.lightRed,
      color: theme.palette.common.red,

      "&:hover": {
        background: theme.palette.error.light,
        color: "#fff",
      },
    },
  },
  greenBtn: {
    "&.css-1zf5oc-MuiButtonBase-root-MuiButton-root": {
      background: theme.palette.common.lightGreen,
      color: theme.palette.common.green,

      "&:hover": {
        background: theme.palette.success.light,
        color: "#fff",
      },
    },
  },
  tableCell: {
    "&.css-1jilxo7-MuiTableCell-root": {
      fontSize: "1.25rem",
    },
  },

  badge: {
    "&.css-1eelh6y-MuiChip-root": {
      fontSize: "1.6rem !important",
      height: "3rem",
      borderRadius: "1.3rem",
    },
    modal: {
      background: "red !important",
      "& > * ": {
        padding: "2rem 1rem",
      },
    },
    ".css-11lq3yg-MuiGrid-root": {
      background: "red",
    },
  },
}));

const options = [
  { id: 0, value: "Name" },
  { id: 1, value: "Plan" },
  { id: 2, value: "Consultation" },
];

const Subscription = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsOpen(true);
  };
  const handleDialogClose = () => {
    setIsOpen(false);
  };

  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  const [searchMail, setSearchMail] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const buttonType = {
    main: theme.palette.error.main,
    light: theme.palette.error.light,
    dark: theme.palette.error.dark,
  };

  return (
    <>
      <Grid container direction="column">
        <Grid item container style={{ paddingBottom: "5rem" }}>
          <Grid item className={classes.searchGrid}>
            <Search
              value={searchMail}
              onChange={(e) => setSearchMail(e.target.value)}
              placeholder="Type to search plans..."
              height="5rem"
            />
          </Grid>

          <Grid item>
            <CustomButton
              endIcon={<AddIcon />}
              title="Create new plan"
              type={buttonType}
              onClick={handleDialogOpen}
            />
          </Grid>
        </Grid>
        {/* The Search and Filter ends here */}
        <Grid item container>
          <EnhancedTable
            headCells={subscriptionHeader}
            rows={rows}
            page={page}
            paginationLabel="subscription per page"
            hasCheckbox={true}
          >
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              const isItemSelected = isSelected(row.id, selectedRows);

              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      onClick={() => handleSelectedRows(row.id, selectedRows, setSelectedRows)}
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell
                    id={labelId}
                    scope="row"
                    align="center"
                    className={classes.tableCell}
                    style={{ color: theme.palette.common.black }}
                  >
                    {row.planName}
                  </TableCell>
                  <TableCell
                    id={labelId}
                    scope="row"
                    align="left"
                    className={classes.tableCell}
                    style={{ color: theme.palette.common.red }}
                  >
                    {row.amount}
                  </TableCell>

                  <TableCell
                    align="center"
                    className={classes.tableCell}
                    style={{ color: theme.palette.common.black }}
                  >
                    {row.description}
                  </TableCell>

                  <TableCell align="left" className={classes.tableCell}>
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <Button
                        variant="contained"
                        disableRipple
                        className={`${classes.button} ${classes.greenBtn}`}
                        endIcon={<EditIcon style={{ color: theme.palette.common.green }} />}
                      >
                        Edit plan
                      </Button>
                      <Button
                        variant="contained"
                        disableRipple
                        className={`${classes.button} ${classes.redBtn}`}
                        to="/view"
                        endIcon={<DeleteForeverIcon style={{ color: theme.palette.common.red }} />}
                      >
                        Delete plan
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </EnhancedTable>
        </Grid>
      </Grid>
      {/* // modal */}
      <Modals isOpen={isOpen} handleClose={handleDialogClose}>
        <Grid container className={classes.modal}>
          <Grid item>
            <Typography variant="h3">Create new plan</Typography>
          </Grid>
          <Grid item container spacing={2} xs={{ flexDirection: "row", alignItems: "center" }}>
            <Grid item sx={5} style={{ margin: "2rem 0" }}>
              <FormControl style={{ maxWidth: "100%" }}>
                <InputLabel htmlFor="outlined-adornment-amount">name of Plan</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  placeholder="Enter Plan Name"
                  // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  label="Amount"
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} style={{ margin: "2rem 0" }}>
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-amount">Category</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  placeholder="Enter Amount"
                  startAdornment={
                    <InputAdornment
                      sx={{
                        color: "red",
                        //theme.palette.common.red,
                        background: theme.palette.common.lightRed,
                      }}
                      position="start"
                    >
                      ₦
                    </InputAdornment>
                  }
                  label="Amount"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="Plan Description"
              multiline
              placeholder="Type Plan description"
              rows={4}
              style={{ width: "100%", height: "4%" }}
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: "2rem " }}>
            <Button
              variant="contained"
              // className={classes.button}
              to="/view"
              type="submit"
              color="error"
              style={{ width: "100%" }}
            >
              Save Plan
            </Button>
          </Grid>
        </Grid>
      </Modals>
    </>
  );
};

export default Subscription;
