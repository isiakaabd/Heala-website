import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import { makeStyles } from "@mui/styles";
import Modals from "components/Utilities/Modal";
import FormSelect from "components/Utilities/FormSelect";
import FormInput from "components/Utilities/FormInput";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import CustomButton from "components/Utilities/CustomButton";
import useFormInput from "components/hooks/useFormInput";
import DeletePartner from "components/modals/DeleteOrDisable";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import EnhancedTable from "components/layouts/EnhancedTable";
import { partnersHeadCells } from "components/Utilities/tableHeaders";
import { partnersRows } from "components/Utilities/tableData";
import Avatar from "@mui/material/Avatar";
import displayPhoto from "assets/images/avatar.png";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

const useStyles = makeStyles((theme) => ({
  searchGrid: {
    "&.MuiGrid-root": {
      flex: 1,
      marginRight: "5rem",
    },
  },
  actionBtnGrid: {
    "&.MuiGrid-root": {
      marginRight: "1.5rem",
    },
  },
  button: {
    "&.MuiButton-root": {
      background: "#fff",
      color: theme.palette.common.grey,
      textTransform: "none",
      borderRadius: "2rem",
      display: "flex",
      alignItems: "center",
      padding: "0.5rem",
      maxWidth: "7rem",
      fontSize: ".85rem",

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },

      "& .MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "0.85rem",
      },

      "& .MuiButton-endIcon": {
        marginLeft: ".2rem",
        marginTop: "-.2rem",
      },
    },
  },
  badge: {
    "&.MuiChip-root": {
      fontSize: "1.25rem !important",
      height: "2.7rem",
      borderRadius: "1.3rem",
    },
  },
  tableBtn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      height: "3rem",
      fontSize: "1.25rem",
      borderRadius: "2rem",
      boxShadow: "none",

      "&:hover": {
        "& .MuiButton-endIcon>*:nth-of-type(1)": {
          color: "#fff",
        },
      },

      "&:active": {
        boxShadow: "none",
      },

      "& .MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "1.5rem",
      },
    },
  },

  redBtn: {
    "&.MuiButton-root": {
      background: theme.palette.common.lightRed,
      color: theme.palette.common.red,

      "&:hover": {
        background: theme.palette.error.light,
        color: "#fff",
      },
    },
  },
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },
  searchFilterBtn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: theme.palette.common.black,
      width: "100%",
    },
  },
  uploadBtn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: "#f2f2f2",
      boxShadow: "none",
      color: theme.palette.common.black,

      "&:hover": {
        background: "#f2f3f3",
        boxShadow: "none",
      },

      "&:active": {
        boxShadow: "none",
      },
    },
  },
}));

const names = ["General Hospital, Lekki", "H-Medix", "X Lab"];
const dates = ["Hello", "World", "Goodbye", "World"];
const categories = ["Hospital", "Pharmacy", "Diagnostic Center"];

