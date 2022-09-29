import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';

// ==============================|| MEMBER GUARD ||============================== //

/**
 * Guard for student routes
 * @param {PropTypes.node} children children element/node
 */

const StudentGuard = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      if (!['03'].includes(user.role)) {
        navigate('/forbidden', { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, navigate]);

  return children;
};

StudentGuard.propTypes = {
  children: PropTypes.node,
};

export default StudentGuard;
