import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';

// ==============================|| SUPER ADMIN GUARD ||============================== //

/**
 * Guard for admin routes
 * @param {PropTypes.node} children children element/node
 */

const SuperAdminGuard = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      if (user.role !== '01') {
        navigate('/forbidden', { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, navigate]);

  return children;
};

SuperAdminGuard.propTypes = {
  children: PropTypes.node,
};

export default SuperAdminGuard;
