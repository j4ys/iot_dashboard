import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    credentials: "include",
    uri: "http://localhost:4000/graphql"
  })
});

export default client;
