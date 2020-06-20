import React, { useEffect, useState } from "react";
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useAuth0 } from "../react-auth0-spa";

const Home = () => {
  const { user, loading } = useAuth0();
  const userForms = gql`{
    {

    }
    }`;
};
