import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcon from '@mui/icons-material/Add';
import RemoveFromQueueIcon from '@mui/icons-material/RemoveFromQueue';
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import { Box } from '@mui/system';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        top: theme.spacing(2),
        left: theme.spacing(2),
    },
}));



const SpeedDialMenu = () => {
    let [isListsCollapsed, setCollapsedStatus] = useState()
    return (
        <Box>
            <StyledSpeedDial
                sx={{ position: 'absolute', bottom: 16 }}
                ariaLabel="Actions"
                icon={<SpeedDialIcon />}
                direction={'right'}
            >

                <SpeedDialAction icon={<AddIcon />} tooltipTitle={'Add new list'} />

                {isListsCollapsed
                    ? <SpeedDialAction icon={<InstallDesktopIcon />} tooltipTitle={'Uncollapse all'} />
                    : <SpeedDialAction icon={<RemoveFromQueueIcon />} tooltipTitle={'Collapse all'} />
                }

            </StyledSpeedDial>

        </Box>
    )
}

export default SpeedDialMenu


