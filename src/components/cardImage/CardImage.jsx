import styled from "styled-components";

const StyledCardImage = styled.img`
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 600px) {
    width: 90vw;
    max-width: 400px;
    margin-bottom: 20px;
  }

  @media (min-width: 600px) {
    max-height: 200px;
  }
`;

const CardImage = ({ src, alt, position }) => {
  const isHorizontal = () => {
    const img = new Image();
    img.src = src;
    return img.width > img.height;
  };

  return <StyledCardImage src={src} alt={alt} isHorizontal={isHorizontal()} />;
};

export default CardImage;
