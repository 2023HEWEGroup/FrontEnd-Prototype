import { createContext, useContext } from 'react';


export const EnvContext = createContext(null);

export const useEnv = () => {
    return useContext(EnvContext);
};

export const EnvProvider = ({ children }) => {

    const siteAssetsPath = process.env.REACT_APP_ASSETS_PATH;
    const backendAccessPath = process.env.REACT_APP_BACKEND_PATH;
    const socketPath = process.env.REACT_APP_SOCKET_PATH;

    const contextValue = {
        siteAssetsPath,
        backendAccessPath,
        socketPath,
    };

    return (
        <EnvContext.Provider value={contextValue}>
            {children}
        </EnvContext.Provider>
    );
};