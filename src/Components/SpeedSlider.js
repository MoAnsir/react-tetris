import React, { useState } from "react";

import "../CSS/SpeedSlider.scss";

const SpeedSlider = ({ speedAdjust }) => {
  const [sliderVal, setSliderVal] = useState("");

  const handleSlider = ({ target }) => {
    setSliderVal(target.value);
    speedAdjust(target.value);
  };

  return (
    <div className="">
      <input
        type="range"
        min="100"
        max="1500"
        value={sliderVal}
        list="tickmarks"
        onChange={(e) => handleSlider(e)}
      />
      {/* Just for display */}
      <datalist id="tickmarks">
        <option value="1500"></option>
        <option value="1000"></option>
        <option value="800"></option>
        <option value="600"></option>
        <option value="400"></option>
        <option value="500"></option>
        <option value="400"></option>
        <option value="300"></option>
        <option value="200"></option>
        <option value="100"></option>
        <option value="500"></option>
      </datalist>
    </div>
  );
};

export default SpeedSlider;
