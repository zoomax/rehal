import {
  BrowserRouter,
  Redirect,
  Route,
  Router,
  Switch,
} from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Routes } from "./routes/routes";
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          {Routes.map((route, index) => {
            return route.protected ? (
              <ProtectedRoute
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ) : (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            );
          })}
          <Route
            path='**'
            render={() => {
              return <Redirect path='/dashboard' />;
            }}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
