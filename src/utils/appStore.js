import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/userSlice";
import feedReducer from "../utils/feedSlice";
import connectionsReducer from "../utils/connectionSlice";
import requestReducer from "../utils/requestSlice";


const appStore = configureStore({
    reducer : {
        user : userReducer,
        feed : feedReducer,
        connections : connectionsReducer,
        request : requestReducer,
    },
});
export default appStore ;