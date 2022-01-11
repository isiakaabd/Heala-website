import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import EnhancedTable from "components/layouts/EnhancedTable";
import { medicationsHeadCells } from "components/Utilities/tableHeaders";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { isSelected } from "helpers/isSelected";
import { handleSelectedRows } from "helpers/selectedRows";
import PreviousButton from "components/Utilities/PreviousButton";
import displayPhoto from "assets/images/avatar.png";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getMedications } from "components/graphQL/useQuery";
import Loader from "components/Utilities/Loader";
import { dateMoment } from "components/Utilities/Time";

const useStyles = makeStyles((theme) => ({
  tableCell: {
    "&.MuiTableCell-root": {
      fontSize: "1.25rem",
    },
  },
}));

const Medications = (props) => {
  const {
    selectedMenu,
    selectedSubMenu,
    selectedPatientMenu,
    setSelectedMenu,
    setSelectedSubMenu,
    setSelectedPatientMenu,
  } = props;
  const classes = useStyles();
  const theme = useTheme();

  const { patientId } = useParams();

  const { page, rowsPerPage, selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const [medications, setMedications] = useState([]);
  const getMedic = useQuery(getMedications);
  // const { loading, data } = useQuery(getMedication, {
  //   variables: {
  //     id: patientId,
  //   },
  // });

  useEffect(() => {
    if (getMedic.data) {
      setMedications(getMedic.data.getMedications.medication.filter((i) => i.patient == patientId));
    }
  }, [getMedic.data, patientId]);

  useEffect(() => {
    setSelectedMenu(1);
    setSelectedSubMenu(2);
    setSelectedPatientMenu(6);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedPatientMenu]);
  if (getMedic.loading) return <Loader />;
  if (medications && medications.length > 0) {
    return (
      <Grid container direction="column">
        <Grid item style={{ marginBottom: "3rem" }}>
          <PreviousButton
            path={`/patients/${patientId}`}
            onClick={() => setSelectedPatientMenu(0)}
          />
        </Grid>
        <Grid item style={{ marginBottom: "5rem" }}>
          <Typography variant="h2">Medications</Typography>
        </Grid>
        <Grid item container>
          <EnhancedTable
            headCells={medicationsHeadCells}
            rows={medications}
            page={page}
            paginationLabel="List per page"
            hasCheckbox={true}
          >
            {medications
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row._id, selectedRows);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
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
                      style={{ color: theme.palette.common.grey }}
                    >
                      {dateMoment(row.createdAt)}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.tableCell}
                      style={{ maxWidth: "20rem" }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.tableCell}
                      style={{ maxWidth: "20rem" }}
                    >
                      {row.interval}
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.tableCell}
                      style={{ maxWidth: "20rem" }}
                    >
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span style={{ marginRight: "1rem" }}>
                          <Avatar
                            alt={`Display Photo of ${row.caregiver}`}
                            src={displayPhoto}
                            sx={{ width: 24, height: 24 }}
                          />
                        </span>
                        <span style={{ fontSize: "1.25rem" }}>{row.caregiver}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </EnhancedTable>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <>
        <PreviousButton path={`/patients/${patientId}`} onClick={() => setSelectedPatientMenu(0)} />
        <Grid container alignItems="center" height="100%" justifyContent="center">
          <Typography variant="h1">No Medication for this Patient</Typography>
        </Grid>
      </>
    );
  }
};

Medications.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedPatientMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedPatientMenu: PropTypes.func.isRequired,
};

export default Medications;