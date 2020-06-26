export const api =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/graphql"
    : "https://bforms-api.uc.r.appspot.com/graphql";
