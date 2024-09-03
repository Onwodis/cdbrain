import React from "react";
import Button from '@mui/material/Button';
import { styled } from '@mui/system';



const CrazyButton = styled(Button)({
  color: `#fff`,
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
});

const StyledButtonExample = ({text}) => {
  return (
    <div>
      <CrazyButton>{text}</CrazyButton>
    </div>
  );
};

export default StyledButtonExample;
