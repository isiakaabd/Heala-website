import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { NoData, EmptyTable } from "components/layouts";
import { Button, Avatar, Chip, Checkbox, TableCell, TableRow, Grid } from "@mui/material";
import Filter from "components/Forms/Filters";
import { useTheme } from "@mui/material/styles";
import { isSelected } from "helpers/isSelected";
import displayPhoto from "assets/images/avatar.svg";
import { Loader, Search } from "components/Utilities";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { getPatients } from "components/graphQL/useQuery";
import EnhancedTable from "components/layouts/EnhancedTable";
import { ClearFiltersBtn } from "components/Buttons/ClearFiltersBtn";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { patientsHeadCells } from "components/Utilities/tableHeaders";
import {
  genderType,
  patientsPageDefaultFilterValues,
  /* planFilterBy,
  providerFilterBy,
  statusFilterBy, */
} from "../../helpers/mockData";
import {
  changeTableLimit,
  fetchMoreData,
  onFilterValueChange,
  resetFilters,
} from "helpers/filterHelperFunctions";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  searchFilterContainer: {
    "&.MuiGrid-root": {
      justifyContent: "space-between",
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
      padding: "1rem",
      maxWidth: "10rem",
      whiteSpace: "nowrap",

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },

      "& .MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "1.2rem",
      },

      "& .MuiButton-endIcon": {
        marginLeft: ".3rem",
        marginTop: "-.2rem",
      },
    },
  },

  tableCell: {
    "&.MuiTableCell-root": {
      fontSize: "1.25rem",
      textAlign: "left",
    },
  },

  badge: {
    "&.MuiChip-root": {
      fontSize: "1.25rem !important",
      height: "2.7rem",

      borderRadius: "1.3rem",
    },
  },
  searchFilterBtn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: theme.palette.common.black,
      width: "100%",
    },
  },

  filterText: {
    "&.MuiTypography-root": {
      height: "100%",
      display: "flex",
      alignItems: "center",
    },
  },
}));

const Patients = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [profiles, setProfiles] = useState([]);

  const [filterValues, setFilterValues] = useState(patientsPageDefaultFilterValues);
  const [fetchPatient, { loading, error, data, refetch, variables }] = useLazyQuery(getPatients);

  const [pageInfo, setPageInfo] = useState({
    page: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
    totalDocs: 0,
  });

  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  //eslint-disable-next-line
  const debouncer = useCallback(debounce(fetchPatient, 3000), []);

  useEffect(() => {
    fetchPatient({
      variables: {
        first: pageInfo.limit,
      },
    });
  }, [fetchPatient, pageInfo]);

  useEffect(() => {
    if (data) {
      setPageInfo(data.profiles.pageInfo);
      setProfiles(data.profiles.data);
    }
  }, [data]);

  if (error) return <NoData error={error} />;

  return (
    <Grid item flex={1} container direction="column" rowGap={2}>
      <Grid item container spacing={2} className={classes.searchFilterContainer}>
        {/*  ======= SEARCH INPUT(S) ==========*/}
        <Grid item flex={1} width="100%">
          <Search
            onChange={(e) => {
              let value = e.target.value;

              if (value !== "") {
                return debouncer({
                  variables: { dociId: `HEALA-${value.toUpperCase()}` },
                });
              }
            }}
            // onChange={debouncedChangeHandler}
            placeholder="Search by ID e.g 7NE6ELLO "
            height="5rem"
          />
        </Grid>
        {/* ========= FILTERS =========== */}
        <Grid item container flexWrap="wrap" spacing={2}>
          {/* FILTER BY GENDER */}
          <Grid item>
            <Filter
              onHandleChange={(e) =>
                onFilterValueChange(
                  e,
                  "gender",
                  filterValues,
                  setFilterValues,
                  fetchPatient,
                  variables,
                  refetch,
                )
              }
              options={genderType}
              name="gender"
              placeholder="By gender"
              value={filterValues.gender}
            />
          </Grid>

          {/* ==== CLEAR FILTERS BUTTON ===== */}
          <Grid item>
            <ClearFiltersBtn
              title="Clear filters"
              onHandleClick={() => {
                resetFilters(
                  setFilterValues,
                  patientsPageDefaultFilterValues,
                  variables,
                  fetchPatient,
                );
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      {loading ? (
        <Loader />
      ) : profiles.length > 0 ? (
        /* ================= PATIENTS TABLE ================= */
        <Grid
          container
          item
          direction="column"
          overflow="hidden"
          maxWidth={{ md: "100%", sm: "100%", xs: "100%" }}
        >
          <EnhancedTable
            headCells={patientsHeadCells}
            rows={profiles}
            paginationLabel="Patients per page"
            handleChangePage={fetchMoreData}
            hasCheckbox={true}
            changeLimit={changeTableLimit}
            fetchData={fetchPatient}
            dataPageInfo={pageInfo}
          >
            {profiles.map((row, index) => {
              const {
                dociId,
                firstName,
                lastName,
                plan,
                provider,
                image,
                consultations,
                _id,
                status,
              } = row;
              const isItemSelected = isSelected(_id, selectedRows);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={_id}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      onClick={() => handleSelectedRows(_id, selectedRows, setSelectedRows)}
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
                    align="left"
                    className={classes.tableCell}
                    style={{
                      color: theme.palette.common.grey,
                      textAlign: "left",
                    }}
                  >
                    {dociId && dociId.split("-")[1]}
                  </TableCell>
                  <TableCell align="left" className={classes.tableCell}>
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "left",
                      }}
                    >
                      <span style={{ marginRight: "1rem" }}>
                        <Avatar
                          alt={`Display Photo of ${firstName}`}
                          src={image ? image : displayPhoto}
                          sx={{ width: 24, height: 24 }}
                        />
                      </span>
                      <span style={{ fontSize: "1.25rem" }}>{`${firstName} ${lastName}`}</span>
                    </div>
                  </TableCell>
                  <TableCell align="left" className={classes.tableCell}>
                    {plan ? plan : "No Plan"}
                  </TableCell>
                  <TableCell align="left" className={classes.tableCell}>
                    {provider ? provider : "No Provider"}
                  </TableCell>
                  <TableCell align="left" className={classes.tableCell}>
                    {consultations ? consultations : 0}
                  </TableCell>
                  <TableCell align="left" className={classes.tableCell}>
                    <Chip
                      label={status ? status : "No Status"}
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
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      className={classes.button}
                      component={Link}
                      to={`patients/${_id}`}
                      endIcon={<ArrowForwardIosIcon />}
                    >
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </EnhancedTable>
        </Grid>
      ) : (
        <EmptyTable headCells={patientsHeadCells} paginationLabel="Patients per page" />
      )}
    </Grid>
  );
};

export default Patients;
