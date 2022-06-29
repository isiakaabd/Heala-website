export const requirementValues = {
  qualification: ["degree", "year", "degreeImage"],
  yearBook: ["gYear", "gImage"],
  alumni: ["FacebookName", "InstagramName"],
  reference: ["referenceCode"],
  externalReference: [
    "doctorName",
    "doctorInstitution",
    "doctorPosition",
    "doctorEmail",
  ],
};

export const signUpInitialState = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const signInFormInitialState = {
  email: "",
  password: "",
};

export const specializationOptions = [
  { key: "Internal medicine", value: "Internal medicine" },
  { key: "Family medicine", value: "Family medicine" },
  { key: "General Practitioner (GP)", value: "General Practitioner (GP)" },
  { key: "Pediatrics", value: "Pediatrics" },
  { key: "Emergency medicine", value: "Emergency medicine" },
  { key: "Obstetrics gynecology", value: "Obstetrics gynecology" },
  { key: "Neurology", value: "Neurology" },
  { key: "Geriatrics", value: "Geriatrics" },
  { key: "Psychiatry", value: "Psychiatry" },
  { key: "Anesthesiology", value: "Anesthesiology" },
  { key: "Cardiology", value: "Cardiology" },
  { key: "Dermatology", value: "Dermatology" },
  { key: "Intensive medicine", value: "Intensive medicine" },
  { key: "Endocrinology", value: "Endocrinology" },
  { key: "Radiology", value: "Radiology" },
  { key: "Otorhinolaryngology", value: "Otorhinolaryngology" },
  { key: "Ophthalmology", value: "Ophthalmology" },
  { key: "Oncology", value: "Oncology" },
  { key: "General surgery", value: "General surgery" },
  { key: "Gynaecology", value: "Gynaecology" },
  { key: "Infectious disease", value: "Infectious disease" },
  { key: "Rheumatology", value: "Rheumatology" },
  { key: "Nephrology", value: "Nephrology" },
  { key: "Infectious disease", value: "Infectious disease" },
  { key: "Pulmonology", value: "Pulmonology" },
  { key: "Gastroenterology", value: "Gastroenterology" },
  { key: "Osteopathy", value: "Osteopathy" },
  { key: "Clinical  physiology", value: "Clinical physiology" },
  { key: "Allergology", value: "Allergology" },
  { key: "Adolescent medicine ", value: "Adolescent medicine " },
  { key: "Aviation medicine", value: "Aviation medicine" },
  {
    key: "Child and adolescent psychiatry",
    value: "Child and adolescent psychiatry",
  },
  { key: "occupational medicine ", value: "occupational medicine " },
  { key: "Neonatology", value: "Neonatology" },
];

export const genderOptions = [
  { key: "Male", value: "Male" },
  { key: "Female", value: "Female" },
];

export const pageTwoIntialValues = {
  firstName: "",
  lastName: "",
  gender: "",
  specialization: "",
  dob: null,
  image: null,
  hospital: "",
  phoneNumber: "",
  level: "",
};

export const selectLevelOption = [
  {
    key: "House Officer",
    value: "House Officer",
  },
  {
    key: "Medical officer (MO)",
    value: "Medical officer (MO)",
  },
  {
    key: "Registrar",
    value: "Registrar",
  },
  {
    key: "Senior Registrar",
    value: "Senior Registrar",
  },
  {
    key: "Consultant",
    value: "Consultant",
  },
];

export const step3FromInitialValues = {
  degree: "",
  degreeImage: "",
  year: null,
  license: "",
  expire: null,
  licenseImage: "",
  licenseType: "",
  gYear: null,
  gImage: "",
  FacebookName: "",
  InstagramName: "",
  doctorName: "",
  referenceCode: "",
  doctorEmail: "",
  doctorPosition: "",
  doctorInstitution: "",
};
