import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Ctxtm = ({ xPos, yPos, show,user, handleOptionClick }) => {
  const navigate = useNavigate();
  if (!show) return null;
  const options = [
    {
      label: "Do you have a project you wil like us to wrap up for you ?",
      route: "/prj",
    },
    {
      label: "Find out who we are (about Us)",
      route: "/about",
    },
    {
      label: "Visit Our Career section",
      route: "/jobs",
    },
    {
      label: "View Our Courses",
      route: "/courses",
    },
    {
      label: "Go to homepage",
      route: "/",
    }
  ];
  const  optionsu = [
    {
      label:"Home",
      route:"/",
    }
  ]

  return (
    <div>
      <ul className="context-menu z-4" style={{ top: yPos, left: xPos }}>
        
        <h3 className="text-center text-primary fw-bold">What will you like to do ?</h3>

        {user
          ? optionsu.map((option, index) => (
              <li key={index}>
                <Link to={option.label} className={` nav-item nav-link `}>
                  Home
                </Link>
              </li>
            ))
          : options.map((option, index) => (
              <li key={index} onClick={() => navigate(option.route)}>
                {option.label}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Ctxtm;
