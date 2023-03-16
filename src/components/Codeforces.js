import * as React from 'react';
import Contest from './Contest';
import "../style/component_style.css";
const Codeforces = () => {
  return (
    <div>
      <div className="sub_navbar">
        <div className="sub_navbar_arrow_container">
          <i className="uil uil-estate home__button"></i>
        </div>
        <div className="sub_navbar_heading">
          <h1 className="section__title">CodeForces</h1>
          <span className="section__subtitle">
            Codeforces is a social network dedicated to programming and
            programming contests.
          </span>
        </div>
      </div>
      <Contest />
    </div>
  );
}

export default Codeforces