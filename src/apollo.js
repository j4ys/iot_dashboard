import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import https from "https";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    credentials: "include",
    uri: "https://embryozim.tech/graphql",
    fetchOptions: {
      agent: new https.Agent({ rejectUnauthorized: false })
    }
  })
});

export default client;
