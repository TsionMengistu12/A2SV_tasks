import { render, fireEvent, screen, act } from "@testing-library/react";
import JobCard from "./JobCard";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { SessionProvider } from "next-auth/react";
import axios from "axios";

jest.mock("axios");
const mockStore = configureStore([]);

const mockJob = {
  id: "123",
  title: "Frontend Developer",
  company: "Tech Co",
  description: "Build modern UI apps.",
  about: {
    posted_on: "2025-08-01",
    deadline: "2025-09-01",
    location: "Remote",
    start_date: "",
    end_date: "",
    categories: ["Software", "Frontend"],
    required_skills: ["React", "TypeScript"],
  },
  image: "",
};

describe("JobCard", () => {
  it("toggles bookmark state", async () => {
    const store = mockStore({
      auth: { token: "fake-token", isAuthenticated: true },
    });

    const mockSession: any = {
      user: { id: "u1", email: "a@b.com" },
      accessToken: "fake-token",
      expires: new Date(Date.now() + 60_000).toISOString(),
    };
    render(
      <SessionProvider session={mockSession}>
        <Provider store={store}>
          <JobCard job={mockJob} onClick={() => {}} />
        </Provider>
      </SessionProvider>
    );

    const bookmarkButton = screen.getByLabelText("toggle-bookmark");
    await act(async () => {
      fireEvent.click(bookmarkButton);
    });

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/bookmarks/123"),
      {},
      expect.any(Object)
    );
  });
});
