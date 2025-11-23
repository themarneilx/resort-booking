// src/components/VideoBackground.tsx

import React from "react";

const VideoBackground = () => {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      poster="/beach1.jpg"
      disablePictureInPicture
      className="absolute top-0 left-0 w-full h-full object-cover z-0"
    >
      <source src="/drone.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoBackground;