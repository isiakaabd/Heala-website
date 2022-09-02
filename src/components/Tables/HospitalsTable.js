import React, { useEffect, useState } from "react";
import { EmptyTable, NoData } from "components/layouts";
import { Grid } from "@mui/material";
import { useStyles } from "styles/hmoPageStyles";
import TableLayout from "components/layouts/TableLayout";
import CompoundSearch from "components/Forms/CompoundSearch";
import EnhancedTable from "components/layouts/EnhancedTable";
import { hospitalTableHeadCells } from "components/Utilities/tableHeaders";
import { defaultPageInfo } from "helpers/mockData";
import HospitalRow from "components/Rows/HospitalRow";
import { useLazyQuery } from "@apollo/client";
import { getProviders } from "components/graphQL/useQuery";
import { getDynamicSearchPlaceholder } from "helpers/func";
import { Loader } from "components/Utilities";

const HospitalsTable = () => {
  const classes = useStyles();
  const [hospitals, setHospitals] = useState([]);
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);
  const [fetchHospitals, { loading, error, variables }] = useLazyQuery(
    getProviders,
    {
      variables: { userTypeId: "61ed2354e6091400135e3d94" },
    }
  );

  useEffect(() => {
    fetchHospitals()
      .then(({ data }) => {
        if (data) {
          setHospitals(data?.getProviders?.provider || []);
          setPageInfo(data?.getProviders?.pageInfo || {});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [fetchHospitals]);

  if (error) return <NoData error={error} />;
  return (
    <Grid item flex={1} container direction="column" rowGap={2}>
      <Grid
        item
        container
        spacing={2}
        className={classes.searchFilterContainer}
      >
        <Grid item container flexWrap="wrap" spacing={4}></Grid>
      </Grid>
      <TableLayout
        search={
          <CompoundSearch
            queryParams={{
              fetchData: fetchHospitals,
              variables,
              loading,
              newVariables: { provider: "61db6f8968b248001aec4fcb" },
            }}
            setPageInfo={(data) =>
              setPageInfo(data?.getProviders?.pageInfo || {})
            }
            searchState={{
              value: "",
              filterBy: "name",
            }}
            setProfiles={(data) =>
              setHospitals(data?.getProviders?.provider || [])
            }
            getSearchPlaceholder={(filterBy) =>
              getDynamicSearchPlaceholder(filterBy, {
                name: "Search by name",
              })
            }
            filterOptions={[{ key: "By name", value: "name" }]}
          />
        }
      >
        {loading ? (
          <Loader />
        ) : hospitals.length > 0 ? (
          /* ================= HMO TABLE ================= */
          <Grid
            container
            item
            direction="column"
            overflow="hidden"
            maxWidth={{ md: "100%", sm: "100%", xs: "100%" }}
          >
            <EnhancedTable
              headCells={hospitalTableHeadCells}
              rows={hospitals}
              paginationLabel="Hospitals per page"
              hasCheckbox={false}
              dataPageInfo={pageInfo}
            >
              {hospitals.map((row, index) => {
                return <HospitalRow key={index} index={index} rowData={row} />;
              })}
            </EnhancedTable>
          </Grid>
        ) : (
          <EmptyTable
            headCells={hospitalTableHeadCells}
            paginationLabel="Hospitals per page"
          />
        )}
      </TableLayout>
    </Grid>
  );
};

export default HospitalsTable;