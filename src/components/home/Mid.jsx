import React from 'react'
import { useSpring, animated } from "@react-spring/web";

const Mid = () => {
  const [hovered, setHovered] = React.useState(false);
  const data = [
    { id: 1, imgSrc: "/staff/teach2.jpeg", 
      text: "In the realm of education, the role of instructors transcends mere dissemination of knowledge. Skilled instructors are the backbone of any educational institution." },

    { id: 2, imgSrc: "/path-to-your-image2.jpg", text: "Text 2" },
    { id: 3, imgSrc: "/path-to-your-image3.jpg", text: "Text 3" },
    // Add more items as needed
  ];
  const HoverItem = ({ imgSrc, text }) => {
    const [hovered, setHovered] = React.useState(false);

    const styles = useSpring({
      opacity: hovered ? 1 : 0,
      transform: hovered ? 'translateY(0%)' : 'translateY(100%)',
    });

    return (
      <div
        className="mimage-container"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img src={imgSrc} alt="YourImage" className="mimage" />
        <animated.div style={styles} className="text-overlay">
          {text}
        </animated.div>
      </div>
    )
  }
  
  return (
    <div>
      <div class="container-xxl py-5 d-none">
        <div class="container">
          {/* <div className="mimage-grid">
            {data.map((item) => (
              <HoverItem key={item.id} imgSrc={item.imgSrc} text={item.text} />
            ))}
          </div> */}
          <div class="row g-4">
            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
              <div
                class="service-item text-center pt-3"
                style={{ backgroundImage: "url(/staff/teach2.jpeg)" }}
              >
                <div class="p-4">
                  {/* <i class="fa fa-3x fa-graduation-cap iicon mb-4"></i> */}
                  {/* <h5 class="mb-3">Skilled Instructors</h5> */}
                  {/* <p>
                    In the realm of education, the role of instructors
                    transcends mere dissemination of knowledge. Skilled
                    instructors are the backbone of any educational institution.
                  </p> */}
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <div
                class="service-item text-center pt-3"
                style={{ backgroundImage: "url(/staff/teach1.jpeg)" }}
              >
                <div class="p-4">
                  
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
              <div
                class="service-item text-center pt-3"
                style={{ backgroundImage: "url(/staff/teach3.jpeg)" }}
              >
                <div class="p-4">
                  
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
              <div
                class="service-item text-center pt-3"
                style={{ backgroundImage: "url(/staff/teach.jpeg)" }}
              >
                <div class="p-4">
                  {/* <i class="fa fa-3x fa-book-open iicon mb-4"></i> */}
                  <h5 class="mb-3">Experiential Learning</h5>
                  {/* <p>
                    We Incorporate experiential learning opportunities .This
                    helps students understand the relevance of their studies and
                    preparing them for future careers.
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Mid