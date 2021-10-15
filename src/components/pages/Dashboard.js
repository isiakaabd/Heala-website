import React from "react";
import Grid from "@mui/material/Grid";
import DashboardCharts from "components/layouts/DashboardChart";
// import { makeStyles } from "@mui/styles";
import WaitingListTable from "components/layouts/WaitingListTable";
import AvailabilityTable from "components/layouts/AvailabilityTable";

// const useStyles = makeStyles((theme) => ({}));
const Dashboard = () => {
  return (
    <Grid container direction="column">
      <Grid item>
        <DashboardCharts />
      </Grid>
      <WaitingListTable path="/dashboard/waiting-list/listId" />
      <AvailabilityTable />
    </Grid>
  );
};

export default Dashboard;
