import axios from "axios";
import Slide from "@material-ui/core/Slide";
import { setAccessToken } from "accessToken";
import { dateMoment } from "components/Utilities/Time";

/* console.log("graphQL Errors", error.graphQLErrors);
console.log("client Errors", error.clientErrors);
console.log(
  "network Errors",
  error.networkError?.result.errors.map((err) => err.message)
);
console.log("message Errors", error.message);
console.log("Extra Info", error.extraInfo); */

export const showErrorMsg = (enqueueSnackbar, Typography, errorMsg) => {
  enqueueSnackbar(
    <Typography style={{ fontSize: "1.2rem" }}>{errorMsg}</Typography>,
    {
      variant: "error",
      preventDuplicate: true,
      anchorOrigin: {
        horizontal: "center",
        vertical: "top",
      },
      autoHideDuration: 10000,
      TransitionComponent: Slide,
    }
  );
};

export const showSuccessMsg = (enqueueSnackbar, Typography, successMsg) => {
  enqueueSnackbar(
    <Typography style={{ fontSize: "1.2rem" }}>{successMsg}</Typography>,
    {
      variant: "success",
      preventDuplicate: true,
      anchorOrigin: {
        horizontal: "right",
        vertical: "top",
      },
      autoHideDuration: 5000,
      TransitionComponent: Slide,
    }
  );
};

const handleError = (error, enqueueSnackbar, Typography) => {
  if (error?.graphQLErrors && error?.graphQLErrors?.length > 0) {
    (error?.graphQLErrors || []).map((err) =>
      showErrorMsg(enqueueSnackbar, Typography, err.message)
    );
  } else if (error?.networkError) {
    error.networkError?.result?.errors?.map((err) =>
      showErrorMsg(
        enqueueSnackbar,
        Typography,
        err.message || "Something went wrong, try again."
      )
    );
  } else if (error?.message) {
    showErrorMsg(enqueueSnackbar, Typography, error.message);
  }
};

export const compressAndUploadImage = (
  img,
  uploadFunc,
  setPreview,
  name,
  setFieldValue,
  setProgress,
  isCompressing
) => {
  const uploadFile = (file) => {
    if (!file) throw new Error("No file passed to upload function");
    uploadFunc(file, setProgress)
      .then((res) => {
        setPreview(res);
        setFieldValue(name, res);
      })
      .catch((err) => console.log("couldn't upload image", err));
  };

  try {
    // isCompressing(true);
    uploadFile(img);
  } catch (error) {
    console.log("Error while trying to compress image", error);
    // isCompressing(false);
    uploadFile(img);
  }
};

export const scrollToTop = (element) => {
  try {
    element?.current?.scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    console.log("couldn't scroll to the top", error);
  }
};

export const uploadImage = async (file, setProgress) => {
  try {
    const form = new FormData();
    form.append("file", file);
    const data = await axios({
      method: "post",
      url: "https://api.heala.io/rest/media/upload/",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
      },
      data: form,
      onUploadProgress: (data) => {
        //Set the progress value to show the progress bar
        setProgress(Math.round((100 * data.loaded) / data.total));
      },
    });
    return data.data.data.mediaUrl; //data.data.mediaUrl
  } catch (error) {
    console.error(error);
  }
};

export const getSelectedCertification = (obj) => {
  try {
    let trueArrary = [];
    Object.keys(obj).map((key) => {
      if (obj[key] === true) {
        trueArrary.push(key);
      }
    });
    const arrWithoutLicense = trueArrary.filter((value) => value !== "license");
    return arrWithoutLicense;
  } catch (error) {
    console.log("couldn't check if true is greater than 1", error);
  }
};

export const checkForIncompleteFields = (arr, values, requirements) => {
  try {
    if (arr.length === 0) {
      return false;
    }

    const required = arr.map((value) => {
      return requirements[value];
    });
    const flatArr = required.flat();
    const noEmptyFields = flatArr.every((field) => values[field] !== "");

    return noEmptyFields;
  } catch (error) {
    console.error("Error occured while checking for empty fields", error);
    return true;
  }
};

