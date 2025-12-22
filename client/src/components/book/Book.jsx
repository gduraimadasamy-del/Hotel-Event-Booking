import React, { useContext, useState } from 'react';
import "./book.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/SearchContext';
import axios from 'axios';
import { use } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Book = ({ setOpen, hotelId }) => {
  const [selectEvents, setSelectEvents] = useState([]);
  const { data, loading, error } = useFetch(`/events/event/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const navigate = useNavigate();

  const getDatesInRange = (startDate, endDate) => {
    if (!startDate || !endDate) return [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];
    while (date <= end) { 
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const alldates = dates?.[0] ? getDatesInRange(dates[0].startDate, dates[0].endDate) : [];

  const isAvailable = (eventNumber) => {
    if (!eventNumber?.unavailableDates || !alldates.length) return false;
    const isFound = eventNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectEvents(
      checked ? [...selectEvents, value] : selectEvents.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    if (selectEvents.length === 0) {
      alert("Please select at least one event.");
      return;
    }
    try {
      // Update availability for selected events
      await Promise.all(
        selectEvents.map((eventId) =>{
          axios.put(`/events/avilability/${eventId}`, {dates: alldates});
        })
      )

      Swal.fire({
        title: 'Success!',
        text: 'User has been registered successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/'); // 👈 redirects to homepage
        }
      });
      
    } catch (err) { }
  };

  return (
    <div className="book">
      <div className="rContainer">
        <FontAwesomeIcon
          className="rClose"
          icon={faCircleXmark}
          onClick={() => setOpen(false)}
        />
        <span>Select your Events:</span>
        {loading ? (
          <p>Loading events...</p>
        ) : error ? (
          <p>Error loading events: {error.message}</p>
        ) : !data || data.length === 0 ? (
          <p>No events available for this hotel.</p>
        ) : (
          data.map((item) => (
            <div className="rItem" key={item._id}>
              <div className="rItemInfo">
                <div className="rTitle">{item.title || "Unnamed Event"}</div>
                <div className="rDesc">{item.desc || "No description available"}</div>
                <div className="rMaxPeople">Max People: <b>{item.maxPeople || "N/A"}</b></div>
                <div className="rPrice">Price: <b>{item.price ? `${item.price}` : "N/A"}</b></div>
              </div>
              {item.eventNumbers?.length > 0 ? (
                item.eventNumbers.map((eventNumber) => (
                  <div className="event" key={eventNumber._id}>
                    <label>{eventNumber.number}</label>
                    <input
                      type="checkbox"
                      value={eventNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(eventNumber)}
                    />
                  </div>
                ))
              ) : (
                <p>No event numbers available.</p>
              )}
            </div>
          ))
        )}
        <button
          onClick={handleClick}
          className="rButton"
          disabled={selectEvents.length === 0 || loading}
        >
          Book Now!
        </button>
      </div>
    </div>
  );
};

export default Book;