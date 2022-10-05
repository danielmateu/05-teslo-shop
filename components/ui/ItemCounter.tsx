import { FC } from 'react';
import { Box } from '@mui/system';

import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';


interface Props {
    currentValue: number;
    maxValue: number; //product.inStock
    updateQuantity: (newValue: number) => void;
}

export const ItemCounter: FC<Props> = ({ currentValue, maxValue, updateQuantity }) => {

    const addOrRemove = (value: number) => {
        if (value === -1) {
            if (currentValue === 1) return;
            return updateQuantity(currentValue - 1);
        }

        if (currentValue >= maxValue) return;

        updateQuantity(currentValue + 1);
    }


    return (
        <Box display='flex' alignItems='center'>
            <IconButton onClick={() => addOrRemove(-1)}>
                <RemoveCircleOutline />
            </IconButton>
            <Typography sx={{ width: 40, textAlign: 'center' }}>{currentValue}</Typography>
            <IconButton onClick={() => addOrRemove(+1)}>
                <AddCircleOutline />
            </IconButton>

        </Box>
    )
}
