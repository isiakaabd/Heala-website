import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useMutation, useLazyQuery } from "@apollo/client";
import { TableCell, TableRow, Grid } from "@mui/material";
import useAlert from "hooks/useAlert";
import { isSelected } from "helpers/isSelected";
import { defaultPageInfo } from "helpers/mockData";
import { useStyles } from "styles/partnersPageStyles";
import {
  changeTableLimit,
  handlePageChange,
} from "helpers/filterHelperFunctions";
import DeleteOrDisable from "components/modals/DeleteOrDisable";
import { illnesssHeadCells } from "components/Utilities/tableHeaders";
import { EnhancedTable, NoData, EmptyTable } from "components/layouts";
import { getIllness, getIllnesses } from "components/graphQL/useQuery";
import { deleteIllness } from "components/graphQL/Mutation";
import { CustomButton, Loader } from "components/Utilities";
import { dateMoment } from "components/Utilities/Time";
import { IllnessModal } from "components/modals";
import TableLayout from "components/layouts/TableLayout";
import { EditDelBtn } from "components/Buttons/EditDelBtn";

const Illness = () => {
  const theme = useTheme();
  const classes = useStyles();
  const { displayAlert } = useAlert();
  const [partner, setPartners] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [illness, setIllness] = useState("");
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);
  const [openEditFilter, setOpenEditFilter] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [fetchIllness, { loading, data, error }] = useLazyQuery(getIllnesses);
  const [getIllnes, { data: illnessData }] = useLazyQuery(getIllness);
  const [deleteIllnes] = useMutation(deleteIllness);
  const { selectedRows } = useSelector((state) => state.tables);
  const handleEditClose = () => setOpenEditFilter(false);
  const handleClose = () => setOpenFilter(false);

  const confirmDelete = async () => {
    try {
      await deleteIllnes({
        variables: {
          id: deleteId,
        },
        refetchQueries: [{ query: getIllnesses }],
      });
      displayAlert("success", "Illness deleted");
      setDeleteId("");
    } catch (err) {
      displayAlert("error", err);
    }
  };
  const darkButtonType = {
    background: theme.palette.primary.main,
    hover: theme.palette.primary.light,
    active: theme.palette.primary.dark,
  };
  const initialValues = {
    name: "",
    description: "",
  };

  const setTableData = async (response) => {
    const data = response?.data;
    if (data) {
      setPartners(data?.getIllnesses?.data || []);
      setPageInfo(data?.getIllnesses?.pageInfo || defaultPageInfo);
    }
  };

  useEffect(() => {
    fetchIllness({
      variables: {
        first: pageInfo.limit,
      },
    });
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (data) {
      setPartners(data?.getIllnesses?.data || []);
      setPageInfo(data?.getIllnesses?.pageInfo || defaultPageInfo);
    }
  }, [data]);
  const handleEdit = useCallback(
    async (id) => {
      setOpenEditFilter(true);
      await getIllnes({
        variables: {
          id,
        },
      });
    },
    //eslint-disable-next-line
    []
  );

  useEffect(() => {
    if (illnessData) {
      const { name, description, createdAt, _id } = illnessData?.getIllness;
      setIllness({
        id: _id,
        name,
        description,
        createdAt,
      });
    }
  }, [illnessData]);

  const handleDeleteIllness = (id) => {
    setOpenDelete(true);
    setDeleteId(id);
  };

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  return (
    <>
      <Grid
        container
        direction="column"
        gap={{ sm: 4, xs: 2 }}
        flexWrap="nowrap"
        height="100%"
      >
        <Grid
          item
          container
          gap={2}
          direction={{ md: "row", sm: "row", xs: "column" }}
        >
          <Grid
            item
            container
            justifyContent="flex-end"
            alignItems="center"
            flex={{ sm: 1, xs: 1, md: 1 }}
          >
            <Grid item>
              <CustomButton
                endIcon={<PersonAddAlt1Icon />}
                title="Create Illness"
                type={darkButtonType}
                onClick={() => setOpenFilter(true)}
              />
            </Grid>
          </Grid>
        </Grid>
        <TableLayout>
          {partner?.length > 0 ? (
            <Grid item container height="100%" direction="column">
              <EnhancedTable
                headCells={illnesssHeadCells}
                rows={partner}
                paginationLabel="Partner per page"
                hasCheckbox={false}
                changeLimit={async (e) => {
                  const res = changeTableLimit(fetchIllness, {
                    first: e,
                  });
                  await setTableData(res, "Failed to change table limit.");
                }}
                dataPageInfo={pageInfo}
                handlePagination={async (page) => {
                  const res = handlePageChange(
                    fetchIllness,
                    page,
                    pageInfo,
                    {}
                  );
                  await setTableData(res, "Failed to change page.");
                }}
              >
                {partner.map((row) => {
                  const isItemSelected = isSelected(row.id, selectedRows);
                  const { name, createdAt, _id, description } = row;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell
                        align="left"
                        className={classes.tableCell}
                        style={{ minWidth: "15rem" }}
                      >
                        {dateMoment(createdAt)}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {name}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {description}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        <EditDelBtn
                          onHandleClick={() => handleEdit(_id)}
                          type="edit"
                          text="Edit"
                        />
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        <EditDelBtn
                          onHandleClick={() => () => handleDeleteIllness(_id)}
                          type="delete"
                          text="Delete"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </EnhancedTable>
            </Grid>
          ) : (
            <EmptyTable
              headCells={illnesssHeadCells}
              paginationLabel="Doctors per page"
            />
          )}
        </TableLayout>
      </Grid>
      <IllnessModal
        initialValues={initialValues}
        type="add"
        open={openFilter}
        handleClose={handleClose}
      />
      <IllnessModal
        initialValues={illness}
        type="edit"
        open={openEditFilter}
        handleClose={handleEditClose}
      />
      <DeleteOrDisable
        open={openDelete}
        setOpen={setOpenDelete}
        title="Delete Illness"
        confirmationMsg="delete"
        btnValue="Delete"
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default Illness;
