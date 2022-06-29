import { gql } from "@apollo/client";

export const getUsertypess = gql`
  query getUserTypeProviders($userTypeId: String) {
    getUserTypeProviders(filterBy: { userTypeId: $userTypeId }) {
      provider {
        _id
        name
        icon
        userTypeId
        createdAt
        updatedAt
        userTypeData {
          name
          icon
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const dashboard = gql`
  query getStats($providerId: String, $q: String) {
    getStats(filterBy: { providerId: $providerId }, q: $q) {
      patientStats
      doctorStats
      totalEarnings
      totalPayout
      appointmentStats
      subscribers
      availabilityCalendar {
        _id
        doctor
        doctorData
        dates {
          day
          available
          times {
            start
            stop
          }
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const getDoctorProfile = gql`
  query doctorProfiles($dociId: String) {
    doctorProfiles(
      filterBy: { dociId: $dociId }
      orderBy: "-createdAt"
      page: 1
    ) {
      #.. filterBy, orderBy and page are optional filters
      profile {
        _id
        firstName
        lastName
        gender
        phoneNumber
        createdAt
        updatedAt
        email
        email
        hospital
        specialization
        dob
        cadre
        picture
        provider
        consultations
        status
        dociId
        rating
        providerId
        accountDetails {
          accountName
          accountNumber
          bankName
        }
      }
      pageInfo {
        totalDocs
        limit
        offset
        hasPrevPage
        hasNextPage
        page
        totalPages
        pagingCounter
        prevPage
        nextPage
      }
    }
  }
`;

export const getVerificationInfo = gql`
  query getVerifications($profileId: String) {
    getVerifications(filterBy: { profileId: $profileId }) {
      verification {
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
        doctorData
      }
      pageInfo {
        totalDocs
        limit
        offset
        hasPrevPage
        hasNextPage
        page
        totalPages
        pagingCounter
        prevPage
        nextPage
      }
    }
  }
`;
