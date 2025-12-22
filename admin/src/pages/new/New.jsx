// src/pages/New.jsx
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState({});
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    if (!info.username || !info.password) {
      setError("Username and password are required.");
      return;
    }

    try {
      let newUser = { ...info };

      // Handle image upload if a file is selected
      if (file) {
        if (!["image/jpeg", "image/png"].includes(file.type)) {
          setError("Please upload a JPEG or PNG image.");
          return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "my_unauth_upload"); // Verify this preset

        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dnxhpvydg/image/upload",
          formData
        );
        newUser.img = res.data.secure_url;
        console.log("Uploaded:", res.data.secure_url);
      }

      // Register user
      await axios.post("http://localhost:3000/apil/auth/register", newUser);
      alert("User registered successfully!");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to register or upload image.";
      setError(errorMessage);
      console.error("Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="Preview"
            />
          </div>
          <div className="right">
            <form onSubmit={handleClick}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                  accept="image/jpeg,image/png"
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    name={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                    value={info[input.id] || ""}
                    required={input.required || false}
                  />
                </div>
              ))}
              <button type="submit" disabled={!info.username || !info.password}>
                Send
              </button>
            </form>
            {error && <span className="error">{error}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;