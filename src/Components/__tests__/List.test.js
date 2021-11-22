import { shallow, configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ListComponent from "../List";
beforeAll(() => {
  configure({ adapter: new Adapter() });
});

it("expect List item to be displayed", async () => {
  const meetingRooms = [
    {
      id: 1,
      floor: 1,
      meetings: [],
      name: "Meeting Room 1",
    },
    {
      id: 2,
      floor: 1,
      meetings: [],
      name: "Meeting Room 2",
    },
  ];
  const listRender = shallow(
    <ListComponent
      data={meetingRooms}
      listTitle="Available Rooms"
      secondaryActionType="button"
      secondaryActionText="Choose Room"
      listItemTextTitle="name"
      component="bookMeeting"
      building={8}
    />
  );
  expect(listRender.contains("Available Rooms")).toBe(true);
});


