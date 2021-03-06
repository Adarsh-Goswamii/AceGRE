import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import theme from "./styles/theme";
import { BrowserRouter as Router } from "react-router-dom";
import AppContainer from "./layout/AppContainer";
import store from "./store/index";
import "./styles/main.scss";

const Index = () => {
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <AppContainer />
        </ThemeProvider>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
