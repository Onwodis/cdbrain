import React from "react";
import { Link } from "react-router-dom";
import { ImageGroup, Image } from "semantic-ui-react";
import Stats from "./Stats";


const Footer = ({ cont }) => {
    // alert(cont.fname)
  return (
    <div className="mt-4 pt-5 yellow" style={{ marginTop: "140px" }}>
      

      <div
        className="container-fluid important_bg text-light footer pt-5 mt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-12 text-center text-center mb-3 mb-md-0">
                &copy; <h3 className="border-bottom d-inline">Codar Institute</h3>{" "}
                All Rights Reserved. Built By
                <a
                  href="https://codarhq.com"
                  className="border-bottom text-light"
                >
                  &nbsp;David Sokefun
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <a href="#head" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="fa fa-arrow-up"></i></a> */}
    </div>
  );
};

export default Footer;
