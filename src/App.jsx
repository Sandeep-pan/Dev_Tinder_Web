import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Components/Body";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./Components/Feed";
import Connections from "./Components/Connections";
import Requests from "./Components/Requests";

function App() {
  return (
    <>
    <Provider store={appStore}>  
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body />}>
      <Route path="/" element={<Feed />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/Connections" element={<Connections />}></Route>
      <Route path="/requests" element={<Requests />}></Route>
      </Route>
    </Routes>
    </BrowserRouter> 
    </Provider>
    </>
  )
}

export default App
