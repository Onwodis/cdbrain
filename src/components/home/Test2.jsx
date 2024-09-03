import TestimonCard from './Tcard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const records = [
  {
    name: 'Royce Boots',
    image: '/img/testimonial-1.jpg',
    career: 'Cyber security Engineer',
    story: 'MikpTech gave me a "dream come true" experience.',
  },
  {
    name: 'James Efron',
    image: '/img/testimonial-2.jpg',
    career: 'Cloud Engineer',
    story: 'I got multiple promotions after two months enrolment and study  ',
  },
  {
    name: 'Tony loner',
    image: '/img/testimonial-3.jpg',
    career: 'Software Engineer',
    story: 'MikpTech made my journey into software engineering smooth',
  },
  {
    name: 'Joy Smith',
    image: '/img/testimonial-4.jpg',
    career: 'Data Analyst',
    story: 'Data analysis now makes much sense to me.',
  },
];

const TestimonList = () => {
  const responsive = {
    // Define breakpoints and items to show at each breakpoint
    // Adjust these values based on your design and preferences
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 1,
    },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1, slidesToSlide: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 },
  };

  return (
    <div className="w-full bg-slate-100 mt-5 py-3">
      {/* Carousel title */}
      <h1 className="text-2xl sm:text-3xl font-medium text-center pb-2 pt-10">
        What our students say about us
      </h1>
      <div className="max-w-[1140px] mx-auto py-2 sm:px-6 text-center mt-10">
        {/* Carousel component */}
        {/* The word itself says what each prop means, play with the values */}
        <Carousel
          ssr={true}
          className="z-[1]"
          centerMode={true}
          keyBoardControl={false}
          infinite={true}
          draggable={true}
          responsive={responsive}
        //   swipeable={true}
        >
          {records.map((record, index) => (
            <TestimonCard
              key={index}
              title={record.career}
              image={record.image}
              description={record.story}
              name={record.name}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default TestimonList;
