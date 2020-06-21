import React, { useState, useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "apollo-link-context";
import { api } from "./config";
import { useAuth0 } from "./react-auth0-spa";

function ApolloWrapper({ children }) {
  const { isAuthenticated, getTokenSilently } = useAuth0();
  const [bearerToken, setBearerToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const token = isAuthenticated ? await getTokenSilently() : "";
      setBearerToken(token);
    };
    getToken();
  }, [getTokenSilently, isAuthenticated]);

  const httpLink = new HttpLink({ uri: `${api}` });
  const authLink = setContext((_, { headers, ...rest }) => {
    if (!bearerToken) return { headers, ...rest };

    return {
      ...rest,
      headers: {
        ...headers,
        Authorization: bearerToken ? `Bearer ${bearerToken}` : "",
      },
    };
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloWrapper;