export const signUp = async (
  register,
  signUpData,
  setAccessToken,
  enqueueSnackbar,
  Typography,
  handleNext,
  onsubmitProp
) => {
  try {
    const { email, password } = signUpData;
    const { data } = await register({
      variables: {
        email,
        password,
      },
    });

    if (data) {
      const { dociId, email: emails, access_token, _id } = data.signup.account;

      localStorage.setItem("email", emails);
      localStorage.setItem("heala_id", dociId);
      localStorage.setItem("account_id", _id);
      localStorage.setItem("token", access_token);
      setAccessToken(access_token);
      showSuccessMsg(enqueueSnackbar, Typography, "Sign up successsful");
      handleNext(1);
      onsubmitProp.resetForm();
      return true;
    }
  } catch (error) {
    if (
      error.networkError.result.errors[0].message === "Email is already taken"
    ) {
      showErrorMsg(
        enqueueSnackbar,
        Typography,
        "Email already exist, please Sign in to continue."
      );
      return "Email is already taken";
    } else {
      handleError(error, enqueueSnackbar, Typography);
      return false;
    }
  }
};

const getDocProfile = async (fetchProfile, dociId, email) => {
  const profileDataRes = await fetchProfile({
    variables: {
      dociId,
    },
  });

  const profileDataArr = profileDataRes?.data?.doctorProfiles.profile;

  const profileData = profileDataArr.filter(
    (profile) => profile?.email === email
  );

  return profileData;
};

const getDocVerification = async (fetchVerification, id) => {
  const getVerificationRes = await fetchVerification({
    variables: {
      profileId: id,
    },
  });

  const verificationData =
    getVerificationRes.data.getVerifications.verification;

  return verificationData;
};

export const checkVerificationStatus = async (fetchVerification, id) => {
  const docVerificationRes = await getDocVerification(fetchVerification, id);

  if (docVerificationRes.length === 0) {
    return "NO VERIFICATION FOUND";
  }

  if (verificationData[0].status === false) {
    return "VERIFICATION PENDING"; // VERIFICATION PENDING
  }

  if (verificationData[0].status === true) {
    return "VERIFICATION COMPLETED"; // VERIFICATION COMPLETED
  }
};

export const signIn = async (
  Login,
  loginData,
  enqueueSnackbar,
  Typography,
  fetchProfile,
  fetchVerification,
  onsubmitProp
) => {
  try {
    const { email, password } = loginData;
    const { data } = await Login({
      variables: {
        email,
        password,
      },
    });

    const {
      dociId,
      email: emails,
      access_token,
      _id,
      role,
    } = data.login.account;

    if (role !== "doctor") {
      showErrorMsg(
        enqueueSnackbar,
        Typography,
        "This email is already linked to a Heala/HMO/Hospital user account."
      );
      return "STEP 1";
    }

    localStorage.setItem("email", emails);
    localStorage.setItem("account_id", _id);
    localStorage.setItem("heala_id", dociId);
    localStorage.setItem("token", access_token);
    setAccessToken(access_token);

    const profileData = await getDocProfile(fetchProfile, dociId, emails);

    if (profileData.length === 0) {
      showErrorMsg(
        enqueueSnackbar,
        Typography,
        "Profile not found. Please fill and submit the form below to create a profile"
      );
      return "STEP 2";
    }

    localStorage.setItem("profile_id", profileData[0]._id);

    const verificationData = await getDocVerification(
      fetchVerification,
      profileData[0]._id
    );

    if (verificationData.length === 0) {
      showErrorMsg(
        enqueueSnackbar,
        Typography,
        "Verification not found or rejected. Please fill and submit the form below to create a verification process."
      );
      return "STEP 3";
    }

    if (verificationData[0].status === false) {
      return "STEP 4"; // VERIFICATION PENDING
    }

    if (verificationData[0].status === true) {
      return "STEP 5"; // VERIFICATION COMPLETED
    }

    onsubmitProp.resetForm();
  } catch (err) {
    handleError(err, enqueueSnackbar, Typography);
  }
};

