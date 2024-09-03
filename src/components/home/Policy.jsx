import React from "react";
import Sc from "../common/Sc"

const PrivacyPolicy = ({policy,setPolicyy}) => {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        color: "#333",
        lineHeight: "1.6",
        padding: "20px",
      }}
    >
      <Sc />

      <h1 style={{ color: "#0056b3" }}>Privacy Policy</h1>
      <p>
        Welcome to Codar Institute! Your privacy is important to us. This
        Privacy Policy outlines how we collect, use, disclose, and protect your
        information when you visit our website or use our services.
      </p>

      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ color: "#0056b3" }}>1. Information We Collect</h2>
        <p>We collect the following types of information:</p>
        <ul>
          <li>
            <strong>Personal Information:</strong> When you register for our
            courses, we collect personal information such as your name, email
            address, phone number, and payment details.
          </li>
          <li>
            <strong>Usage Data:</strong> We collect information on how you use
            our website, including your IP address, browser type, and browsing
            history.
          </li>
          <li>
            <strong>Cookies:</strong> We use cookies to enhance your experience
            on our website. Cookies are small data files that are stored on your
            device. You can choose to disable cookies through your browser
            settings.
          </li>
        </ul>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ color: "#0056b3" }}>2. How We Use Your Information</h2>
        <p>We use your information for the following purposes:</p>
        <ul>
          <li>
            To provide and improve our services, including customer support and
            course delivery.
          </li>
          <li>
            To process payments and send notifications about your transactions.
          </li>
          <li>
            To send you promotional materials and updates if you have opted to
            receive them.
          </li>
          <li>
            To analyze website usage and enhance our website's performance and
            user experience.
          </li>
        </ul>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ color: "#0056b3" }}>3. Sharing Your Information</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personal information
          to third parties without your consent, except in the following
          circumstances:
        </p>
        <ul>
          <li>
            To comply with legal obligations or respond to lawful requests from
            public authorities.
          </li>
          <li>
            To protect the rights, property, or safety of Codar Institute, our
            users, or others.
          </li>
          <li>
            In connection with the sale, merger, or acquisition of all or a part
            of our business.
          </li>
        </ul>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ color: "#0056b3" }}>4. Data Security</h2>
        <p>
          We take the security of your personal information seriously. We use
          appropriate technical and organizational measures to protect your data
          from unauthorized access, disclosure, or misuse. However, no method of
          transmission over the internet or method of electronic storage is 100%
          secure.
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ color: "#0056b3" }}>5. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal
          information held by us. You can also object to or restrict the
          processing of your data. To exercise these rights, please contact us
          at <a href="mailto:contact@codarhq.com">contact@codarhq.com</a>.
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ color: "#0056b3" }}>6. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or legal requirements. We will notify you of any
          significant changes by posting the new Privacy Policy on our website.
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ color: "#0056b3" }}>7. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy or our
          data practices, please contact us at:
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:contact@codarhq.com">contact@codarhq.com</a>
        </p>
        <p>
          <strong>Address:</strong> Codar Institute, 123 Tech Avenue, Lagos,
          Nigeria
        </p>
      </div>

      <p>
        Thank you for choosing Codar Institute. We are committed to protecting
        your privacy and providing a safe and secure learning environment.
      </p>
      <div className="text-center">
        <button
          onClick={() => {
            setPolicyy();
          }}
          className="mt-2 text-center"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
