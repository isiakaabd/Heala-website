import { gql } from "@apollo/client";

export const signup = gql`
  mutation signup($email: EmailAddress!, $password: String!) {
    signup(data: { authType: "normal", email: $email, password: $password, role: "doctor" }) {
      account {
        dociId
        access_token
        refresh_token
      }
      message
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
