import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import https from "https";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    credentials: "include",
    uri: "https://52.66.235.142/graphql",
    fetchOptions: {
      agent: new https.Agent({ rejectUnauthorized: false })
    }
  })
});

export default client;
