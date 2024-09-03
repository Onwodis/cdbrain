import React from 'react'
import './blob.css'

const Blob = ({text,green}) => {
  return (
    <div className="prr">
      <div className="wrapper ">
        <button
          type="button"
          className={`${
            green ? `rounded col-md-5 huyy box_text` : `guyy`
          } btnn btnn--blue `}
        >
          <span class="btnn__txt text-light">{text}</span>

          <i class="btnn__bg" aria-hidden="true"></i>
          <i class="btnn__bg" aria-hidden="true"></i>
          <i class="btnn__bg" aria-hidden="true"></i>
          <i class="btnn__bg" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}

export default Blob

