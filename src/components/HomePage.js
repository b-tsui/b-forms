import React, { useEffect } from "react";
import { useAuth0 } from "../react-auth0-spa";

import Splash from "./Splash";
import Loading from "./Loading";
import UserHome from "./UserHome";
import "../styles/home-page.css";

const HomePage = () => {
  const { user, loading, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (user && !isAuthenticated) {
      window.location.reload();
    }
  }, [user]);

  return (
    <>
      <div style={{ paddingTop: "64px" }}>
        {loading && <Loading />}
        {!loading && (
          <>
            {!user && <Splash />}
            {user && <UserHome user={user} isAuthenticated={isAuthenticated} />}
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
