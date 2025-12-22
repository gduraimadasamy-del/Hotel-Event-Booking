import "./newevent.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { eventsInputs } from "../../formSource";
import axios from "axios";

const NewEvents = () => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [eventInput, setEventInput] = useState("");

  const { data, loading, error } = useFetch("/hotels");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Convert comma-separated numbers into array of objects
    const eventNumbers = eventInput
      .split(",")
      .map((event) => ({ number: event.trim() }));

    console.log("Data to send:", {
      ...info,
      eventNumbers,
    });

    try {
      const res = await axios.post(`/events/${hotelId}`, {
        ...info,
        eventNumbers,
      });
      alert(" Event created!");
    } catch (err) {
      console.error("❌ Error submitting form:", err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Event</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {eventsInputs.map((input) => (
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

              <div className="formInput">
                <label>Events</label>
                <textarea
                  value={eventInput}
                  onChange={(e) => setEventInput(e.target.value)}
                  placeholder="Enter comma-separated event numbers"
                />
              </div>

              <div className="formInput">
                <label>Choose a hotel</label>
                <select onChange={(e) => setHotelId(e.target.value)}>
                  <option disabled selected>
                    Select a hotel
                  </option>
                  {loading
                    ? "Loading..."
                    : data &&
                      data.map((hotels) => (
                        <option key={hotels._id} value={hotels._id}>
                          {hotels.name}
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

export default NewEvents;