const Partners = () => {
  const classes = useStyles();
  const theme = useTheme();

  const darkButtonType = {
    background: theme.palette.primary.main,
    hover: theme.palette.primary.light,
    active: theme.palette.primary.dark,
  };

  const [searchPartner, setSearchPartner] = useState("");
  const [openFilterPartner, setOpenFilterPartner] = useState(false);
  const [openAddPartner, setOpenAddPartner] = useState(false);
  const [openDeletePartner, setOpenDeletePartner] = useState(false);

  // FILTER PARTNERS SELECT STATES
  const [filterSelectInput, handleSelectedInput] = useFormInput({
    hospitalName: "",
    date: "",
    categoryName: "",
  });

  // ADD PARTNERS INPUT STATES
  const [addPartnersFormInput, handleFormInput] = useFormInput({
    firstName: "",
    lastName: "",
    email: "",
    category: "",
  });

  const { firstName, lastName, email, category } = addPartnersFormInput;
  const { hospitalName, date, categoryName } = filterSelectInput;

  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  return (
    <Grid container direction="column">
      <Grid item container>
        <Grid item className={classes.searchGrid}>
          <Search
            value={searchPartner}
            onChange={(e) => setSearchPartner(e.target.value)}
            placeholder="Type to search Patients..."
            height="5rem"
          />
        </Grid>
        <Grid item className={classes.actionBtnGrid}>
          <FilterList title="Filter Patners" onClick={() => setOpenFilterPartner(true)} />
        </Grid>
        <Grid item>
          <CustomButton
            endIcon={<PersonAddAlt1Icon />}
            title="Add New Partner"
            type={darkButtonType}
            onClick={() => setOpenAddPartner(true)}
          />
        </Grid>
      </Grid>
      <Grid item container style={{ marginTop: "5rem" }}>
        <EnhancedTable
          headCells={partnersHeadCells}
          rows={partnersRows}
          page={page}
          paginationLabel="Patients per page"
          hasCheckbox={true}
        >
          {partnersRows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
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
                    align="center"
                    className={classes.tableCell}
                    style={{ maxWidth: "20rem" }}
                  >
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "7rem",
                      }}
                    >
                      <span style={{ marginRight: "1rem" }}>
                        <Avatar
                          alt={`Display Photo of ${row.name}`}
                          src={displayPhoto}
                          sx={{ width: 24, height: 24 }}
                        />
                      </span>
                      <span style={{ fontSize: "1.25rem" }}>{row.name}</span>
                    </div>
                  </TableCell>
                  <TableCell
                    align="left"
                    className={classes.tableCell}
                    style={{ color: theme.palette.common.grey, maxWidth: "20rem" }}
                  >
                    {row.category}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    <Button
                      variant="contained"
                      disableRipple
                      className={`${classes.tableBtn} ${classes.redBtn}`}
                      endIcon={<DeleteIcon color="error" />}
                      onClick={() => setOpenDeletePartner(true)}
                    >
                      Delete partner
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </EnhancedTable>
      </Grid>
      <Modals
        isOpen={openFilterPartner}
        title="Filter"
        rowSpacing={5}
        handleClose={() => setOpenFilterPartner(false)}
      >
        <Grid item container direction="column">
          <Grid item>
            <Grid container spacing={2}>
              <Grid item md>
                <FormLabel component="legend" className={classes.FormLabel}>
                  Name
                </FormLabel>
                <FormControl fullWidth>
                  <FormSelect
                    name="hospitalName"
                    options={names}
                    value={hospitalName}
                    onChange={handleSelectedInput}
                    placeholderText="Select name"
                  />
                </FormControl>
              </Grid>
              <Grid item md>
                <FormLabel component="legend" className={classes.FormLabel}>
                  Date
                </FormLabel>
                <FormControl fullWidth>
                  <FormSelect
                    name="date"
                    options={dates}
                    value={date}
                    onChange={handleSelectedInput}
                    placeholderText="Choose Date"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container spacing={2} style={{ marginBottom: "10rem" }}>
          <Grid item md>
            <FormLabel component="legend" className={classes.FormLabel}>
              Category
            </FormLabel>
            <FormControl fullWidth>
              <FormSelect
                name="categoryName"
                options={categories}
                value={categoryName}
                onChange={handleSelectedInput}
                placeholderText="Select category"
              />
            </FormControl>
          </Grid>
          {/* Placeholder grid */}
          <Grid item md></Grid>
        </Grid>
        <Grid item container xs={12}>
          <Button
            variant="contained"
            onClick={() => setOpenFilterPartner(false)}
            type="submit"
            className={classes.searchFilterBtn}
            disableRipple
          >
            Apply Filter
          </Button>
        </Grid>
      </Modals>

      {/* ADD NEW PARTER MODAL */}
      <Modals
        isOpen={openAddPartner}
        title="Add PATNERS"
        rowSpacing={5}
        handleClose={() => setOpenAddPartner(false)}
      >
        <Grid item container direction="column">
          <Grid item>
            <Grid container spacing={2}>
              <Grid item md>
                <FormInput
                  label="First Name"
                  labelId="firstName"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={handleFormInput}
                  placeholder="Enter first name"
                />
              </Grid>
              <Grid item md>
                <FormInput
                  label="Last Name"
                  labelId="lastName"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={handleFormInput}
                  placeholder="Enter last name"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ margin: "3rem 0 0" }}>
            <Grid container spacing={2}>
              <Grid item md>
                <FormInput
                  type="email"
                  label="Email"
                  labelId="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleFormInput}
                  placeholder="Enter email"
                />
              </Grid>
              <Grid item md>
                <Grid container direction="column">
                  <Grid item>
                    <FormLabel component="legend" className={classes.FormLabel}>
                      Category
                    </FormLabel>
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth>
                      <FormSelect
                        name="category"
                        options={categories}
                        value={category}
                        onChange={handleFormInput}
                        placeholderText="Select category"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container direction="column">
          <Grid item style={{ paddingBottom: ".5rem" }}>
            <Typography variant="body1" gutterBottom>
              Upload your logo
            </Typography>
          </Grid>
          <Grid item>
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                style={{ display: "none" }}
              />
              <Button variant="contained" component="span" className={classes.uploadBtn}>
                Upload Photo
              </Button>
            </label>
          </Grid>
        </Grid>

        <Grid item container>
          <Button
            variant="contained"
            onClick={() => setOpenAddPartner(false)}
            type="submit"
            className={classes.searchFilterBtn}
            disableRipple
          >
            Add Partner
          </Button>
        </Grid>
      </Modals>
      <DeletePartner
        open={openDeletePartner}
        setOpen={setOpenDeletePartner}
        title="Delete Partner"
        btnValue="delete"
        confirmationMsg="delete partner"
      />
    </Grid>
  );
};

export default Partners;