export const logOut = async (logoutUser, token) => {
  try {
    const res = await logoutUser({
      variables: {
        user: token,
      },
    });

    return res?.data?.logout?.result;
  } catch (error) {
    console.log("Error while trying to log out", error);
  }
};

export const onPageTwoFormSubmit = async (
  values,
  createDoctor,
  enqueueSnackbar,
  Typography,
  handleNext
) => {
  const {
    dob,
    firstName,
    lastName,
    gender,
    specialization,
    image,
    phoneNumber,
    hospital,
    level,
  } = values;
  const correctDOB = dateMoment(dob);
  const healaId = localStorage.getItem("heala_id");
  try {
    const { data } = await createDoctor({
      variables: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        gender,
        specialization,
        image,
        phoneNumber,
        providerId: "61db6f8968b248001aec4fcb",
        cadre: level,
        dociId: healaId,
        hospital: hospital.trim(),
        dob: correctDOB,
      },
    });
    const { _id } = data?.createDoctorProfile?.profile;
    localStorage.setItem("profile_id", _id);
    enqueueSnackbar(
      <Typography style={{ fontSize: "1.2rem" }}>
        Doctor Registeration successsful
      </Typography>,
      {
        variant: "success",
        preventDuplicate: true,
        anchorOrigin: {
          horizontal: "center",
          vertical: "top",
        },
      }
    );
    handleNext(1);
  } catch (err) {
    console.log(err, "error message");
    handleError(err, enqueueSnackbar, Typography);
    if (err?.graphQLErrors[0]?.message === "Doctor Profile already exist") {
      handleNext(1);
    }
  }
};

export const onPageThreeSubmit = async (
  values,
  selectedCert,
  enqueueSnackbar,
  Typography,
  requirementValues,
  createVerification,
  handleNext,
  onsubmitProp,
  checked
) => {
  const {
    degree,
    degreeImage,
    license,
    expire,
    licenseImage,
    licenseType,
    year,
    gYear,
    gImage,
    FacebookName,
    InstagramName,
    doctorName,
    referenceCode,
    doctorEmail,
    doctorPosition,
    doctorInstitution,
  } = values;

  const gradYear = dateMoment(gYear);
  const expires = dateMoment(expire);
  const mdYear = dateMoment(year);

  if (selectedCert.length === 0) {
    showErrorMsg(
      enqueueSnackbar,
      Typography,
      "Select at least 2 verification methods and fill the forms below"
    );
    return;
  }

  const incompleteFields = checkForIncompleteFields(
    selectedCert,
    values,
    requirementValues
  );

  if (!incompleteFields) {
    showErrorMsg(
      enqueueSnackbar,
      Typography,
      "Empty fields detected, complete the form."
    );
    return;
  }

  if (!checked) {
    showErrorMsg(
      enqueueSnackbar,
      Typography,
      "To continue, click on the box to accept our terms and conditiion."
    );
    return;
  }

  console.log("passed all tests...");

  try {
    // GET PROFILE_ID
    const { data } = await createVerification({
      variables: {
        degree, //
        image: degreeImage,
        year: mdYear,
        number: license,
        expiryDate: expires,
        licenseImage, //
        type: licenseType,
        graduation: gradYear, //
        graduationImage: gImage,
        facebook: FacebookName,
        instagram: InstagramName,
        doctorName: doctorName,
        reference: referenceCode,
        profileId: localStorage.getItem("profile_id"),
        doctorEmail,
        doctorPosition, //
        doctorInstitution, //
      },
    });
    if (data) return handleNext(1);
    onsubmitProp.resetForm();
  } catch (err) {
    handleError(err, enqueueSnackbar, Typography);
  }
};
