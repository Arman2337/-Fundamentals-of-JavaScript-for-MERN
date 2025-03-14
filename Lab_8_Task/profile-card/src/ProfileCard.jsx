import React from "react";
import "./ProfileCard.css"; // Import styles

const ProfileCard = ({ name, photo, bio }) => {
  return (
    <div className="profile-card">
      <img src={photo} alt={`${name}'s profile`} className="profile-img" />
      <h2>{name}</h2>
      <p>{bio}</p>
    </div>
  );
};

export default ProfileCard;
