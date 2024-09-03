import React from 'react'
import {Link} from 'react-router-dom'
import {ImageGroup,Image} from 'semantic-ui-react'
import Stats from "./Stats";
import Testimonial from './Testimonial.jsx'

const Footer = ({cont,user,prj}) => {
  return (
    <div className="mt-4 pt-5 yellow" style={{ marginTop: "140px" }}>
      {!prj ? (
        <div>
          {/* <Testimonial /> */}

          <Stats />
          <h2 className="tida purples fs-2 text-center pt-5 mb-5 text-capitalize">
            Where Some of our students work{" "}
          </h2>
          <ImageGroup size="small" className="mx-auto  text-center">
            <Image src="/logos/amazon-logo-removebg-preview.png" />
            <Image src="/logos/apple-logo-removebg-preview.png" />
            <Image src="/logos/cisco-logo-removebg-preview.png" />
            <Image src="/logos/dropbox-logo1.png" />
            <Image src="/logos/google-logo-removebg-preview.png" />
            <Image src="/logos/grammarly-logo-removebg-preview.png" />
            <Image src="/logos/IBM-logo-removebg-preview.png" />
            <Image src="/logos/Intel_logo-removebg-preview.png" />
            <Image src="/logos/mailchimp-logo-removebg-preview.png" />
            <Image src="/logos/meta-logo-removebg-preview.png" />
            <Image src="/logos/mobi-logo-removebg-preview.png" />
            <Image src="/logos/slack-logo-removebg-preview.png" />
            <Image src="/logos/twilio-logo-removebg-preview.png" />
            <Image src="/logos/uber-logo-removebg-preview.png" />
            <Image src="/logos/udacity-logo-removebg-preview.png" />
          </ImageGroup>
        </div>
      ) : (
        ""
      )}

      <div
        className="container-fluid important_bg text-light footer pt-5 mt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-12 text-center text-center mb-3 mb-md-0">
                &copy; <h3 className="border-bottom d-inline">{cont.fname}</h3>{" "}
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
}

export default Footer