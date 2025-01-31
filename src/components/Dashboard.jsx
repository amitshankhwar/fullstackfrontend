import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
        alert(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/users/getusers",
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setData(res.data.allUsers);
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/users/single-user",
          {
            withCredentials: true,
          }
        );

        console.log(res.data);

        if (res.data.success) {
          setCurrentUser(res.data.userInfo);
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-brand">Dashboard</div>
        <div className="navbar-user">
          <span>{currentUser.name}</span>
          <span>{currentUser.role}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <div className="cards-container">
        {data.map((user) => (
          <div key={user._id} className="user-card">
            <h3>{user.name}</h3>
            <h3>{user.email}</h3>
            <h3>{user.role}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
