import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    credentials: "include",
    uri: "https://56.66.235.142:4000/graphql"
  })
});

export default client;
