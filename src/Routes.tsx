/* eslint-disable react/no-array-index-key */
import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import DashboardLayout from "layouts/DashboardLayout/index.jsx";
import MainLayout from "layouts/MainLayout/index.jsx";
import HomeView from "views/pages/HomeView/index.jsx";
import LoadingScreen from "components/LoadingScreen";
import AuthGuard from "components/AuthGuard";

const routesConfig = [
  {
    exact: true,
    path: "/",
    component: () => <Redirect to="/home" />,
  },
  {
    exact: true,
    path: "/404",
    component: React.lazy(() => import("views/pages/Error404View.jsx")),
  },
  {
    exact: true,
    path: "/login",
    component: React.lazy(() => import("views/auth/LoginView")),
  },
  {
    exact: true,
    path: "/confirm_email/:confirmationToken",
    component: React.lazy(() => import("views/pages/EmailVerifiedView.jsx")),
  },
  {
    exact: true,
    path: "/reset_password/:resetToken",
    component: React.lazy(() => import("views/pages/PasswordResetView.jsx")),
  },
  {
    exact: true,
    path: "/register",
    component: React.lazy(() => import("views/auth/RegisterView")),
  },
  {
    path: "/app",
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: "/app",
        component: () => <Redirect to="/app/leaderboard" />,
      },
      {
        exact: true,
        path: "/app/account",
        component: React.lazy(() => import("views/pages/AccountView")),
      },
      {
        exact: true,
        path: ["/app/contest", "/app/contest/:contestId"],
        component: React.lazy(() => import("views/Contest")),
      },
      {
        exact: true,
        path: "/app/leaderboard",
        component: React.lazy(() => import("views/LeaderBoard")),
      },
      {
        exact: true,
        path: "/app/livecontest",
        component: React.lazy(() =>
          import("views/pages/UnderConstruction.jsx")
        ),
      },
      {
        exact: true,
        path: "/app/errors/404",
        component: React.lazy(() => import("views/pages/Error404View.jsx")),
      },
      {
        exact: true,
        path: "/app/welcome",
        component: React.lazy(() => import("views/pages/WelcomeView.jsx")),
      },
    ],
  },
  {
    path: "*",
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: "/home",
        component: HomeView,
      },
      {
        component: () => <Redirect to="/404" />,
      },
    ],
  },
];

const renderRoutes = (routes) =>
  routes ? (
    <React.Suspense fallback={<LoadingScreen />}>
      <Switch>
        {routes.map((route, i) => {
          const Guard = route.guard || React.Fragment;
          const Layout = route.layout || React.Fragment;
          const Component = route.component;

          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      renderRoutes(route.routes)
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </React.Suspense>
  ) : null;

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
