import React from "react";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  color: whitesmoke;
  font-weight: 800;
  font-size: 30px;
`;

const HeaderComponent = () => {
  return <Header>Concentrate</Header>;
};

export default HeaderComponent;
