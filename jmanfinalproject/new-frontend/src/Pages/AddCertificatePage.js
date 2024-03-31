import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";

const AddCertificatePage = () => {
    const location = useLocation();
    const { data } = location.state || {};

    const [formData, setFormData] = useState({
        userId: data.response._id,
        certificateName: '',
        organization: ''
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
            const response = await axios.post("http://localhost:3000/api/certificates", formData);
            alert("Certificate added successfully!");
            console.log('Form data submitted:', formData);
            setFormData({
                userId: data.response._id,
                certificateName: '',
                organization: ''
            });
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    return (
        <div>
            <h2>Add a Certificate!</h2>
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
                    <label htmlFor="certificateName">Certificate Name:</label>
                    <input
                        type="text"
                        id="certificateName"
                        name="certificateName"
                        value={formData.certificateName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="organization">Organization:</label>
                    <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add Certificate</button>
            </form>
        </div>
    );
};

export default AddCertificatePage;
