import React from "react";
import { Route, Routes } from "react-router-dom";
import BookDetails from "../pages/BookDetails";
import Home from "../pages/Home";
import ProfileSettings from "../pages/ProfileSettings";
import ReaderDetails from "../pages/ReaderDetails";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:bookId" element={<BookDetails />} />
        <Route path="/profileSettings" element={<ProfileSettings />} />
        <Route path="/reader/:readerId" element={<ReaderDetails />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
