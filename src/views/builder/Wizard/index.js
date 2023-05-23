import { forwardRef, useEffect, useState } from 'react'
import { DialogActions, Dialog, Toolbar, AppBar, Typography, Slide, Button, Stepper, Step, StepLabel, Box } from '@mui/material'
import InfoButton from '../InfoButton'
import Templates from '../../templates/List'
import { FormattedMessage, useIntl } from 'react-intl'
import SmartContracts from './SmartContracts'
import { element } from 'prop-types'
import { useSelector } from 'react-redux'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Wizard = ({ editor }) => {
    const intl = useIntl()
    const [open, setOpen] = useState(false)
    const [activeStep, setActiveStep] = useState(0)
    const [item, setItem] = useState()

    const wizard = useSelector((state) => state.wizard)

    const steps = [
        'Pick Contract',
        'Pick Function',
        'Pick Network',
    ];


    const handleClose = () => {
        setOpen(false)
    }

    const handleDrop = (event, element) => {
        const isSmartContract = element.attributes.contract && element.attributes.abi
        const hasWizard = element.attributes.hasOwnProperty('payload')
        if (isSmartContract) {
            
            console.log(element)
            setOpen(true)
            setItem(element)
        } else if (hasWizard){ 
            editor.select(element)
            editor.runCommand('tlb-settings', { element })
        }
    }

    useEffect(() => {
        editor.on("canvas:drop", handleDrop)
    }, [editor])

    const previousButton = (
        <Button disabled={activeStep === 0}
                onClick={() => {
                    const previous = activeStep - 1;
                    setActiveStep(previous)
                }}
        >
            Previous
        </Button>
    )

    const nextButton = (
        <Button variant="outlined" 
                // disabled={activeStep < steps.length -1}
                onClick={() => {
                    if (activeStep === steps.length-1) {
                        const payload = {
                            contractAddress: wizard.contractAddress,
                            network: wizard.network,
                            configuration: wizard.configuration
                        }
                        console.log(payload)
                        item.attributes.payload = JSON.stringify(payload)
                       console.log(item)
                       handleClose()
                    //    co
                    } else {
                        const next = activeStep + 1;
                        setActiveStep(next)
                    }
                }}
        >
            Finish
        </Button>
    )

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            maxWidth={1200}
            // fullScreen
            sx={{
                "& .MuiPaper-root": {
                    padding: "0px"
                }
            }}
        >
            <AppBar elevation={0} sx={{ position: 'relative', background: "#fff", borderTop: '5px solid #6366F1' }}>
                <Toolbar>
                    <Typography variant="h4" color="black" fontWeight="bolder">
                        <FormattedMessage id="template_page.title" />
                        <InfoButton tooltip="template_page.title_tooltip" />
                    </Typography>
                    <Button variant="outlined" elevation={0} sx={{ marginLeft: "auto" }} onClick={handleClose}>
                        <FormattedMessage id="template_page.pick_later" />
                    </Button>

                </Toolbar>

                <Stepper activeStep={activeStep}  sx={{ margin: '0 auto', width: '100%', px: 2, pb:2 }}>
                    {steps.map((label) => (
                    <Step key={label} onClick={(step) => { console.log(step); setActiveStep(step.detail);}}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
            </AppBar>
            <Box sx={{ width: 900 }}>
                <SmartContracts activeStep={activeStep} changeStep={(step) => setActiveStep(step)} intl={intl} />
            </Box>
            <DialogActions sx={{ p: 2 }}>
                { previousButton }
                { nextButton }
            </DialogActions>
        </Dialog>
    )
}

export default Wizard
