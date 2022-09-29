import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';

// ==============================|| GUEST GUARD ||============================== //

/**
 * Guard for teacher routes
 * @param {PropTypes.node} children children element/node
 */

const AdminGuard = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      if (user.role !== '02') {
        navigate('/forbidden', { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, navigate]);

  return children;
};

AdminGuard.propTypes = {
  children: PropTypes.node,
};

export default AdminGuard;
