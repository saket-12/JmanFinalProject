import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import AdminPage from "./Pages/AdminPage";
import UserPage from "./Pages/UserPage";
import SendEmail from "./Pages/SendEmail";
import ResetPassword from "./Pages/ResetPassword";
import AddSkillPage from "./Pages/AddSkillPage";
import AddCertificatePage from "./Pages/AddCertificatePage";
import AddProjectPage from "./Pages/AddProjectPage";
import MakeApproverPage from "./Pages/MakeApproverPage";
import DoApprovePage from "./Pages/DoApprovePage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/send-email" element={<SendEmail />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/addSkill" element={<AddSkillPage />} />
        <Route path="/addCertificate" element={<AddCertificatePage />} />
        <Route path="/addProject" element={<AddProjectPage />} />
        <Route path="/makeApprover" element={<MakeApproverPage />} />
        <Route path="/skill-certificate-approve" element={<DoApprovePage />} />
        {/* Redirect user to the login page if route does not exist and user is not logged in */}
        <Route render={() => <h1>Page not found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
