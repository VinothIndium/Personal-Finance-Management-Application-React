import styled from 'styled-components';

const Card = styled.div`
  background-color: ${props => props.$bgColor};
  color: white;
  padding: 1rem;
  border-radius: 8px;
  flex: 1;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 150px;
  text-align: center;

  h2 {
    margin: 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0.5rem 0 0;
    font-size: 1.2rem;
  }
`;

export default Card;