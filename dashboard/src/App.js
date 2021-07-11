import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Routes } from "./routes/routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

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
          import {(ToastContainer, toast)} from "react-toastify"; import
          "react-toastify/dist/ReactToastify.css"; toast.configure();
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
