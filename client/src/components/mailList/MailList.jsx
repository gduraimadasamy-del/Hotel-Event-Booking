import "./mailList.css";
import { useState } from "react";
import axios from "axios";

const MailList = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const res = await axios.post("/api/subscribe", { email });
      setMessage("Subscribed successfully! Check your email for deals.");
      setEmail("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Subscription failed. Try again.");
    }
  };

  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc">Sign up and we'll send the best deals to you</span>
      <div className="mailInputContainer">
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mailInput"
        />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>
      {message && <span className="mailMessage">{message}</span>}
    </div>
  );
};

export default MailList;