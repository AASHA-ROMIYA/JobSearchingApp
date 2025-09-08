import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { ThemeContext } from "./ThemeContext";

export function Admin() {
  const [jobs, setJobs] = useState([]);
  const [input, setInput] = useState("");
  const [theme] = useContext(ThemeContext);
  const navigate=useNavigate()

  // Fetch all jobs
  const getJobData = async () => {
    const response = await axios.get("http://localhost:8080/jobs/all");
    setJobs(response.data);
  };

  // Search jobs
  const handleSearchInput = async () => {
    const response = input
      ? await axios.get(`http://localhost:8080/jobs/search/${input}`)
      : await axios.get("http://localhost:8080/jobs/all");
    setJobs(response.data);
  };

  // Delete job and refresh list
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/jobs/${id}`);
    getJobData();
  };
  const handleAdd=()=>{
    navigate("/add")
  }

  useEffect(() => {
    getJobData();
  }, []);

  return (
    <div className={`homepage ${theme}`}>
      <Header />
      <div className="search">
        <input
          type="text"
          className="search-input"
          placeholder="Search by keyword..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button className="search-btn" onClick={handleSearchInput}>
          Search
        </button>
        <i class="fa-solid fa-plus" onClick={handleAdd}></i>
        
      </div>

      {jobs.length === 0 ? (
        <p className="no-jobs">No jobs found.</p>
      ) : (
        jobs.map((job) => (
          <div key={job.id} className="job-container">
            <div className="job-data">
              <h1 className="profile">{job.profile}</h1>
              <p>Description : {job.description}</p>
              <div className="experience">
                Year of Experience : {job.experience}
              </div>
              <div className="skills">
                Skills :{" "}
                {job.techs &&
                  job.techs.map((tech, index) => (
                    <span key={index} className="skill">
                      {tech}
                      {index < job.techs.length - 1 && ", "}
                    </span>
                  ))}
              </div>
            </div>
            <div className="action">
              <i
                className="fa-regular fa-pen-to-square"
                onClick={() => navigate(`/update/${job.id}`)}
              ></i>
              <i
                className="fa-solid fa-trash"
                onClick={() => handleDelete(job.id)}
              ></i>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
