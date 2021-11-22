import { shallow, configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import DialogComponent from "../Dialog";

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

it("dialog is not opened since the open is passed as false", async () => {
  const dialogRender = shallow(
    <DialogComponent
      meetingConfirmation={false}
      title="Sample Dialog Title"
      dialogContentMainText="Main Text"
    />
  );
  expect(dialogRender.find("#dialog").prop("className")).toBe(
    "invisibleDialog"
  );
});

it("dialog is opened since the open prop is passed as true", async () => {
  const dialogRender = shallow(
    <DialogComponent
      meetingConfirmation={true}
      title="Sample Dialog Title"
      dialogContentMainText="Main Text"
    />
  );
  expect(dialogRender.find("#dialog").prop("className")).toBe("dialog");
});

it("Displays Dialog title and sub content as passed props", async () => {
  const dialogRender = shallow(
    <DialogComponent
      meetingConfirmation={true}
      title="Sample Dialog Title"
      dialogContent={<p>Content</p>}
    />
  );
  expect(dialogRender.contains("Sample Dialog Title")).toBe(true);
  expect(dialogRender.contains("Content")).toBe(true);
});
