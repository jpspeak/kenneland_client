import { render, screen } from "@testing-library/react";
import Parent from "../Parent";
import axios from "axios";
import TestModal from "../TestModal";
import { RecoilRoot } from "recoil";
import { type } from "@testing-library/user-event/dist/type";
import { click } from "@testing-library/user-event/dist/click";
import TestContextProvider from "../../../state/context/test-context";
import nock from "nock";

// jest.mock("axios");
// it("render user todos", async () => {
//   axios.get.mockImplementation(url => {
//     switch (url) {
//       case "https://jjsonplaceholder.typicode.com/todos/1":
//         return Promise.resolve({ data: {} });

//       default:
//         return Promise.reject("Not found");
//     }
//   });
//   render(<Parent />);
//   await screen.findByText("Todo");
//   screen.debug();
// });
// https://jsonplaceholder.typicode.com/todos/1
it("uses nock for api requests", async () => {
  // const scope = nock("http://192.168.254.122:5000")
  //   .get("/users/me")
  //   .reply(200, { data: { id: 1 } }, { "Access-Control-Allow-Origin": "*" });
  // const scope2 = nock("https://jsonplaceholder.typicode.com")
  //   .get("/todos/2")
  //   .reply(200, { data: { id: 2 } }, { "Access-Control-Allow-Origin": "*" });
  // render(<Parent />);
  // await screen.findByText("Todo");
  // expect(await screen.findByText("Todo")).toBeInTheDocument();
  // screen.debug();
});
