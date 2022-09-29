import { useRoutes } from 'react-router-dom';

// routes
import { ErrorRoutes } from './PublicRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import SuperAdminRoutes from './SuperAdminRoutes';
// ==============================|| ROUTING RENDER ||============================== //

export default function NeruRoutes() {
  return useRoutes([AuthenticationRoutes, ErrorRoutes, SuperAdminRoutes]);
}
