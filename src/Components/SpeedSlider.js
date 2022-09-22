import React, { useState } from "react";

import "../CSS/SpeedSlider.scss";

const SpeedSlider = ({ gameOver, text }) => {
  const [sliderVal, setSliderVal] = useState("");

  const handleSlider = ({ target }) => {
    console.log(target.value);
    setSliderVal(target.value);
  };

  return (
    <div className="">
      <input
        type="range"
        min="0"
        max="10"
        value={sliderVal}
        list="tickmarks"
        onChange={(e) => handleSlider(e)}
      />
      <datalist id="tickmarks">
        <option value="0"></option>
        <option value="10"></option>
        <option value="20"></option>
        <option value="30"></option>
        <option value="40"></option>
        <option value="50"></option>
        <option value="60"></option>
        <option value="70"></option>
        <option value="80"></option>
        <option value="90"></option>
        <option value="100"></option>
      </datalist>
    </div>
  );
};

export default SpeedSlider;
