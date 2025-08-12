import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../Auth/LoginPage";
import UserProfile from "../components/userProfile";
import SupportReq from "../MainScreen/SupportReq";
import HomePage from "../MainScreen/HomePage";
import RedemptionHistoryPage from "../MainScreen/RedemptionHistoryPage";
import PrivateRoute from "./privateRoute";

export default function AppRoutes() {

  return (
    <Routes>

      <Route path="/login" element={<LoginPage />} />

      <Route element={<PrivateRoute />}> 
        <Route path="/" element={<HomePage />}/>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/redemption-history" element={<RedemptionHistoryPage />}/>
        <Route path="/contact-us" element={<SupportReq />}/>
        <Route path="/profile" element={<UserProfile />}/>
      </Route>

      <Route path="/logout" element={<Navigate to={"/login"} replace />}/>

      <Route path="*" element={<Navigate to={"/login"} replace />}/>
      
    </Routes>
  );
}
