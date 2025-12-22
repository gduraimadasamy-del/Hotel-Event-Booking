import useFetch from "../../hooks/useFetch.js";
import "./featured.css";

const Featured = () => {
  const BASE_URL = "http://localhost:3000/apil";
  const {data,loading,error}=useFetch(`/hotels/countByCity?cities=london,Kerala,Tamilnadu`)
  console.log(data);
  
  return (
    <div className="featured">
      {loading ? ("Loading please wait "):(
      <>
        <div className="featuredItem">
          <img
            src="https://cdn.pixabay.com/photo/2019/12/26/21/10/circus-4721247_1280.jpg"
            alt=""
            className="featuredImg"
          />
          <div className="featuredTitles">
            <h1>london</h1>
            <h2>{data[0]} Properties</h2>
          </div>
        </div>
        
        <div className="featuredItem">
          <img
            src="https://cdn.pixabay.com/photo/2024/04/08/03/53/people-8682585_1280.jpg"
            alt=""
            className="featuredImg"
          />
          <div className="featuredTitles">
             <h1>Kerala</h1>
            <h2>{data[1]} Properties</h2> 
          </div>
        </div>
        <div className="featuredItem">
          <img
            src="https://cdn.pixabay.com/photo/2023/08/04/07/22/people-8168554_1280.jpg"
            alt=""
            className="featuredImg"
          />
          <div className="featuredTitles">
             <h1>TamilNadu</h1>
            <h2>{data[2]} Properties</h2> 
          </div>
          </div> 
          
      </>
      )}
    </div>
  );
};
export default Featured;
