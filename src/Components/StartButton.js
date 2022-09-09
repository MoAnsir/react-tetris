import React from "react";

import "../CSS/StartButton.scss";

const StartButton = ({ callback }) => {
  return (
    <div className="startButton" onClick={callback}>
      StartButton
    </div>
  );
};

export default StartButton;
