import React, { useState } from 'react';
import {useLocation} from 'react-router-dom';
import axios from "axios";

const AddSkillPage = () => {
  
    const location = useLocation();
    const {data} = location.state || {};
    // console.log("hahaha");
    // console.log(data.response._id);
    // console.log("hihihi");
    // State to manage form inputs
  const [formData, setFormData] = useState({
    userId: data.response._id,
    skillName: '',
    proficiency: ''
  });

  

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make an axios call to submit the form data
      // Replace this with your actual axios call
      console.log(formData)
      const response = await axios.post("http://localhost:3000/api/skills", formData);
      alert("Skill added successfully!");
      console.log('Form data submitted:', formData);
      setFormData({
        userId: data.response._id,
    skillName: '',
    proficiency: ''
      });
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <div>
      <h2>Add a Skill!</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userID">User ID:</label>
          <input
            type="text"
            id="userID"
            name="userID"
            value={formData.userId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="skillName">Skill Name:</label>
          <input
            type="text"
            id="skillName"
            name="skillName"
            value={formData.skillName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="proficiency">Proficiency:</label>
          <input
            type="text"
            id="proficiency"
            name="proficiency"
            value={formData.proficiency}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Skill</button>
      </form>
    </div>
  );
};

export default AddSkillPage;
