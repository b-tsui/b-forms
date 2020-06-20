import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useAuth0 } from "../react-auth0-spa";

import { Typography } from "@material-ui/core";

import Splash from "./Splash";
import Loading from "./Loading";

const HomePage = () => {
  const { user, loading } = useAuth0();

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <>
          {!user && <Splash />}
          {user && (
            <>
              <h1 className="home-welcome">Welcome, {user.name}</h1>
              <div className="home-content">
                <Typography variant="h5" component="h5">
                  My Forms
                </Typography>
              </div>
              <div className="sets-container">forms here</div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default HomePage;
