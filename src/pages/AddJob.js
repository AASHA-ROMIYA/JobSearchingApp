import { useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "./ThemeContext";
import "./AddJob.css";

export function AddJob() {
  const [newTech, setNewTech] = useState("");
  const [job, setJob] = useState({
    profile: "",
    description: "",
    experience: "",
    techs: []
  });
  const [theme] = useContext(ThemeContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdd = async () => {
    // ✅ Validation
    if (!job.profile.trim() || !job.description.trim() || !job.experience) {
      alert("⚠️ Please fill in all required fields!");
      return;
    }

    if (job.techs.length === 0) {
      alert("⚠️ Please add at least one technology!");
      return;
    }

    try {
      await axios.post("http://localhost:8080/jobs", job);
      alert("Job added successfully ✅");

      // ✅ Reset after success
      setJob({
        profile: "",
        description: "",
        experience: "",
        techs: []
      });
      setNewTech("");
    } catch (err) {
      console.error(err);
      alert("Error while adding job ❌");
    }
  };

  // ✅ Add tech
  const addTech = () => {
    if (newTech.trim() !== "") {
      setJob((prev) => ({
        ...prev,
        techs: [...prev.techs, newTech.trim()]
      }));
      setNewTech("");
    }
  };

  // ✅ Remove tech
  const removeTech = (index) => {
    setJob((prev) => ({
      ...prev,
      techs: prev.techs.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className={`add-container ${theme}`}>
      <h2>Create New Job</h2>

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
        <label>Add Techs</label>
        <div className="tech-list">
          {job.techs.map((tech, index) => (
            <span key={index} className="tech-item">
              <p className="tech">{tech}</p>
              <button
                type="button"
                onClick={() => removeTech(index)}
                style={{ marginLeft: "5px" }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </span>
          ))}
        </div>

        <div className="tech-input">
          <input
            type="text"
            placeholder="Add tech (e.g. React)"
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
          />
          <button type="button" onClick={addTech} className="add-button">
            Add
          </button>
        </div>
      </div>

      <button onClick={handleAdd}>Save Job</button>
    </div>
  );
}
