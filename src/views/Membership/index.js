import { Chip } from '@mui/material'
import { useSelector } from 'react-redux'

const Membership = () => {
	const account = useSelector((state) => state.account)

    const getName = () => {
        const plan = account?.subscription?.subscriptionId
        return plan ? 'Unlimited Plan 👑' : 'Get Unlimited Access'
    }

	return (
	    <Chip   label={getName()} 
                size="small" 
                color="primary" 
                variant="outlined" 
                className="upgrade"
                onClick={() => {
                    window.location.href = 'https://www.webstudio.so/plans-pricing'
                }}
        />				
	);
};

export default Membership;
