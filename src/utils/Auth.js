import client from "../apollo";
import { gql } from "apollo-boost";

const isAuthenticated = async () => {
  console.log("authentication check");
  const res = await client.query({
    query: gql`
      {
        me {
          id
          username
          email
        }
      }
    `
  });
  return res.data.me;
};

export default isAuthenticated;
