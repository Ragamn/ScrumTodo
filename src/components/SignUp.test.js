import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import SignUp from "./Signup";
import { auth } from "../firebase";

jest.mock("../firebase", () => ({
  auth: {}, // authをモック
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({})), // getAuthをモック
  createUserWithEmailAndPassword: jest.fn(),
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
