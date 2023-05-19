import { Chip } from '@mui/material'
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux'

const Membership = () => {
    const intl = useIntl()
	const account = useSelector((state) => state.account)

    const getName = () => {
        const plan = account?.subscription?.subscriptionId
        return plan ?  intl.formatMessage({ id: 'membership.unlimited' }) : intl.formatMessage({ id: 'membership.free' })
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
