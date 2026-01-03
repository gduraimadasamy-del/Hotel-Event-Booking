import "./newhotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewHotel = () => {
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({});
  const [events, setEvents] = useState([]);

  const { data, loading } = useFetch("/events");

  // input change
  const handleChange = (e) => {
    setInfo((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  // multi select events
  const handleSelect = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setEvents(values);
  };

  // submit
  const handleClick = async (e) => {
    e.preventDefault();

    // validation
    if (!files || files.length === 0) {
      alert("Please select at least one image");
      return;
    }

    if (!info.name || !info.city || !info.cheapestPrice) {
      alert("Please fill all required fields");
      return;
    }

    try {
      // upload images
      const uploadedImages = await Promise.all(
        Array.from(files).map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "my_unauth_upload");

          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dnxhpvydg/image/upload",
            formData
          );

          return res.data.url;
        })
      );

      // final payload
      const newHotel = {
        ...info,
        events,
        photos: uploadedImages,
        featured: info.featured === "true",
      };

      await axios.post("/hotels", newHotel);
      alert("Hotel created successfully ✅");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Hotel creation failed ❌");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />

        <div className="top">
          <h1>Add New Hotel</h1>
        </div>

        <div className="bottom">
          <div className="left">
            <img
              src={
                files.length > 0
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>

          <div className="right">
            <form>
              {/* Image upload */}
              <div className="formInput">
                <label htmlFor="file">
                  Image <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {/* Hotel inputs */}
              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}

              {/* Featured */}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              {/* Events */}
              <div className="selectEvents">
                <label>Events</label>
                <select multiple onChange={handleSelect}>
                  {loading
                    ? "Loading..."
                    : data?.map((event) => (
                        <option key={event._id} value={event._id}>
                          {event.title}
                        </option>
                      ))}
                </select>
              </div>

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
