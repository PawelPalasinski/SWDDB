import styled from "styled-components";

const StyledCardImage = styled.img`
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const CardImage = ({ src, alt }) => {
  return <StyledCardImage src={src} alt={alt} />;
};

export default CardImage;
