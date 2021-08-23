import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  //res⬆️ represents the underlying request that was made to the back end server.
  dispatch({ type: FETCH_USER, paylaod: res.data });
};
