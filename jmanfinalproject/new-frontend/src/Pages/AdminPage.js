import React, { useState } from "react";
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminPage() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role:"",
    phone:"",
  });

  const location = useLocation();
  const login_email = location.state.email;
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
      password: Math.random().toString(36).slice(-8),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming "/user" is the endpoint for creating a user
      console.log(userData)
      const response = await axios.post("http://localhost:3000/api/user", userData);
      alert("User created successfully!");
      console.log(response.data);
      // Optionally clear form or navigate
      //setUserData({ name: "", email: "", password: "" });
      //navigate("/send-email");
    } catch (error) {
      console.error("There was an error creating the user:", error.message);
      alert("Failed to create user.");
    }
    // let userEmail;
    // let userPassword;
    // try {
    //   //getting user data for email
    //   const token = localStorage.getItem("token");
    //   if (!token) {
    //     console.log("No token found");
    //     return;
    //   }
    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   };
    //   const response1 = await axios.get(
    //     "http://localhost:3000/user-details",
    //     config
    //   );
    //   let userEmail = response1.data.email;
    //   let userPassword = response1.data.password;
    // } catch (error) {
    //   console.error("There was an error getting the email:", error.message);
    //   alert("Failed to get emailID.");

    try {
      let email = userData.email;
      let password = userData.password;
      console.log(email, password);
      //send email
      const response2 = await axios.post("http://localhost:3000/api/send-email", {
        email: email,
        password: password,
      });
      alert(response2.data.message);
      setUserData({ name: "", email: "", password: "", role: "" , phone: "" });
    } catch (error) {
      console.error("There was an error sending the email:", error.message);
      alert("Failed to send email.");
    }
    
  };

  const goToMakeApprover = () => {
    navigate('/makeApprover');
  };

  return (
    
    <div className="max-w-md mx-auto my-10 p-5 border rounded shadow-lg">
      <h2>{login_email}</h2>
      <h1 className="text-2xl font-bold mb-5 text-center">Welcome, Admin!</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold">Create User Profile</h2>
        <div>
          <label className="block font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Role:</label>
          <input
            type="text"
            name="role"
            value={userData.role}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Phone:</label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create User
        </button>
      </form>

      <button onClick={goToMakeApprover} className="mt-5 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Assign an Approver</button>
    </div>
  );
}

export default AdminPage;
