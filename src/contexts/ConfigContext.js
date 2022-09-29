import PropTypes from 'prop-types';
import { createContext } from 'react';

// project import
import defaultConfig from 'config';
import useLocalStorage from 'hooks/useLocalStorage';

// initial state
const initialState = {
  ...defaultConfig,
  onChangeLocale: () => {},
};

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState);

function ConfigProvider({ children }) {
  const [config, setConfig] = useLocalStorage('neurodesk-config', {
    ...defaultConfig,
    locale: initialState.locale,
  });

  const onChangeLocale = (locale) => {
    setConfig({
      ...config,
      locale,
    });
  };

  return (
    <ConfigContext.Provider
      value={{
        ...config,
        onChangeLocale,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

ConfigProvider.propTypes = {
  children: PropTypes.node,
};

export { ConfigProvider, ConfigContext };
