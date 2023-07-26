// src/api/fakeApi.js
import axios from "axios";

const FAKE_API_BASE_URL = "https://fakeapi.example.com"; // Use a placeholder URL for demonstration purposes

const fakeApi = axios.create({
  baseURL: FAKE_API_BASE_URL,
});

export const login = async (username, password) => {
  // Simulate API call with a hardcoded username and password
  try {
    // Replace these values with actual credentials you want to check against
    const validUsername = "admin";
    const validPassword = "password";

    if (username === validUsername && password === validPassword) {
      return { success: true };
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};

export const logout = async () => {
  // Simulate API call to log out the user
  // You can clear any user-related data or tokens here in a real-world scenario
  return { success: true };
};
