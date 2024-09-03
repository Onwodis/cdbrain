import React from "react";
import './tw.css'

const TypewriterText = ({ a, b, c, d }) => (
  <div className="tbody ">
    <div class="tsign ">
      <img className="noop" src="/gifs/nt.gif" alt="" />

      <span class="fast-flicker">{a}</span>
      {b}
      <span class="flicker">{c}</span>
      {d}
    </div>
  </div>
);

export default TypewriterText;
