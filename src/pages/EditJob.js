import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import './EditJob.css';

export function EditJob() {
  const { id } = useParams();
  const [job, setJob] = useState({
    profile: "",
    description: "",
    experience: "",
    techs: []   // ✅ handle skills here
  });
  const navigate=useNavigate();
  const [newTech, setNewTech] = useState(""); // input for adding tech
  const [theme] = useContext(ThemeContext);

  // Fetch job by ID
  const getJobData = async () => {
    const response = await axios.get(`http://localhost:8080/jobs/${id}`);
    setJob(response.data);
  };

  useEffect(() => {
    getJobData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCacel=()=>{
    navigate("/admin");
  }

  // Handle techs addition
  const addTech = () => {
    if (newTech.trim() !== "") {
      setJob((prev) => ({
        ...prev,
        techs: [...prev.techs, newTech.trim()]
      }));
      setNewTech("");
    }
  };

  // Remove tech
  const removeTech = (index) => {
    setJob((prev) => ({
      ...prev,
      techs: prev.techs.filter((_, i) => i !== index)
    }));
  };

  // Update job
  const handleUpdate = async () => {
    await axios.put(`http://localhost:8080/jobs`, job);
    alert("Job updated successfully!");
    navigate("/admin");
  };

  return (
    <div className={`edit-container ${theme}`}>
      <h2>Update Job</h2>

      <div className="profile">
        <label>Profile</label>
        <input
          type="text"
          name="profile"
          placeholder="Java developer"
          value={job.profile}
          onChange={handleChange}
        />
      </div>

      <div className="description">
        <label>Description</label>
        <input
          type="text"
          name="description"
          placeholder="Java developer with knowledge"
          value={job.description}
          onChange={handleChange}
        />
      </div>

      <div className="exp">
        <label>Experience</label>
        <input
          type="number"
          name="experience"
          placeholder="2"
          value={job.experience}
          onChange={handleChange}
        />
      </div>

      {/* ✅ Techs Section */}
      <div className="techs">
        <label>Techs</label>
        <div className="tech-list">
          {
          job.techs.map((tech, index) => (
            <span key={index} className="tech-item">
              {tech}
              <button
                type="button"
                onClick={() => removeTech(index)}
                
              >
               <i className="fa-solid fa-xmark"></i>
              </button>
            </span>
          ))
          }
        </div>

        <div className="tech-input">
          <input
            type="text"
            placeholder="Add tech (e.g. React)"
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
          />
          <button type="button" onClick={addTech} className="add-btn">
            Add
          </button>
        </div>
      </div>

      <div className="btn">
      <button onClick={handleUpdate} className="update-btn">Update</button>
      <button onClick={handleCacel} className="cancel-btn">Cancel</button>
      </div>
    </div>
  );
}
