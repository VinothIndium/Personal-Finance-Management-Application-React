import styled from "styled-components";

const Link = styled.a`
  text-align: right;
  margin-top: 10px;
  color: blue;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default Link;