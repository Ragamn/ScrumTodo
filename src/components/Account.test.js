import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import SignUp from "./Signup";
import Login from "./Login";
import { auth } from "../firebase";
import { BrowserRouter } from "react-router-dom";

jest.mock("../firebase", () => ({
  auth: {}, // authをモック
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({})), // getAuthをモック
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("登録処理のテスト", () => {
  it("ユーザーが正しく登録されている", async () => {
    createUserWithEmailAndPassword.mockResolvedValueOnce({
      user: { uid: "12345", email: "test@example.com" },
    });

    render(<SignUp />);

    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("****"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("登録"));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        "test@example.com",
        "password123"
      );
    });
  });
});

describe("ログインのテスト", () => {
  test("正しい内容を入力してログインすることができる", async () => {
    const email = "test@example.com";
    const password = "password123";

    // Mock a successful login
    signInWithEmailAndPassword.mockResolvedValueOnce({ status: 200 });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Input email and password
    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: email },
    });
    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: password },
    });

    // Submit the form

    fireEvent.click(screen.getByRole("button", { name: "ログイン" }));

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        email,
        password
      );
    });
  });
});
