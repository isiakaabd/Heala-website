import React, { useEffect, useState } from "react";
import t from "prop-types";
import { Formik, Form } from "formik";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import useAlert from "hooks/useAlert";
import { useMutation } from "@apollo/client";
import { CustomButton } from "components/Utilities";
import { FormikControl } from "components/validation";
import { CREATE_PLAN, UPDATE_PLAN } from "components/graphQL/Mutation";
import { addEditPlansValidationSchema } from "helpers/validationSchemas";
import { CustomCheckbox } from "components/validation/Checkboxs";

const CreateEditHMOPlans = ({ type, initialValues, onSuccess }) => {
  const theme = useTheme();
  const [createPlan] = useMutation(CREATE_PLAN);
  const [updatePlan] = useMutation(UPDATE_PLAN);
  const [checkboxValue, setCheckboxValue] = useState(true);
  const { displayAlert, getErrorMsg, watchFunction } = useAlert();

  useEffect(() => {
    if (initialValues?.consultation !== "unlimited") {
      setCheckboxValue(false);
    }
  }, [initialValues?.consultation]);

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };

  const onAddSubmit = async (values) => {
    try {
      const variables = {
        ...values,
        amount: Number(values.amount),
      };
      const createPlanRes = createPlan({
        variables: variables,
      });

      return watchFunction(
        "Plan created successfully.",
        "Couldn't create plan. Try again.",
        createPlanRes
      ).then(() => {
        onSuccess();
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      const errMsg = getErrorMsg(error);
      displayAlert("error", errMsg);
    }
  };

  const onUpdateSubmit = async (values) => {
    try {
      const variables = {
        ...values,
        amount: Number(values.amount),
      };
      const updatePlanRes = updatePlan({
        variables: variables,
      });

      return watchFunction(
        "Plan updated successfully.",
        "Couldn't update plan. Try again.",
        updatePlanRes
      ).then(() => {
        onSuccess();
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      const errMsg = getErrorMsg(error);
      displayAlert("error", errMsg);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) =>
        type === "edit"
          ? onUpdateSubmit({
              ...values,
            })
          : onAddSubmit({ ...values })
      }
      validationSchema={addEditPlansValidationSchema}
      validateOnChange={true}
      validateOnMount={false}
      validateOnBlur={true}
    >
      {({ isSubmitting, setFieldValue }) => {
        return (
          <Form style={{ marginTop: "1rem" }}>
            <Grid item container direction="column" gap={1}>
              <Grid item container rowSpacing={2}>
                <Grid item container>
                  <FormikControl
                    hidden
                    control="input"
                    name="amount"
                    placeholder="Enter Amount"
                  />
                </Grid>
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
                    disable={true}
                    control="select"
                    options={[{ key: "Consultation only", value: "" }, ...[]]}
                    name="accessType"
                    label="Access type"
                  />
                </Grid>
                <Grid item container>
                  <CustomCheckbox
                    label="Consultations"
                    name="consultation"
                    checked={checkboxValue}
                    checkboxTitle="Unlimited"
                    onChange={() => {
                      const newValue = !checkboxValue;
                      setCheckboxValue(newValue);
                      if (newValue) {
                        setFieldValue("consultation", "unlimited");
                      } else {
                        setFieldValue("consultation", "");
                      }
                    }}
                  >
                    {!checkboxValue && (
                      <Grid item container>
                        <FormikControl
                          control="input"
                          name="consultation"
                          placeholder="Enter number of consultations"
                        />
                      </Grid>
                    )}
                  </CustomCheckbox>
                </Grid>

                <Grid item container>
                  <FormikControl
                    control="input"
                    placeholder="Enter your Description"
                    name="description"
                    label="Description"
                  />
                </Grid>

                <Grid item xs={12}>
                  <CustomButton
                    title={type === "edit" ? "Save Plan" : "Add Plan"}
                    width="100%"
                    type={buttonType}
                    isSubmitting={isSubmitting}
                    disabled={isSubmitting}
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

CreateEditHMOPlans.propTypes = {
  onSuccess: t.func.isRequired,
  initialValues: t.object.isRequired,
  type: t.string.isRequired,
};

export default CreateEditHMOPlans;
