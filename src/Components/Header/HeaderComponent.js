import React from "react";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //height: 10vh;
  margin-top: 30px;
  color: whitesmoke;
  font-weight: 800;
  font-size: 30px;
`;

const HeaderComponent = () => {
  return <Header>Concentrate</Header>;
};

export default HeaderComponent;
