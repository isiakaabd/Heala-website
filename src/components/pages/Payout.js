import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import DownloadSharpIcon from "@mui/icons-material/DownloadSharp";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";

import { useTheme } from "@mui/material/styles";
import { rows } from "components/Utilities/DataHeader";
import { payoutHeader } from "components/Utilities/tableHeaders";
import Avatar from "@mui/material/Avatar";
import displayPhoto from "assets/images/avatar.png";
import { H1 } from "components/Utilities/Texts";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import CustomButton from "components/Utilities/CustomButton";
import Chip from "@mui/material/Chip";

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
    "&.css-1eelh6y-MuiChip-root": {
      fontSize: "1.6rem !important",
      height: "3rem",
      borderRadius: "1.3rem",
    },
  },
}));

const options = [
  { id: 0, value: "Name" },
  { id: 1, value: "Plan" },
  { id: 2, value: "Consultation" },
];

const Payout = () => {
  const classes = useStyles();
  const theme = useTheme();

  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  const [searchMail, setSearchMail] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const buttonType = {
    main: theme.palette.success.main,
    light: theme.palette.success.light,
    dark: theme.palette.success.dark,
  };

  return (
    <Grid container direction="column">
      <Grid item container style={{ paddingBottom: "5rem" }}>
      <H1 fontSize="3.2rem" color="#4F4F4F" style={{ marginRight: "1rem" }}>
          Payout table

        </H1>
      </Grid>
      {/* The Search and Filter ends here */}
      <Grid item container>
        <EnhancedTable
          headCells={payoutHeader}
          rows={rows}
          page={page}
          paginationLabel="payout per page"
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
                  {row.entryDate}
                </TableCell>
                <TableCell
                  id={labelId}
                  scope="row"
                  align="left"
                  className={classes.tableCell}
                  style={{ color: theme.palette.common.black,  }}
                >
                  {row.time}
                </TableCell>
                   <TableCell align="center" className={classes.tableCell}>
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                  
                    }}
                  >
                    <span style={{ marginRight: "1rem" }}>
                      <Avatar alt="Remy Sharp" src={displayPhoto} sx={{ width: 24, height: 24 }} />
                    </span>
                    <span style={{ fontSize: "1.25rem" }}>
                      {row.firstName} {row.lastName}
                    </span>
                  </div>
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.medical}
                </TableCell>
                <TableCell
                  align="center"
                  className={classes.tableCell}
                  style={{ color: theme.palette.common.red }}
                >
                  {row.amount}
                </TableCell>
                 <TableCell align="center" className={classes.tableCell}>
                    <Chip
                      label={row.status}
                      className={classes.badge}
                      style={{
                        background:
                          row.status === "active"
                            ? theme.palette.common.lightGreen
                            : theme.palette.common.lightRed,
                        color:
                          row.status === "active"
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
    </Grid>
  );
};

export default Payout;