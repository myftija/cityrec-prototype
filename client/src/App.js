import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Recommender from "./scenes/Recommender";
import Landing from "./scenes/Landing";
import { GlobalStyle, ItupferlGlobalStyle, theme } from './styles';

class App extends Component {
  render() {
    const RenderedInvertedGlobalStyle = props => 
      <GlobalStyle {...props} inverted />;
    const RenderedInvertedHeader = props =>
      <Header {...props} inverted />

    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <React.Fragment>
            <Switch>
              <Route path="/" exact render={RenderedInvertedHeader} />
              <Route path="/itupferl" exact render={RenderedInvertedHeader} />
              <Route path="/" component={Header} />
            </Switch>
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/itupferl" exact component={Landing} />
              <Route path="/rec" component={Recommender} /> 
              <Route path="/itupferl/rec" component={Recommender} /> 
              <Redirect to="/" />
            </Switch>
            <Switch>
              <Route path="/" exact render={RenderedInvertedGlobalStyle} />
              <Route path="/itupferl" exact render={RenderedInvertedGlobalStyle} />
              <Route path="/" component={GlobalStyle} />
              <Route path="/itupferl" component={GlobalStyle} />
            </Switch>
            <Route path="/itupferl" component={ItupferlGlobalStyle} />
          </React.Fragment>
        </ThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
