import React from 'react'

const Talk = ({a,b,c,d,bg,full}) => {
  return (
    <div className="w-100">
      <div className="mx-auto col-12 col-md-7 col-lg-12  ">
        <div  className={`${full ? `usebgh bgtran fula` : ``} d-flex jbtw px-1 h-100`}>
          {/* <h4>You have to add teachers first </h4> */}
          <div
            className={`${bg ? `usebg ` : ``} rounded w-100 fw-5 text-success ffam px-3`}
          >
            <h4>{a}</h4>
            <h4>{b}</h4>
            <h3>{c}</h3>
            <h6 className={`${full ? `text-dark` : `text-danger`} `}>{d}</h6>
          </div>
          <img className="noop" src="/gifs/nt.gif" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Talk
