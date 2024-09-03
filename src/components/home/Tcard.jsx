import { Image } from 'semantic-ui-react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const TestimonCard = ({ title, image, name, description }) => {
  return (
    <div className=" uyi px-2 py-4 mb-10 shadow-lg rounded bg-slate-50 mr-4">
      <div className="sm:ml-4 mt-[-5px] w-[150px] text-center mx-auto">
        <Avatar
          alt="Remy Sharp"
          src={image}
          className="mx-auto text-center"
          sx={{ width: 156, height: 156 }}
        />
        
      </div>
      <div className="mt-4">
        <div className="text-center font-medium  sm:ml-4 text-lg whitespace-nowrap overflow-hidden text-ellipsis">
          <h3>{name}</h3>
          <h2>{title}</h2>
        </div>

        <div className="pb-2 text-center mx-2 sm:mx-4 text-sm sm:text-base mb-2 font-semibold text-gray-600">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonCard;
