import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { NoData, EmptyTable } from "components/layouts";
import { Grid, Typography, Avatar, Chip, Checkbox, TableRow, TableCell } from "@mui/material";
import { timeMoment, dateMoment } from "components/Utilities/Time";
import { Loader } from "components/Utilities";
import { useLazyQuery } from "@apollo/client";
import { getPayoutData } from "components/graphQL/useQuery";
import { EnhancedTable } from "components/layouts";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { payoutHeader } from "components/Utilities/tableHeaders";
import displayPhoto from "assets/images/avatar.svg";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import PreviousButton from "components/Utilities/PreviousButton";
import Filter from "components/Forms/Filters";
import { defaultPageInfo, payoutFilterBy, payoutPageDefaultFilterValues } from "helpers/mockData";
import {
  changeTableLimit,
  fetchMoreData,
  onFilterValueChange,
} from "helpers/filterHelperFunctions";

const useStyles = makeStyles((theme) => ({
  searchGrid: {
    "&.css-13i4rnv-MuiGrid-root": {
      flex: 1,
      marginRight: "5rem",
    },
  },
  iconWrapper: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    display: "grid",
    placeContent: "center",
    marginLeft: "1rem",
    background: theme.palette.common.lightGreen,
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
      maxWidth: "10rem",

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

  tableCell: {
    "&.css-1jilxo7-MuiTableCell-root": {
      fontSize: "1.25rem",
    },
  },

  badge: {
    "&.MuiChip-root": {
      fontSize: "1.6rem !important",
      height: "3rem",
      borderRadius: "1.3rem",
    },
  },
}));

const Payout = ({ selectedMenu, selectedSubMenu, setSelectedMenu, setSelectedSubMenu }) => {
  const classes = useStyles();
  const theme = useTheme();

  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  const [pageInfo, setPageInfo] = useState(defaultPageInfo);

  useEffect(() => {
    setSelectedMenu(8);
    setSelectedSubMenu(9);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);
  const [fetchPayout, { loading, error, data, refetch, variables }] = useLazyQuery(getPayoutData);

  React.useEffect(() => {
    fetchPayout({
      variables: {
        first: pageInfo?.limit,
      },
    });
  }, [fetchPayout, pageInfo]);

  const [payout, setPayout] = useState([]);

  useEffect(() => {
    if (data) {
      setPageInfo(data.getEarningStats.payoutData.PageInfo);
      setPayout(data.getEarningStats.payoutData.data);
    }
  }, [data]);

  const [filterValues, setFilterValues] = React.useState(payoutPageDefaultFilterValues);

  if (error) return <NoData error={error} />;

  return (
    <Grid container direction="column" rowSpacing={2}>
      <Grid item>
        <PreviousButton path="/finance" onClick={() => setSelectedSubMenu(0)} />
      </Grid>

      <>
        <Grid item container justifyContent="space-between" style={{ paddingBottom: "3rem" }}>
          <Grid item container spacing={3}>
            <Grid item container alignItems="center">
              <Typography noWrap variant="h1" component="div" color="#2D2F39">
                Payout table
              </Typography>
              <Grid item className={classes.iconWrapper} marginLeft="1rem">
                <TrendingUpIcon color="success" className={classes.cardIcon} />
              </Grid>
            </Grid>
            <Grid item>
              <Typography noWrap component="div" color="#2D2F39">
                Filter by
              </Typography>
              <Filter
                onHandleChange={(e) =>
                  onFilterValueChange(
                    e,
                    "status",
                    filterValues,
                    setFilterValues,
                    fetchPayout,
                    variables,
                    refetch,
                  )
                }
                options={payoutFilterBy}
                name="status"
                placeholder="By status"
                value={filterValues.status}
              />
            </Grid>
          </Grid>
        </Grid>
        {loading ? (
          <Loader />
        ) : payout.length > 0 ? (
          <Grid item container>
            <EnhancedTable
              headCells={payoutHeader}
              rows={payout}
              paginationLabel="payout per page"
              handleChangePage={fetchMoreData}
              hasCheckbox={true}
              changeLimit={changeTableLimit}
              fetchData={fetchPayout}
              dataPageInfo={pageInfo}
            >
              {payout
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const { amount, createdAt, doctorData, status, _id } = row;
                  const { firstName, picture, lastName, specialization } = doctorData[0];
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
                        style={{ color: theme.palette.common.black }}
                      >
                        {dateMoment(createdAt)}
                      </TableCell>
                      <TableCell
                        id={labelId}
                        scope="row"
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.black }}
                      >
                        {timeMoment(createdAt)}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        <div
                          style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span style={{ marginRight: "1rem" }}>
                            <Avatar
                              alt="Remy Sharp"
                              src={picture ? picture : displayPhoto}
                              sx={{ width: 24, height: 24 }}
                            />
                          </span>
                          <span style={{ fontSize: "1.25rem" }}>
                            {firstName} {lastName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {specialization}
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.red }}
                      >
                        {amount}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        <Chip
                          label={status}
                          className={classes.badge}
                          style={{
                            background:
                              status === "active"
                                ? theme.palette.common.lightGreen
                                : theme.palette.common.lightRed,
                            color:
                              status === "active"
                                ? theme.palette.common.green
                                : theme.palette.common.red,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </EnhancedTable>
          </Grid>
        ) : (
          <EmptyTable headCells={payoutHeader} paginationLabel="Payout  per page" />
        )}
      </>
    </Grid>
  );
};

Payout.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default Payout;
