import client from "../apollo";
import { gql } from "apollo-boost";

const isAuthenticated = async () => {
  console.log("authentication check");
  const res = await client.query({
    query: gql`
      {
        me
      }
    `
  });
  return res.data.me;
};

export default isAuthenticated;
