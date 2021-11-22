import { shallow, configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import BoxComponent from "../Box";

var boxRender = "";
beforeAll(() => {
  configure({ adapter: new Adapter() });
  boxRender = shallow(
    <BoxComponent
      title="Box Sample Title"
      subContent1="Content 1"
      subContent2="Content 2"
    />
  );
});

it("renders Box Component Sucessfully", async () => {
  expect(boxRender.contains("Box Sample Title")).toBe(true);

  expect(boxRender.contains("Content 1")).toBe(true);

  expect(boxRender.contains("Content 2")).toBe(true);
});
