import axios from "axios";

export const verifyToken = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/users/verify-token`,
      {
        withCredentials: true,
      }
    );

    return response.data.valid; // Returns true if the token is valid
  } catch (error) {
    return false; // Returns false if the token is invalid
  }
};
