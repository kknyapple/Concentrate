import React from "react";
import GlobalStyle from "./Style/globalStyle";

import HeaderComponent from "./Components/Header/HeaderComponent";
import MainComponent from "./Components/Main/MainComponent";

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <HeaderComponent />
      <MainComponent />
    </React.Fragment>
  );
}

export default App;
