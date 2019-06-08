import client from "../apollo";
import { gql } from "apollo-boost";

const isAuthenticated = async () => {
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
