import axios from "axios";
import React, { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';
//import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';


function UserPage() {
  const [userDetails, setUserDetails] = useState();
  const location = useLocation();
  const login_email = location.state.email.email;
  // const isApprover = location.state.email;
  // console.log("Before");
  // console.log(isApprover);
  // console.log("After");
  const navigate = useNavigate();

  const handleSkillClick = () => {
    // Assuming 'data' is the response you want to pass
    const data = { response: userDetails };

    // Navigate to the /addSkill route along with the data
    navigate('/addSkill', { state: { data } });
  };
  const handleCertificateClick = () => {
    // Assuming 'data' is the response you want to pass
    const data = { response: userDetails };

    // Navigate to the /addSkill route along with the data
    navigate('/addCertificate', { state: { data } });
  };
  const handleProjectClick = () => {
    // Assuming 'data' is the response you want to pass
    const data = { response: userDetails };

    // Navigate to the /addSkill route along with the data
    navigate('/addProject', { state: { data } });
  };

  const handleApproveClick = () => {
    navigate('/skill-certificate-approve' , { state : { userDetails }});
  };



  useEffect(() => {
   
    const fetchUserDetails = async (email) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found");
          return;
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`http://localhost:3000/user/${email}`, config);
        console.log(response.data.isApprover);
        setUserDetails(response.data);
        //console.log(userDetails);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUserDetails(login_email);
  }, [login_email]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {userDetails ? (
          <>
            <h1 className="block text-gray-700 text-xl font-bold mb-2">
              Welcome, {userDetails.name}!
            </h1>
            <p className="text-gray-700 text-base">
              Email: {login_email}
            </p>
            <p className="text-gray-700 text-base">
            Approver Status: {userDetails?.isApprover ? 'yes' : 'No'}
            {userDetails?.isApprover && (
        <button onClick={handleApproveClick}>Go to Skill Certificate Approve</button>
      )}
            </p>
          </>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
      
      <button onClick={handleSkillClick}>Add Skill</button>
      <button onClick={handleCertificateClick}>Add Certificates</button>
      <button onClick={handleProjectClick}>Add Project Experience</button>
    </div>
  );
  
}

export default UserPage;
