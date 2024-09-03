import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const CustomTooltip = ({ id, children, tooltip }) => {
  return (
    <OverlayTrigger
      placement="bottom"
      html={true}
      delay={{ show: 250, hide: 400 }}
      overlay={
        <Tooltip id={id}>
          <div
            className="text-start z-5"
            dangerouslySetInnerHTML={{ __html: tooltip }}
          />
        </Tooltip>
      }
    >
      {children}
    </OverlayTrigger>
  );
};

export default CustomTooltip;
