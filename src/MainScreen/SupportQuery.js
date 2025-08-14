import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const outerContainerStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f3fbf3",
};

const cardStyle = {
  width: "100%",
  background: "#f3fbf3",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "28px",
};

const headingStyle = {
  color: "green",
  fontWeight: 700,
  fontSize: "2rem",
  margin: 0,
  letterSpacing: "-1px",
  textAlign: "center",
};

const subheadingStyle = {
  color: "#6b7685",
  fontSize: "1.05rem",
  margin: "8px 0 24px 0",
  fontWeight: 400,
  textAlign: "center",
};

const contactListStyle = {
  width: "100%",
  maxWidth: "720px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "20px",
};

const contactItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  padding: "18px",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #ffffff, #e9f9ea)",
  boxShadow: "0 3px 6px rgba(0,0,0,0.05)",
  transition: "all 0.2s ease",
};

const contactItemHover = {
  transform: "translateY(-4px)",
  boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
};

const iconWrapperStyle = {
  background: "#e4f4e5",
  borderRadius: "50%",
  padding: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "48px",
  minHeight: "48px",
};

const iconStyle = {
  fontSize: "1.6rem",
  color: "#6AB320",
};

const textStyle = {
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  fontWeight: 600,
  fontSize: "1rem",
  color: "#222",
};

const valueStyle = {
  fontSize: "0.95rem",
  color: "#555",
};

const ContactUsInfo = () => {
  const contactItems = [
    {
      icon: <FaEnvelope style={iconStyle} />,
      label: "Email",
      value: "support@example.com",
    },
    {
      icon: <FaPhoneAlt style={iconStyle} />,
      label: "Phone",
      value: "+91 98765 43210",
    },
    {
      icon: <FaMapMarkerAlt style={iconStyle} />,
      label: "Address",
      value: "123 Green Street, Eco City, India",
    },
  ];

  return (
    <div style={outerContainerStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>Contact Us</h1>
        <hr />
        <p style={subheadingStyle}>
          We’re here to assist you. Reach out via email, phone, or visit us.
        </p>
        <div style={contactListStyle}>
          {contactItems.map((item, idx) => (
            <div
              key={idx}
              style={contactItemStyle}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, contactItemHover);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, contactItemStyle);
              }}
            >
              <div style={iconWrapperStyle}>{item.icon}</div>
              <div style={textStyle}>
                <span style={labelStyle}>{item.label}</span>
                <span style={valueStyle}>{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUsInfo;
