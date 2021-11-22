import { shallow, configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import AppBarComponent from "../AppBar";

var appBarRender = "";
// var render = ""
beforeAll(() => {
  configure({ adapter: new Adapter() });
  appBarRender = shallow(
    <AppBarComponent
      logoContent={<p>Logo</p>}
      appNameContent={<p>Sample AppName</p>}
    />
  );
});

it("renders AppBar Sucessfully", async () => {
  //logo Content is taken as props and displayed in the App Bar
  expect(appBarRender.contains("Logo")).toBe(true);
  //App name is taken as props and displayed in the App Bar
  expect(appBarRender.contains("Sample AppName")).toBe(true);
});
