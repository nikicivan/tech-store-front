import axios from "../axios";

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post("/api/auth/createorupdateuser", {}, {
    headers: {
      "Content-Type": "application/json",
      authtoken,
    },
  });
};

export const getUser = async (authtoken) => {
  return await axios.get("/api/auth/createorupdateuser", {
    headers: {
      "Content-Type": "application/json",
      authtoken,
    },
  });
};

export const currentUser = async (authtoken) => {
  return await axios.post("/api/auth/current-user", {}, {
    headers: {
      "Content-Type": "application/json",
      authtoken,
    },
  });
};

export const currentAdmin = async (authtoken) => {
  return await axios.post("/api/auth/current-admin", {}, {
    headers: {
      "Content-Type": "application/json",
      authtoken,
    },
  });
};
