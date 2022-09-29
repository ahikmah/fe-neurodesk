import PropTypes from 'prop-types';
import logo from 'assets/images/logo.png';

function Logo({ width }) {
  return (
    <>
      <img src={logo} alt="NeuroDesk Logo" width={width || 100} />
    </>
  );
}
Logo.propTypes = {
  width: PropTypes.number,
};

export default Logo;
