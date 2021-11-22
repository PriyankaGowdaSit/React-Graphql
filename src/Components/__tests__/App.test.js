import { shallow, configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import App from "../../App";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Router from "../../Views/Router";
import CircularProgress from "@mui/material/CircularProgress";
import { Done } from "@mui/icons-material";

var client = "";
// var render = ""
beforeAll(() => {
  configure({ adapter: new Adapter() });
  client = new ApolloClient({
    uri: "https://smart-meeting.herokuapp.com",
    cache: new InMemoryCache(),
    headers: {
      token: "token_priyanka",
    },
  });
});

it("renders without crashing", () => {
  shallow(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
});

it("renders Account header", async () => {
  const child = <CircularProgress color="secondary" />;
  const render = mount(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
  var appNode = render.find(App).first();
  expect(appNode.at(0).contains(child)).toEqual(true);
});
