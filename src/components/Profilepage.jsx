import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../data/apiPath";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [jobs, setJobs] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/users/profile`, {
          headers: { Authorization: token },
        });
        setProfile(response.data);
        setProfilePic(response.data.profilePic || "");
        setUsername(response.data.username || "");
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/jobs/myJobs`, {
          headers: { Authorization: token },
        });
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchProfile();
    fetchJobs();
  }, []);

  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const updatedProfile = { profilePic, username };
      await axios.patch(`${API_URL}/users/profile`, updatedProfile, {
        headers: { Authorization: token },
      });
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <div>
        <label>Profile Picture:</label>
        <input
          type="text"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
        />
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={profile.email} readOnly />
      </div>
      <button onClick={handleProfileUpdate}>Update Profile</button>

      <h2>My Jobs</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            {job.jobTitle} at {job.companyName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
