import useFetch from "../../hooks/useFetch"; // Removed .js for consistency
import "./featuredProperties.css";

const FeaturedProperties = () => {
  // Use relative URL with proxy
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");

  // Fallback if error or no data
  if (error) return <div>Error loading featured properties: {error.message}</div>;
  if (!data || data.length === 0) return <div>No featured properties available.</div>;

  return (
    <div className="fp">
      {loading ? (
        <div className="fpLoading">Loading featured properties...</div> // Enhanced loading UI
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img
                src={item.photo?.[0] || "https://via.placeholder.com/150"} // Fallback if photo is missing
                alt={item.name || "Featured Property"}
                className="fpImg"
                onError={(e) => (e.target.src = "https://via.placeholder.com/150")} // Fallback on image load failure
              />
              <span className="fpName">{item.name || "Unknown Name"}</span>
              <span className="fpCity">{item.city || "Unknown City"}</span>
              <span className="fpPrice">
                Starting from {item.cheapestPrice || 0}
              </span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;