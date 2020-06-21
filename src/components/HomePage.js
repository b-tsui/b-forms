import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useAuth0 } from "../react-auth0-spa";

import { Typography } from "@material-ui/core";

import Splash from "./Splash";
import Loading from "./Loading";
import UserHome from "./UserHome";
import "../styles/home-page.css";

const HomePage = () => {
  const { user, loading } = useAuth0();

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <>
          {!user && <Splash />}
          {user && <UserHome user={user} />}
        </>
      )}
    </>
  );
};

export default HomePage;
