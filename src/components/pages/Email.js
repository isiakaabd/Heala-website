import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import { Loader, CustomButton } from "components/Utilities";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  TableRow,
  Alert,
  TableCell,
  Checkbox,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { isSelected } from "helpers/isSelected";
import { useTheme } from "@mui/material/styles";
import { dateMoment } from "components/Utilities/Time";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { getEmailList } from "components/graphQL/useQuery";
import { emailHeader } from "components/Utilities/tableHeaders";
import { EnhancedTable, NoData, EmptyTable } from "components/layouts";
import TableLayout from "components/layouts/TableLayout";
// import { emailPageDefaultFilterValues } from "helpers/mockData";
//roleFilterBy
const useStyles = makeStyles((theme) => ({
  chip: {
    "&.MuiChip-root": {
      fontSize: "1.25rem",
      height: "3rem",
      borderRadius: "1.3rem",
      background: theme.palette.common.white,
      color: theme.palette.common.green,
      "& .MuiChip-deleteIcon": {
        color: "inherit",
        fontSize: "inherit",
      },
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
  btn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      width: "100%",
    },
  },
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },

  tableCell: {
    "&.MuiTableCell-root": {
      fontSize: "1.25rem",
    },
  },
}));

const Email = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [
    fetchEmails,
    {
      loading,
      error,
      data,
      // refetch, variables
    },
  ] = useLazyQuery(getEmailList);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  useEffect(() => {
    if (data) {
      setEmails(data.getEmailList.data);
    }
  }, [data]);
  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [response] = useState("");
  /* const [searchMail, setSearchMail] = useState(""); */

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };

  // const [filterValues, setFilterValues] = useState(emailPageDefaultFilterValues);

  if (error) return <NoData error={error} />;

  return (
    <>
      <Grid
        container
        direction="column"
        height="100%"
        flexWrap="nowrap"
        gap={2}
      >
        {response ? (
          <Grid
            item
            width={300}
            margin="auto"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <Alert severity="success">
              <Typography variant="h1">{response}</Typography>
            </Alert>
          </Grid>
        ) : null}
        <Grid
          item
          direction={{ sm: "row", xs: "column" }}
          container
          justifyContent={"flex-end"}
          gap={{ md: 4, sm: 4, xs: 2 }}
        >
          <Grid item>
            <CustomButton
              endIcon={<AddIcon />}
              component={Link}
              to="/email/create-email"
              title="Add Email"
              type={buttonType}
            />
          </Grid>
        </Grid>

        <TableLayout>
          {loading ? (
            <Loader />
          ) : emails && emails.length > 0 ? (
            <Grid item container direction="column" height="100%">
              <EnhancedTable
                headCells={emailHeader}
                rows={emails}
                paginationLabel="email per page"
                handleChangePage={() => console.log("")}
                hasCheckbox={true}
                changeLimit={() => console.log("")}
                fetchData={() => console.log("")}
                dataPageInfo={{}}
                hasPagination={false}
              >
                {emails &&
                  emails
                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const { _id, email, createdAt, role } = row;
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
                              onClick={() =>
                                handleSelectedRows(
                                  _id,
                                  selectedRows,
                                  setSelectedRows
                                )
                              }
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
                            {email}
                          </TableCell>

                          <TableCell
                            align="left"
                            className={classes.tableCell}
                            style={{ color: theme.palette.common.red }}
                          >
                            {role}
                          </TableCell>

                          <TableCell>
                            <Button
                              variant="contained"
                              className={classes.button}
                              component={Link}
                              disabled
                              to={`email/${index}`}
                              endIcon={<ArrowForwardIosIcon />}
                              /* onClick={() => setSelectedSubMenu(7)} */
                            >
                              View mail
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </EnhancedTable>
            </Grid>
          ) : (
            <EmptyTable
              headCells={emailHeader}
              paginationLabel="Email  per page"
            />
          )}
        </TableLayout>
      </Grid>
    </>
  );
};

export default Email;
