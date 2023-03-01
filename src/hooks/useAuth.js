import { useContext } from 'react';

// auth provider
import FirebaseContext from 'contexts/FirebaseContext';
// import JWTContext from 'contexts/JWTContext';
// import Auth0Context from 'contexts/Auth0Context';

// ==============================|| AUTH HOOKS ||============================== //

const useAuth = () => {
    const context = useContext(FirebaseContext);

    // if (!context) throw new Error('context must be use inside provider');

    return context;
};

export default useAuth;
