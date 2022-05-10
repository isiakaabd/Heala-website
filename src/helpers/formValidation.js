import * as Yup from "yup";

export const SignUpValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Enter a valid email")
    .required("Email Required"),
  password: Yup.string("Select your password")
    .trim()
    .required("Password Required")
    .min(8),
  confirmPassword: Yup.string()
    .trim()
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref("password")], "password mismatch"),
    })
    .required("Please confirm Password"),
});

export const SignInValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Enter a valid email")
    .required("Email Required"),
  password: Yup.string("Select your password")
    .trim()
    .required("Password Required")
    .min(8),
});

export const pageTwoValidationSchema = Yup.object({
  firstName: Yup.string("Enter your first Name")
    .trim()
    .required("First Name is Required"),
  lastName: Yup.string("Enter your last Name")
    .trim()
    .required("lastName Name is Required"),
  hospital: Yup.string("Enter your hospital").trim(),
  dociId: Yup.string("Enter your dociId")
    .trim()
    .required("dociId Name is Required"),
  specialization: Yup.string("Select your Specialization")
    .trim()
    .required("Specialization is Required"),
  gender: Yup.string("Select your gender").required("Gender is Required"),
  image: Yup.string("Upload a single Image")
    .required("Image is required")
    .typeError("Image is required"),
  dob: Yup.date("Enter your DOB").required("DOB is Required"),
  phoneNumber: Yup.number("Enter your Phone Number").required(
    "Phone Number is Required"
  ),
  level: Yup.string("Enter your Level").trim().required("Level is Required"),
});

export const FormValidationSchema = Yup.object({
  degreeImage: Yup.string("Enter Degree Image ").trim(),
  license: Yup.string("Enter license number ")
    .trim()
    .required("License number is required."),
  expire: Yup.date("Enter expiry date ").required(
    "Provide an expiry date for your license."
  ),
  licenseImage: Yup.string("Enter your license Image ")
    .trim()
    .required("Provide an image of your license"),
  year: Yup.date("Enter your year of graduation ").nullable(),
  gYear: Yup.date("Enter your Year Book").nullable(),
  licenseType: Yup.string("Enter your license Type ")
    .trim()
    .required("Type of license is required."),
  gImage: Yup.string("Enter your Year Book Image").trim(),
  InstagramName: Yup.string("Enter your Instagram Name").trim(),
  FacebookName: Yup.string("Enter your Facebook Name").trim(),
  degree: Yup.string("Enter your degree").trim(),
  doctorInstitution: Yup.string("Enter your Doctor Institution").trim(),
  doctorPosition: Yup.string("Enter your Doctor Position").trim(),
  doctorEmail: Yup.string("Enter your Doctor Email").trim(),
  referenceCode: Yup.string("Enter your Reference Code").trim(),
  doctorName: Yup.string("Select your Doctor Name").trim(),
});
