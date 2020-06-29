import React from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import Loading from "./Loading";
import { Typography } from "@material-ui/core";
import SingleForm from "./SingleForm/SingleForm";
//import CreateFormModal from "./CreateForm/CreateFormModal";
import Button from "@material-ui/core/Button";

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

const ADD_FORM = gql`
  mutation AddForm($input: AddFormInput!) {
    addForm(input: $input) {
      id
      userId
      title
      description
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
  const [addForm] = useMutation(ADD_FORM);
  if (gqlLoading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  const handleAddForm = async (e) => {
    e.preventDefault();
    if (user) {
      let res = await addForm({
        variables: {
          input: {
            userId: user.userId,
          },
        },
      });
      window.location.href = `/form/create/${res.data.addForm.id}`;
    }
  };

  return (
    user && (
      <>
        <h1 className="home-welcome">Welcome, {user.name}</h1>
        <div className="home-content">
          <Typography variant="h5" component="h5">
            My Forms
          </Typography>
        </div>
        <div className="user-home-container">
          <div className="user-forms-container">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddForm}
              style={{ height: 250, width: 200, top: 15 }}
            >
              Add Form
            </Button>
            {data.userForms.map((form) => (
              <SingleForm form={form} refetch={refetch} key={form.id} />
            ))}
          </div>
        </div>
      </>
    )
  );
};

export default UserHome;
