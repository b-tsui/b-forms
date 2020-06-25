import React from "react";
import { useAuth0 } from "../react-auth0-spa";

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
