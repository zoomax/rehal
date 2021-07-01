import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Routes } from "./routes/routes";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {Routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
