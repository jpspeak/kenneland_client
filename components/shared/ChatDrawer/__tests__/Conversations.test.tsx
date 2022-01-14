import { screen } from "@testing-library/dom";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatInput from "../ChatInput";
import nock from "nock";
import Conversation from "../Conversation";
import { RecoilRoot } from "recoil";
import ChatDrawerContext, { ChatDrawerProvider } from "../../../../state/context/chat-drawer-context";

const mockedUser = {
  _id: "6194be324de117ac9a27539f",
  email: "jayphilipcamillo@gmail.com",
  firstName: "jay philip",
  lastName: "camillo",
  role: "USER",
  createdAt: "2021-11-17T08:32:50.676Z",
  updatedAt: "2021-12-08T08:58:00.783Z",
  __v: 0,
  avatar: "https://do2pc6u25f6a7.cloudfront.net/6194be324de117ac9a27539f/16389538799224-ZHSayW6p3vPSJSGFm_c.jpeg",
  kennel: {
    _id: "6194be324de117ac9a2753a1",
    name: "Big Boss Bullies",
    user: "6194be324de117ac9a27539f",
    createdAt: "2021-11-17T08:32:50.960Z",
    updatedAt: "2021-12-08T07:16:01.804Z",
    __v: 0,
    description:
      "This is some random description for this kennel. This is some random description for this kennel. This is some random description for this kennel. This is some random description for this kennel. ",
    location: "Davao city",
    logo: "https://do2pc6u25f6a7.cloudfront.net/6194be324de117ac9a27539f/1638947679787TY4JhCd3dlL48UnIyJI9G.jpeg",
    banner: "https://do2pc6u25f6a7.cloudfront.net/6194be324de117ac9a27539f/1638947760779o5RnsQJcw-nJsDMKugyAr.jpeg"
  }
};

const mockedCreatedMessage = {
  conversation: {
    latestMessage: { senderId: "6194be324de117ac9a27539f", messageBody: "hello" },
    _id: "61b988ec985bbc0e8c11e232",
    membersSeen: ["6194be324de117ac9a27539f"],
    members: [
      {
        data: {
          _id: "6194be324de117ac9a27539f",
          email: "jayphilipcamillo@gmail.com",
          firstName: "jay philip",
          lastName: "camillo",
          role: "USER",
          createdAt: "2021-11-17T08:32:50.676Z",
          updatedAt: "2021-12-08T08:58:00.783Z",
          __v: 0,
          avatar: "https://do2pc6u25f6a7.cloudfront.net/6194be324de117ac9a27539f/16389538799224-ZHSayW6p3vPSJSGFm_c.jpeg",
          kennel: "6194be324de117ac9a2753a1"
        },
        type: "User",
        _id: "61b988ec985bbc0e8c11e233"
      },
      {
        data: {
          _id: "6195d459ee8f3919e55bf51d",
          name: "Direct Intranet Assistant",
          user: "6195d455ee8f3919e55bf518",
          updatedAt: "2021-11-18T04:19:37.736Z",
          createdAt: "2021-11-18T04:19:37.736Z",
          __v: 0
        },
        type: "Kennel",
        _id: "61b988ec985bbc0e8c11e234"
      }
    ],
    updatedAt: "2021-12-17T16:08:27.096Z"
  },
  sender: {
    _id: "6194be324de117ac9a27539f",
    email: "jayphilipcamillo@gmail.com",
    firstName: "jay philip",
    lastName: "camillo",
    role: "USER",
    createdAt: "2021-11-17T08:32:50.676Z",
    updatedAt: "2021-12-08T08:58:00.783Z",
    __v: 0,
    avatar: "https://do2pc6u25f6a7.cloudfront.net/6194be324de117ac9a27539f/16389538799224-ZHSayW6p3vPSJSGFm_c.jpeg",
    kennel: "6194be324de117ac9a2753a1"
  },
  senderType: "User",
  messageBody: "Hello world!",
  availableTo: ["6194be324de117ac9a27539f", "6195d459ee8f3919e55bf51d"],
  _id: "61bcb5fa76a467ca671b38b1",
  createdAt: "2021-12-17T16:08:26.840Z",
  updatedAt: "2021-12-17T16:08:26.840Z",
  __v: 0
};

const mockedMessages = {
  messages: [
    {
      _id: "61bcb5fa76a467ca671b38b1",
      conversation: { latestMessage: { senderId: "6194be324de117ac9a27539f", messageBody: "hello" }, _id: "61b988ec985bbc0e8c11e232", membersSeen: ["6194be324de117ac9a27539f"] },
      sender: {
        _id: "6194be324de117ac9a27539f",
        email: "jayphilipcamillo@gmail.com",
        firstName: "jay philip",
        lastName: "camillo",
        role: "USER",
        createdAt: "2021-11-17T08:32:50.676Z",
        updatedAt: "2021-12-08T08:58:00.783Z",
        __v: 0,
        avatar: "https://do2pc6u25f6a7.cloudfront.net/6194be324de117ac9a27539f/16389538799224-ZHSayW6p3vPSJSGFm_c.jpeg",
        kennel: "6194be324de117ac9a2753a1"
      },
      senderType: "User",
      messageBody: "hello",
      availableTo: ["6194be324de117ac9a27539f", "6195d459ee8f3919e55bf51d"],
      createdAt: "2021-12-17T16:08:26.840Z",
      updatedAt: "2021-12-17T16:08:26.840Z",
      __v: 0
    }
  ]
};
nock("http://192.168.254.122:5000")
  .get("/users/me")
  .reply(200, { data: mockedUser }, { "Access-Control-Allow-Origin": "*" });

nock("http://192.168.254.122:5000")
  .get(uri => uri.includes("/messages/memberSelfId") && uri.includes("/memberId"))
  .reply(200, { data: [] }, { "Access-Control-Allow-Origin": "*" });

nock("http://192.168.254.122:5000")
  .get("/users/undefined/conversations")
  .reply(200, { data: [] }, { "Access-Control-Allow-Origin": "*" });

nock("http://192.168.254.122:5000")
  .post("/messages")
  .reply(200, mockedCreatedMessage, { "Access-Control-Allow-Origin": "*" });

nock("http://192.168.254.122:5000")
  .get("/users/undefined/conversations/unseen-count")
  .reply(200, { data: 1 }, { "Access-Control-Allow-Origin": "*" });

nock("http://192.168.254.122:5000")
  .post(uri => uri.includes("/seenBy"))
  .reply(200, {}, { "Access-Control-Allow-Origin": "*" });

describe("Conversation", () => {
  afterEach(() => {
    cleanup();
  });
  it("shows the new message if successfully sent", async () => {
    // render(
    //   <RecoilRoot>
    //     <ChatDrawerProvider>
    //       <Conversation />
    //     </ChatDrawerProvider>
    //   </RecoilRoot>
    // );
    // const inputEl = await screen.findByPlaceholderText("Type here");
    // userEvent.type(inputEl, "Hello world!");
    // const sendButtonEl = await screen.findByTestId("send-btn");
    // userEvent.click(sendButtonEl);
    // expect(await screen.findByTestId("message-container")).toBeInTheDocument();
    // screen.debug();
  });
});
