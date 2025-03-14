import React from "react";
import ProfileCard from "./ProfileCard";

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <ProfileCard 
        name="John Doe" 
        photo="./img1.avif" 
        bio="Full-stack developer with a passion for coding and design." 
      />
      <ProfileCard 
        name="Kevin" 
        photo="./img2.jpg" 
        bio="Passionate about transforming ideas into impactful strategies, 
            I thrive on leading teams with innovation and insight. 
            Ready to conquer the world of management one project at a time! #FutureLeader #BBAMindset" 
      />
    </div>
  );
}

export default App;
