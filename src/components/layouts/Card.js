import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Typography from "@mui/material"


const CardStyle = styled.div`
  background: ${(props) => props.bg || "#FFFFFF"};
  margin-top: 40px;
  max-width: 475px;
  color: ${(props) => props.color || "#442ED0"};
  font-size: ${(props) => props.fontSize || "16px"};
  font-family: ${(props) => props.fontFamily || "semi"}, sans-serif;
  height: ${(props) => props.h || "481px"};
  border-radius: 10px;
  box-shadow: 0px 5px 19px rgba(13, 2, 78, 0.08);
   @media (max-width:600px): {
       width: 50%;
       background:yellow

      },
`;

export const Card = ({ title, width, children }) => {
  return (
    <CardStyle width={width} className="cursor-pointer">
      <div className="bg-gray-800 border-blue-300 border-b-2 pr-4">
        <h6 color="#2D2F39" variant="h1">
          {title}
        </h6>
      </div>
      <div>{children}</div>
    </CardStyle>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  width: PropTypes.width,
  children: PropTypes.children,
  description: PropTypes.description,
  className: PropTypes.className,
};
