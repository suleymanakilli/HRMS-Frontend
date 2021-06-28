import { UPDATE_USER } from "../actions/updateUserActions";
import { userInfos } from "../initialValues/userInfos";

const initialState = {
  userInfos: userInfos,
};

export default function userInfoReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case UPDATE_USER:
      let jsonData=payload
      state.userInfos=jsonData
      localStorage.setItem("state",JSON.stringify(state.userInfos))


      return {
        ...state,
      };

    default:
      return state;
  }
}
