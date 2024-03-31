import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function SkillCertificateApprove() {
    const [id, setId] = useState('');
    const [certificateInfo, setCertificateInfo] = useState(null);
    const [projectInfo, setProjectInfo] = useState(null);
    
    const location = useLocation();
    const userDetails = location.state.userDetails;
    //const approverFor = userDetails.madeApproverFor;
    const empEmail = userDetails.email;

    useEffect(() => {
        // Make Axios call to fetch user info using empEmail
        axios.get(`http://localhost:3000/user/${empEmail}`)
          .then(response => {
            const userId = response.data._id;
            setId(userId);
    
            // Make Axios call to fetch certificates using userId
            axios.get(`http://localhost:3000/certificates/${userId}`)
              .then(certificateResponse => {
                setCertificateInfo(certificateResponse.data);
              })
              .catch(error => {
                console.error('Error fetching certificate info:', error);
              });
    
            // Make Axios call to fetch projects using userId
            axios.get(`http://localhost:3000/projects/${userId}`)
              .then(projectResponse => {
                setProjectInfo(projectResponse.data);
              })
              .catch(error => {
                console.error('Error fetching project info:', error);
              });
          })
          .catch(error => {
            console.error('Error fetching user info:', error);
          });
      }, [empEmail]); // Trigger effect when empEmail changes
    
      return (
        <div>
          <h1>{empEmail}</h1>
          <h1>User ID: {id}</h1>
          <h2>Certificate Info: {certificateInfo ? JSON.stringify(certificateInfo) : 'Loading...'}</h2>
          <h2>Project Info: {projectInfo ? JSON.stringify(projectInfo) : 'Loading...'}</h2>
        </div>
      );
}

export default SkillCertificateApprove;
