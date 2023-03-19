import React from "react";
import loading from './loader.gif';
const Spinner = () => {
  return (
    <div className="spinner__div">
      <img src={loading} alt="" className="loader" />
    </div>
  );
};

export default Spinner;
