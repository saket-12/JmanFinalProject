import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";

const AddProjectExperiencePage = () => {
    const location = useLocation();
    const { data } = location.state || {};

    const [formData, setFormData] = useState({
        userId: data.response._id,
        projectName: '',
        description: '',
        startDate: '',
        endDate: '',
        totalHoursWorked: '',
        techUsed: '',
        performance: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/project-experiences", formData);
            alert("Project experience added successfully!");
            console.log('Form data submitted:', formData);
            setFormData({
                userId: data.response._id,
                projectName: '',
                description: '',
                startDate: '',
                endDate: '',
                totalHoursWorked: '',
                techUsed: '',
                performance: ''
            });
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    return (
        <div>
            <h2>Add a Project Experience!</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userID">User ID:</label>
                    <input
                        type="text"
                        id="userID"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="projectName">Project Name:</label>
                    <input
                        type="text"
                        id="projectName"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="totalHoursWorked">Total Hours Worked:</label>
                    <input
                        type="number"
                        id="totalHoursWorked"
                        name="totalHoursWorked"
                        value={formData.totalHoursWorked}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="techUsed">Technologies Used:</label>
                    <input
                        type="text"
                        id="techUsed"
                        name="techUsed"
                        value={formData.techUsed}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="performance">Performance:</label>
                    <input
                        type="text"
                        id="performance"
                        name="performance"
                        value={formData.performance}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add Project Experience</button>
            </form>
        </div>
    );
};

export default AddProjectExperiencePage;
