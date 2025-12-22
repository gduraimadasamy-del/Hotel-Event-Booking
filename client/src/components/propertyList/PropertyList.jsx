import useFetch from "../../hooks/useFetch.js";
import "./propertyList.css";

const PropertyList = () => {
  const BASE_URL = "http://localhost:3000/apil";
  const {data,loading,error}= useFetch(`/hotels/countByType`)
  console.log(data)    
  const imges=[
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://media.istockphoto.com/id/1805953261/photo/embroidered-red-pins-on-a-calendar-event-planner-calendar-clock-to-set-timetable-organize.webp?a=1&b=1&s=612x612&w=0&k=20&c=0OTpK7A4PmlMA7WvGA5oo4Tm3GlCVhw_y6ueOsZHj9o=",
    "https://img.freepik.com/free-vector/watercolor-father-s-day-scene-collection_52683-85277.jpg",
    "https://www.shutterstock.com/image-vector/circus-tent-red-white-striped-600nw-342421241.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRS02LNUQ5lVBlqUXBBGtSbGzj6J-LBDUMVA&s"
  ];
  return (
    <div className="pList">
      { loading ? ("loading"):(
        <> {
          data && imges.map((img,i)=>(
        <div className="pListItem" key={i}>
          <img
            src= {img}
            className="pListImg"
          />
          <div className="pListTitles">
          <h1>{data[i]?.Type}</h1>
          <h2>{data[i]?.count}  {data[i]?.Type}</h2>            
          </div>
        </div> 
          ))}
      </>
      )}
    </div>
  )
};

export default PropertyList;
