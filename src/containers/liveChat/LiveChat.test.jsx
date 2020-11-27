import React from "react";
import LiveChat from "./LiveChat";
import { render } from "@testing-library/react";

it("blog display snapshot", () => {
  const tree = render(<LiveChat />);
  expect(tree).toMatchSnapshot();
});
