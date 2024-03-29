import React, { useEffect, useState } from "react";
import { NoData, EmptyTable, EnhancedTable } from "components/layouts";
import { Grid, Chip, TableRow, TableCell } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useAlert from "hooks/useAlert";
import { useSelector } from "react-redux";
import Filter from "components/Forms/Filters";
import { Loader } from "components/Utilities";
import { useLazyQuery } from "@apollo/client";
import { isSelected } from "helpers/isSelected";
import { useTheme } from "@mui/material/styles";
import TableLayout from "components/layouts/TableLayout";
import { getPayoutData } from "components/graphQL/useQuery";
import { payoutHeader } from "components/Utilities/tableHeaders";
import { defaultPageInfo, payoutFilterBy } from "helpers/mockData";
import { timeMoment, dateMoment } from "components/Utilities/Time";
import {
  changeTableLimit,
  deleteVar,
  fetchMoreData,
  filterData,
  handlePageChange,
} from "helpers/filterHelperFunctions";

const useStyles = makeStyles((theme) => ({
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
    "&.MuiTableCell-root": {
      color: "rgb(0 0 0)",
      fontWeight: 400,
      fontSize: "1.25rem",
    },
  },

  badge: {
    "&.MuiChip-root": {
      fontSize: "1.3rem !important",
      height: "3rem",
      borderRadius: "1.3rem",
    },
  },
}));

const Payout = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { displayAlert } = useAlert();
  const { selectedRows } = useSelector((state) => state.tables);
  const [payout, setPayout] = useState([]);
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);

  const [statusFilterValue, setStatusFilterValue] = useState("");
  const [fetchPayout, { loading, error, refetch, variables }] =
    useLazyQuery(getPayoutData);

  useEffect(() => {
    try {
      fetchPayout({ variables: { first: pageInfo?.limit } }).then(
        ({ data }) => {
          if (!data) throw Error("Couldn't fetch doctors payout data");
          setPageInfo(data?.getEarningStats?.payoutData?.PageInfo);
          setPayout(data?.getEarningStats?.payoutData?.data);
        }
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFilterStatusChange = async (value) => {
    try {
      deleteVar(variables);
      setStatusFilterValue(value);
      const filterVariables = { status: value };

      filterData(filterVariables, {
        fetchData: fetchPayout,
        refetch: refetch,
        variables: variables,
      })
        .then((data) => {
          setPayout(data?.getEarningStats?.payoutData?.data || []);
          setPageInfo(data?.getEarningStats?.payoutData?.PageInfo || {});
        })
        .catch(() => {
          refresh(setStatusFilterValue, "");
        });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      refresh(setStatusFilterValue, "");
    }
  };

  const refresh = async (setFilterValue, defaultVal) => {
    displayAlert("error", "Something went wrong while filtering. Try again.");
    setFilterValue(defaultVal);

    deleteVar(variables);

    refetch()
      .then(({ data }) => {
        setPayout(data?.getEarningStats?.payoutData?.data || []);
        setPageInfo(data?.getEarningStats?.payoutData?.PageInfo || {});
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        displayAlert("error", "Failed to get patients data, Try again");
      });
  };

  const setTableData = async (response, errMsg) => {
    response
      .then(({ data }) => {
        setPageInfo(
          data?.getEarningStats?.payoutData?.PageInfo || defaultPageInfo
        );
        setPayout(data?.getEarningStats?.payoutData?.data || []);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        displayAlert("error", errMsg);
      });
  };

  if (error) return <NoData error={error} />;

  return (
    <Grid container direction="column" rowSpacing={2}>
      <>
        <Grid
          item
          container
          justifyContent="space-between"
          style={{ paddingBottom: "3rem" }}
        ></Grid>
        <TableLayout
          filters={
            <Filter
              onHandleChange={(e) => onFilterStatusChange(e?.target?.value)}
              onClickClearBtn={() => onFilterStatusChange("")}
              options={[{ key: "Status", value: "" }, ...payoutFilterBy]}
              name="status"
              placeholder="None"
              value={statusFilterValue}
              hasClearBtn={true}
            />
          }
        >
          {loading ? (
            <Loader />
          ) : payout.length > 0 ? (
            <Grid item container>
              <EnhancedTable
                headCells={payoutHeader}
                rows={payout}
                paginationLabel="payout per page"
                hasCheckbox={false}
                changeLimit={async (e) => {
                  const res = changeTableLimit(fetchPayout, { first: e });
                  await setTableData(res, "Failed to change table limit.");
                }}
                dataPageInfo={pageInfo}
                handlePagination={async (page) => {
                  const res = handlePageChange(fetchPayout, page, pageInfo, {});
                  await setTableData(res, "Failed to change table page.");
                }}
                fetchData={fetchPayout}
                handleChangePage={fetchMoreData}
              >
                {payout.map((row, index) => {
                  const { amount, createdAt, status, _id, doctorData } = row;
                  const data = doctorData || [];
                  const { firstName, lastName } = data[0] || {};
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
                      <TableCell
                        id={labelId}
                        scope="row"
                        align="left"
                        className={classes.tableCell}
                      >
                        {row?.doctorData && row?.doctorData[0] !== {} ? (
                          <div
                            style={{
                              height: "100%",
                              display: "flex",
                              alignItems: "left",
                            }}
                          >
                            <span style={{ fontSize: "1.25rem" }}>{`${
                              firstName && firstName
                            } ${lastName}`}</span>
                          </div>
                        ) : (
                          "No Name"
                        )}
                      </TableCell>
                      <TableCell
                        id={labelId}
                        scope="row"
                        align="left"
                        className={classes.tableCell}
                      >
                        {amount}
                      </TableCell>

                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.red }}
                      >
                        <Chip
                          label={status}
                          className={classes.badge}
                          style={{
                            background:
                              status === "Success"
                                ? theme.palette.common.lightGreen
                                : status === "Failed"
                                ? theme.palette.common.lightGreen
                                : theme.palette.common.lightRed,
                            color:
                              status === "Success"
                                ? theme.palette.common.green
                                : status === "Failed"
                                ? theme.palette.common.danger
                                : theme.palette.common.red,
                          }}
                        />
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {`${dateMoment(createdAt)} - ${timeMoment(createdAt)}`}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </EnhancedTable>
            </Grid>
          ) : (
            <EmptyTable
              headCells={payoutHeader}
              paginationLabel="Payout  per page"
            />
          )}
        </TableLayout>
      </>
    </Grid>
  );
};

export default Payout;
