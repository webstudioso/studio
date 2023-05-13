import { Chip } from '@mui/material'
import { getSubscriptionPlan } from 'utils/subscription'

const Membership = () => {

    const getName = () => {
        const plan = getSubscriptionPlan()
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
