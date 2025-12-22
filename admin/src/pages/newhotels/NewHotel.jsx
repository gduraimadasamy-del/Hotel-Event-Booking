import "./newhotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewHotel = ({  }) => {
  const [files, setFiles] = useState(null);
    const [info, setInfo] = useState({});
    const [events,setEvents]=useState([])
    const {data,loading,error}=useFetch("/events")
  
    const handleChange = (e) => {
      setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const handleSelect=(e)=>{ 
      const value=Array.from(e.target.selectedOptions ,(option)=>option.value);
      setEvents(value);
    }
    console.log(files);
    const handleClick = async (e) => {
      e.preventDefault();
      try {
        const list=await Promise.all(
          Object.values(files).map(async(file)=>{
            const data=new FormData();
            data.append("file",file);
            data.append("upload_preset", "my_unauth_upload");
             const res = await axios.post("https://api.cloudinary.com/v1_1/dnxhpvydg/image/upload", data);
             const { url } = res.data;
             return url
          })
        );
         const newHotels = { ...info,events,photos:list, };
          await axios.post("/hotels", newHotels);
          alert(" Hotel  created")
        
      } catch (error) {
        
      }
  
    }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add new Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id}  onChange={handleChange}type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
               <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <div className="selectEvents">
                <label>Events</label>
                <select id="events" multiple  onChange={handleSelect}>
                  {loading ? "loading":data && data.map(events=>(
                    <option key={events._id} value={events._id}>{events.title}</option>
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
