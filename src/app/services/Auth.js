import { API } from "../Utils/Axiosinstance";

export async function signup(body) {
  try {
    const result = await API.post("/auth/signup", body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return {
      success: true,
      status: result.status,
      data: result.data,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function signin(body) {
  try {
    const result = await API.post("/auth/signin", body, {
      headers: { "Content-Type": "application/json" },
    });

    if (result.data.token) {
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));
    }

    return {
      success: true,
      status: result.status,
      data: result.data,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
