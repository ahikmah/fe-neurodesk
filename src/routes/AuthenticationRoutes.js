import { lazy } from 'react';

// project imports
import GuestGuard from 'utils/route-guard/GuestGuard';
import Loadable from 'ui-components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const AuthLogin = Loadable(lazy(() => import('views/Pages/Authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('views/Pages/Authentication/Register')));
const AuthRegisterSA = Loadable(lazy(() => import('views/Pages/Authentication/RegisterSA')));
const SuccessPage = Loadable(lazy(() => import('views/Pages/Authentication/Register/SuccessPage')));
const AuthActivation = Loadable(lazy(() => import('views/Pages/Authentication/Activation')));
// const ForgotPassword = Loadable(lazy(() => import('views/Pages/Authentication/ForgotPassword')));
// const SuccessPageRequestReset = Loadable(lazy(() => import('views/Pages/Authentication/ForgotPassword/SuccessPage')));
// const SetPassword = Loadable(lazy(() => import('views/Pages/Authentication/SetPassword')));
// const SetPasswordSuccess = Loadable(lazy(() => import('views/Pages/Authentication/SetPassword/SuccessPage')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: (
    <GuestGuard>
      <MinimalLayout />
    </GuestGuard>
  ),
  children: [
    {
      path: '/',
      element: <AuthLogin />,
    },
    {
      path: '/login',
      element: <AuthLogin />,
    },
    {
      path: '/register',
      element: <AuthRegister />,
    },
    {
      path: '/register-admin',
      element: <AuthRegisterSA />,
    },
    {
      path: '/register/success',
      element: <SuccessPage />,
    },
    {
      path: '/activation',
      element: <AuthActivation />,
    },
    // {
    //   path: '/forgot-password',
    //   element: <ForgotPassword />,
    // },
    // {
    //   path: '/reset-password-request/success',
    //   element: <SuccessPageRequestReset />,
    // },
    // {
    //   path: '/reset-password',
    //   element: <SetPassword />,
    // },
    // {
    //   path: '/reset-password/success',
    //   element: <SetPasswordSuccess />,
    // },
  ],
};

export default AuthenticationRoutes;
