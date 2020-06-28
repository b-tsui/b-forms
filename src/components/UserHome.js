import React from "react";
import { useQuery, gql } from "@apollo/client";
import Loading from "./Loading";
import { Typography } from "@material-ui/core";
import SingleForm from "./SingleForm/SingleForm";
import CreateFormModal from "./CreateForm/CreateFormModal";

const GET_USER_FORMS = gql`
  query UserForms($userId: ID!) {
    userForms(userId: $userId) {
      id
      title
      description
      createdAt
      answerCount
    }
  }
`;

const UserHome = ({ user }) => {
  const { loading: gqlLoading, error, data, refetch } = useQuery(
    GET_USER_FORMS,
    {
      variables: { userId: user.userId },
    }
  );
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
          <CreateFormModal />
          {data.userForms.map((form) => (
            <SingleForm form={form} refetch={refetch} key={form.id} />
          ))}
        </div>
      </>
    )
  );
};

export default UserHome;
