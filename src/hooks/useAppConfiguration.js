import { useState } from 'react';

const useAppConfiguration = () => {
    const [appConfiguration] = useState({});
    return { appConfiguration };
};

export default useAppConfiguration;
