import { gql } from "@apollo/client";

export const signup = gql`
  mutation signup($email: EmailAddress!, $password: String!) {
    signup(data: { authType: "normal", email: $email, password: $password, role: "doctor" }) {
      account {
        dociId
        access_token
        refresh_token
        _id
        email
      }
      message
      errors {
        field
        message
      }
    }
  }
`;
export const login = gql`
  mutation login($email: EmailAddress!, $password: String!) {
    login(data: { authType: "normal", email: $email, password: $password }) {
      account {
        _id
        dociId
        email
        isEmailVerified
        access_token
        refresh_token
        nextStep
        isPasswordTemporary
      }
      errors {
        field
        message
      }
    }
  }
`;
export const createDoctorProfile = gql`
  mutation createDoctorProfile(
    $firstName: String!
    $lastName: String!
    $gender: String
    $phoneNumber: String!
    $dociId: String!
    $hospital: String!
    $specialization: String!
    $dob: String!
    $cadre: String!
    $providerId: String
    $image: String!
  ) {
    createDoctorProfile(
      data: {
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
        dociId: $dociId
        hospital: $hospital
        specialization: $specialization
        dob: $dob
        gender: $gender
        cadre: $cadre
        image: $image
        providerId: $providerId
      }
    ) {
      profile {
        _id
        dociId
        createdAt
        updatedAt
        firstName
        lastName
        gender
        phoneNumber
        email
        hospital
        specialization
        dob
        cadre
        picture
        providerId
      }
      errors {
        field
        message
      }
    }
  }
`;

export const createDoctorVerification = gql`
  mutation createVerification(
    $expiryDate: String
    $licenseImage: String
    $degree: String
    $graduation: String
    $year: String
    $image: String
    $number: String
    $type: String
    $graduationImage: String
    $facebook: String
    $instagram: String
    $reference: String
    $doctorName: String
    $doctorInstitution: String
    $doctorPosition: String
    $doctorEmail: String
    $profileId: String
  ) {
    createVerification(
      data: {
        qualification: { degree: $degree, year: $year, image: $image }
        license: { number: $number, type: $type, expiry_date: $expiryDate, image: $licenseImage }
        yearbook: { graduation_year: $graduation, image: $graduationImage }
        alumni_association: { facebook_group_name: $facebook, instagram_handle: $instagram }
        reference: { reference_code: $reference }
        external_reference: {
          doctor_name: $doctorName
          doctor_institution: $doctorInstitution
          doctor_position: $doctorPosition
          doctor_email: $doctorEmail
        }
        profileId: $profileId
      }
    ) {
      data {
        _id
        qualification
        license
        yearbook
        alumni_association
        reference
        external_reference
        status
        createdAt
        updatedAt
        profileId
      }
      errors {
        field
        message
      }
    }
  }
`;
