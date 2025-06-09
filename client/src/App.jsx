import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  HomeLayout,
  DashboardLayout,
  AddJob,
  AllJobs,
  Admin,
  Error,
  Landing,
  Login,
  Profile,
  Register,
  Stats,
  EditJob,
} from './pages/index';

import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { loader as dashboadLoader } from './pages/DashboardLayout';
import { loader as allJobLoader } from './pages/AllJobs';
import { action as addJobAction } from './pages/AddJob';
import {
  loader as editJobLoader,
  action as editJobAction,
} from './pages/EditJob';
import { action as deleteJobAction } from './pages/DeleteJob';
import { loader as adminLoader } from './pages/Admin';
import { action as ProfileAction } from './pages/Profile';
import { loader as statsLoader } from './pages/Stats';

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'landing',
        element: <Landing />,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'dashboard',
        loader: dashboadLoader,
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsLoader,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: allJobLoader,
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          {
            path: 'delete-job/:id',
            action: deleteJobAction,
          },
          {
            path: 'profile',
            element: <Profile />,
            action: ProfileAction,
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
};

export default App;
