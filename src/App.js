import "./App.css";
// import { BrowserRouter as Router, Switch, Link, Route, Routes } from 'react-router-dom';

// import Sumbit from './components/sumbit';
import { auth, Navbar } from "./components";
import React, { Children, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Loginscreen } from "./Layout";
import {Signupscreen} from "./Layout";
import { Landing } from "./components/landingpage";
import View from "./components/Viewtask";
import Sidebar from "./components/sidebar";




const Protectedroute=  ({children})=>{
    // const token = auth.currentUser.accessToken;
const user= localStorage.getItem("user")

  const parseduser = JSON.parse(user);
  // const acctoken = parseduser.token;




if(!user){
  return <Navigate to="/login"/>;
}
return children
}
function App() {

const [isLogin,setisLogin]= useState(false);

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    setisLogin(!!user); 
  });

  return () => unsubscribe(); // Cleanup the listener
}, []);

  return (
    <>

  
           

        <Router>
          <Routes>
            
          <Route
            path="/landing"
            element={
              <Protectedroute>
                <Navbar/>
                <Landing />
              </Protectedroute>
            }
          />
          <Route path="/view" element={
            <Protectedroute>
              <Navbar />
              <View/>
              </Protectedroute>}/>
          <Route path="/sides" element={<Sidebar/>}/>
            <Route path="/login" element={<Loginscreen />} />
            <Route path="/" element={<Signupscreen />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
