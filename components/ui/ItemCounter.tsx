import { FC } from 'react';
import { Box } from '@mui/system';

import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';


interface Props {

}

export const ItemCounter: FC<Props> = () => {
    return (
        <Box display='flex' alignItems='center'>
            <IconButton>
                <RemoveCircleOutline />
            </IconButton>
            <Typography sx={{ width: 40, textAlign: 'center' }}>1</Typography>
            <IconButton>
                <AddCircleOutline />
            </IconButton>

        </Box>
    )
}
