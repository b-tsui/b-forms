import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useAuth0 } from "../react-auth0-spa";
import Loading from "./Loading";
import { Typography } from "@material-ui/core";
import SingleForm from "./SingleForm";
import CreateForm from "./CreateForm";

const GET_USER_FORMS = gql`
  query UserForms($userId: ID!) {
    userForms(userId: $userId) {
      id
      title
      description
      createdAt
    }
  }
`;

const UserHome = ({ user }) => {
  const { loading: gqlLoading, error, data } = useQuery(GET_USER_FORMS, {
    variables: { userId: user.userId },
  });
  if (gqlLoading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  return (
    user && (
      <>
        <h1 className="home-welcome">Welcome, {user.name}</h1>
        <div className="home-content">
          <Typography variant="h5" component="h5">
            My Forms
          </Typography>
        </div>
        <div className="sets-container">
          forms here
          <CreateForm />
          {data.userForms.map((form) => (
            <SingleForm form={form} />
          ))}
        </div>
      </>
    )
  );
};

export default UserHome;
