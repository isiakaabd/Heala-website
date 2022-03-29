import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Modals from 'components/Utilities/Modal'
import { useTheme } from '@mui/material/styles'
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp'
import CustomButton from 'components/Utilities/CustomButton'

const Success = ({
  open,
  handleDialogClose,
  title,
  confirmationMsg,
  btnValue,
  onConfirm,
  onCancel,
  ...rest
}) => {
  const theme = useTheme()

  const disableButton = {
    background: theme.palette.primary.main,
    hover: theme.palette.primary.light,
    active: theme.palette.primary.dark,
  }

  return (
    <Modals
      isOpen={open}
      title=""
      rowSpacing={5}
      handleClose={handleDialogClose}
    >
      <Grid item container direction="column" rowSpacing={5} marginTop={2} style={{paddingTop:'0px'}} >
        <Grid item container justifyContent="center" style={{paddingTop:'0px'}}>
          <CheckCircleSharpIcon sx={{ fontSize: '15rem', color: 'green' }} />
        </Grid>
        <Grid item container justifyContent="center">
          <Typography variant="h2">{title}</Typography>
        </Grid>
        <Grid item container justifyContent="center">
          <Typography variant="body1">{confirmationMsg}</Typography>
        </Grid>
        
      </Grid>
    </Modals>
  )
}

Success.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  confirmationMsg: PropTypes.string.isRequired,
  btnValue: PropTypes.string.isRequired,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
}

export default Success
