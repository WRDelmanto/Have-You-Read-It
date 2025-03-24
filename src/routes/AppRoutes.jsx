import React from "react";
import { Route, Routes } from "react-router-dom";
import BookDetails from "../pages/BookDetails";
import Home from "../pages/Home";
import ReaderSettings from "../pages/ReaderSettings";
import ReaderDetails from "../pages/ReaderDetails";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";
import AuthorDetails from "../pages/AuthorDetails";
import ForgotPassword from "../pages/ForgotPassword"; // ✅ Add this line

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:bookId" element={<BookDetails />} />
        <Route path="/settings/:readerId" element={<ReaderSettings />} />
        <Route path="/reader/:readerId" element={<ReaderDetails />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/author/:authorId" element={<AuthorDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* ✅ Add this line */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
