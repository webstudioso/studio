/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { UPDATE_APP } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Grid, Typography, Paper, Tooltip, Chip} from '@mui/material';
import UserCountCard from 'ui-component/cards/UserCountCard';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import LocalGroceryStoreTwoToneIcon from '@mui/icons-material/LocalGroceryStoreTwoTone';
import LocalActivityTwoToneIcon from '@mui/icons-material/LocalActivityTwoTone';
import templateNftMarketplace from 'assets/images/marketplace.jpeg';
import SubCard from 'ui-component/cards/SubCard';

const UseCase = ({ onChange }) => {
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);
    const theme = useTheme();
    const [selected, setSelected] = useState(appState.type);

    const projectInfo = `
    Webstudio lets you launch Web3 apps from templates.
    You can include additional functionalities later on but your core use case will define the main layout.
    It cannot be changed later.
    `;

    const supported = [
        {id:'marketplace', label:"Marketplace", ready: true, tooltip: 
        `White Label NFT Marketplace.
        From tokenized artwork to audio and ingame items, you name it, there is one template that will fit your needs. Launch a beautiful, custom branded NFT marketplace you control in seconds.`},
        {id:'tokenizer', label:"NFT Creator", ready: true, tooltip: 
        `Tokenize and Create NFTs.
        Tokenize anything and create NFTs for any EVM supported blockchain, setup royalties, properties, attributes and more.`},
        {id:'membership', label:"Memberships", ready: false},
        {id:'bookings', label:"Event Bookings", ready: false},
        {id:'blog', label:"Blog", ready: false},
        {id:'qrpayments', label:"QR Payments", ready: false},
        {id:'tickets', label:"Ticket Sales", ready: false},
        {id:'landing', label:"Landing Page", ready: false},
        {id:'messaging', label:"Messaging", ready: false}
    ];

    useEffect(() => {
        if(selected) onChange(selected);
    }, [selected]);

    const renderSupported = () => {
        const list = [];
        supported.forEach((item, index) => {
            list.push(
                <Grid item>
                    <Tooltip title={item.tooltip} key={index}>
                        <Chip sx={{minWidth: 100}} disabled={!item.ready} color={selected===item.id ? 'primary': 'default'} label={item.label} variant={selected===item.id? 'contained': 'outlined'} size="large" onClick={() => setSelected(item.id)} />
                    </Tooltip>
                </Grid>
            )
        })
        return list;
    }
    return (
        <Grid container direction="row" justifyContent="left" alignItems="left" spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h1" fontWeight="regular" sx={{ mb: 5 }}>
                    What template best describes<br/>your 
                    <Tooltip title={projectInfo}>
                        <span className="project-keyword">use case<HelpOutlineIcon /></span>
                    </Tooltip>
                </Typography>
            </Grid>
            <Grid container spacing={1}>
                {renderSupported()}
            </Grid>
        </Grid>
    );
};

export default UseCase;
