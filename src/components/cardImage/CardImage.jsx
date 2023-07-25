import React, { useState } from "react";
import styled from "styled-components";

import cardBackImage from "../../assets/images/cardback.jpg";

const StyledCardImage = styled.img`
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 600px) {
    width: 100%;
    max-width: 400px;
  }

  @media (min-width: 600px) {
    max-height: 200px;
  }
`;

const CardImage = ({ src, alt, position }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const isHorizontal = () => {
    const img = new Image();
    img.src = src;
    return img.width > img.height;
  };

  return (
    <>
      {!imageLoaded && (
        <StyledCardImage
          src={cardBackImage}
          alt="card back"
          isHorizontal={isHorizontal()}
        />
      )}

      <StyledCardImage
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        isHorizontal={isHorizontal()}
        show={imageLoaded}
      />
    </>
  );
};

export default CardImage;
