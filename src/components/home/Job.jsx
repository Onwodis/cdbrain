import React from "react";

const JobOpening = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Job Opening: Sales Associate</h1>
      <p>
        <strong>Location:</strong> Remote or Lagos, Nigeria
        <br />
        <strong>Employment Type:</strong> Full-Time
      </p>

      <h2 style={styles.subheader}>About Codar Institute</h2>
      <p>
        Codar Institute is a leading tech education provider focused on
        empowering individuals with the skills needed to excel in the digital
        age. We offer a range of courses in web development, data science, cloud
        computing, and more. Our mission is to create a learning environment
        that is both challenging and nurturing, enabling our students to reach
        their full potential.
      </p>

      <h2 style={styles.subheader}>Job Description</h2>
      <p>
        We are seeking a dynamic and results-driven Sales Associate to join our
        team. The ideal candidate will be responsible for driving sales growth,
        building strong customer relationships, and helping to expand our client
        base. As a Sales Associate, you will be an essential part of our team,
        contributing to the overall success and growth of Codar Institute.
      </p>

      <h2 style={styles.subheader}>Key Responsibilities</h2>
      <ul>
        <li>
          Develop and execute sales strategies to meet or exceed sales targets.
        </li>
        <li>Identify and cultivate new business opportunities.</li>
        <li>Maintain and grow relationships with existing clients.</li>
        <li>Deliver excellent customer service and support.</li>
        <li>
          Collaborate with the marketing team to develop effective sales
          campaigns.
        </li>
        <li>Prepare and present sales reports to management.</li>
      </ul>

      <h2 style={styles.subheader}>Qualifications</h2>
      <ul>
        <li>
          Proven experience in sales, preferably in the education or tech
          industry.
        </li>
        <li>Excellent communication and interpersonal skills.</li>
        <li>Strong negotiation and problem-solving abilities.</li>
        <li>Ability to work independently and as part of a team.</li>
        <li>Proficiency in CRM software and MS Office Suite.</li>
        <li>
          Bachelor’s degree in Business, Marketing, or a related field is a
          plus.
        </li>
      </ul>

      <h2 style={styles.subheader}>Benefits</h2>
      <ul>
        <li>Competitive salary and performance-based incentives.</li>
        <li>Opportunity for career growth and development.</li>
        <li>Flexible work environment.</li>
        <li>Access to all Codar Institute courses.</li>
        <li>Health and wellness benefits.</li>
      </ul>

      <h2 style={styles.subheader}>How to Apply</h2>
      <p>
        Interested candidates are encouraged to send their resume and a cover
        letter outlining their qualifications and experience to{" "}
        <a href="mailto:contact@codarinstitute.com">
          contact@codarinstitute.com
        </a>
        . Please use the subject line “Sales Associate Application – [Your
        Name]”.
      </p>

      <p>
        We thank all applicants for their interest in Codar Institute, but only
        those selected for an interview will be contacted.
      </p>

      <p>
        <strong>
          Codar Institute is an equal opportunity employer. We celebrate
          diversity and are committed to creating an inclusive environment for
          all employees.
        </strong>
      </p>
    </div>
  );
};

const styles = {
  container: {
    margin: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  header: {
    color: "#2c3e50",
  },
  subheader: {
    color: "#2980b9",
  },
};

export default JobOpening;
