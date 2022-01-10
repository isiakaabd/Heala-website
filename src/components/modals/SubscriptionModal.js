import React, { useEffect } from "react";
import CustomButton from "components/Utilities/CustomButton";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { CREATE_PLAN, UPDATE_PLAN } from "components/graphQL/Mutation";
import { getPlans } from "components/graphQL/useQuery";
import { getSinglePlan } from "components/graphQL/useQuery";
import { useMutation, useQuery } from "@apollo/client";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";

export const SubscriptionModal = ({
  handleDialogClose,
  type,
  setAlert,
  editId,
  setSingleData,
  initialValues,
}) => {
  const theme = useTheme();
  const [createPlan] = useMutation(CREATE_PLAN, {
    refetchQueries: [{ query: getPlans }],
  });
  const [updatePlan] = useMutation(UPDATE_PLAN);

  const single = useQuery(getSinglePlan, {
    variables: {
      id: editId,
    },
  });
  const validationSchema = Yup.object({
    name: Yup.string("Enter your Name").required("Name is required"),
    amount: Yup.number("Enter your Amount")
      .typeError(" Enter a valid amount")
      .min(0, "Min value is  1")
      .required("Amount is required"),
    description: Yup.string("Enter Description").required("Description is required"),
  });

  useEffect(() => {
    if (single.data && single.data.getPlan) {
      setSingleData({
        description: single.data.getPlan.description,
        name: single.data.getPlan.name,
        amount: Number(single.data.getPlan.amount),
      });
    }
  }, [single.data, setSingleData]);

  const onSubmit = async (values, onSubmitProps) => {
    const { name, amount, description } = values;
    if (type === "edit") {
      try {
        await updatePlan({
          variables: {
            id: editId,
            name,
            amount: Number(amount),
            description,
          },
        });
        setAlert({
          message: "Plan successfully updated",
          type: "success",
        });
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    } else if (type === "add") {
      try {
        await createPlan({
          variables: {
            name,
            amount: Number(amount),
            description,
          },
        });
        setAlert({
          message: "Plan successfully created",
          type: "success",
        });
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      } catch (errors) {
        setAlert({
          message: errors.message,
          type: "danger",
        });
        setTimeout(() => {
          setAlert(null);
        }, 5000);
        console.log(errors);
      }
    }
    handleDialogClose();
    onSubmitProps.resetForm();
  };
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnMount
    >
      {({ isSubmitting, dirty, isValid }) => {
        return (
          <Form style={{ marginTop: "3rem" }}>
            <Grid item container direction="column" gap={1}>
              <Grid item container rowSpacing={3}>
                <Grid item container>
                  <FormikControl
                    control="input"
                    name="name"
                    label="Name of plan"
                    placeholder="Enter Plan Name"
                  />
                </Grid>
                <Grid item container>
                  <FormikControl
                    control="input"
                    placeholder="Enter Amount"
                    name="amount"
                    label="Amount"
                  />
                </Grid>
                <Grid item container>
                  <FormikControl
                    control="input"
                    placeholder="Enter your Description"
                    name="description"
                    label="Description"
                  />
                </Grid>

                <Grid item xs={12} marginTop={10}>
                  <CustomButton
                    title={type === "edit" ? "Save Plan" : "Add Plan"}
                    width="100%"
                    isSubmitting={isSubmitting}
                    disabled={!(dirty || isValid)}
                    type={buttonType}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

SubscriptionModal.propTypes = {
  handleDialogClose: PropTypes.func.isRequired,
  setAlert: PropTypes.func,
  editId: PropTypes.string,
  type: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  initialValues: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  validationSchema: PropTypes.object,
  setSingleData: PropTypes.func,
};
