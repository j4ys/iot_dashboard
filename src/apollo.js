import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import https from "https";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    credentials: "include",
    //uri: "http://172.20.0.61:4000/graphql",
    uri: `http://${window.location.hostname}:4000/graphql`,
    fetchOptions: {
      agent: new https.Agent({ rejectUnauthorized: false })
    }
  })
});

export default client;
