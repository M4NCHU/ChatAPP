import {Routes, Route, Navigate} from "react-router-dom"
import Home from "./pages/Home"
import LogIn from "./pages/LogIn"
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";


import * as Pages from "./constants/Routes" 
import CheckLogin from "./helpers/ProtectedRoute";
import { UserAuth } from "./context/UserContext";
import { useContext } from "react";
import ProtectedRoute from "./helpers/ProtectedRoute";

function App() {

  const {user} = UserAuth()



  

  return (
    <Routes>
      <Route path={Pages.HOME} element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      } />
      <Route path={Pages.NOTFOUND} element={<NotFound/>} />
      
      <Route path={Pages.LOGIN} element={<LogIn/>} />
      <Route path={Pages.SIGNUP} element={<SignUp/>} />
      
    </Routes>
  );
}

export default App;
