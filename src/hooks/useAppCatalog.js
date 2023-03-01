import { useEffect, useState } from 'react';
// import { useMoralis } from 'react-moralis';

// ==============================|| ELEMENT REFERENCE HOOKS  ||============================== //

const useAppCatalog = () => {
    // const { Moralis, user, isAuthenticated } = useMoralis();
    const [appCatalog, setAppCatalog] = useState([]);

    // const loadApps = async () => {
    //     const Project = Moralis.Object.extend('Project');
    //     const query = new Moralis.Query(Project);
    //     query.equalTo('owner', user.get('ethAddress'));
    //     query.descending('updatedAt');
    //     const items = await query.find();
    //     setAppCatalog(items);
    // };

    // useEffect(() => {
    //     if (Moralis && isAuthenticated) {
    //         loadApps();
    //     }
    // }, [Moralis, isAuthenticated]);

    return { appCatalog, setAppCatalog };
};

export default useAppCatalog;
