import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

const THEME = {
  background: "#f5f8fb",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#539be5",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#539be5",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
  floating: true,
};

const STEPS = [
  {
    id: "1",
    message: "What is your name?",
    trigger: "2",
  },
  {
    id: "2",
    user: true,
    trigger: "3",
  },
  {
    id: "3",
    message: "Hi {previousValue}, nice to meet you!",
    trigger: "4",
  },
  {
    id: "4",
    message: "What number I am thinking?",
    trigger: "5",
  },
  {
    id: "5",
    options: [
      { value: 1, label: "Number 1", trigger: "7" },
      { value: 2, label: "Number 2", trigger: "6" },
      { value: 3, label: "Number 3", trigger: "6" },
    ],
  },
  {
    id: "6",
    message: "Wrong answer, try again.",
    trigger: "5",
  },
  {
    id: "7",
    message: "Awesome! You are a telepath!",
    end: true,
  },
];

const LiveChat = () => {
  return (
    <>
      <ThemeProvider theme={THEME}>
        <ChatBot
          steps={STEPS}
          floating={true}
          headerTitle="Speech Recognition"
          recognitionEnable={true}
        />
      </ThemeProvider>
    </>
  );
};

export default LiveChat;
