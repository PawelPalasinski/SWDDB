import styled from "styled-components";

const StyledCardImage = styled.img`
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
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
