import { Grid, Typography } from "@mui/material"


export const OrderSummary = () => {
    return (
        <Grid container>
            <Grid item  xs = {6}  >
                <Typography>No. Productos</Typography>
            </Grid>
            <Grid item  xs = {6} display="flex" justifyContent = 'flex-end' >
                <Typography>2 items</Typography>
            </Grid>

            <Grid item  xs = {6}>
                <Typography>Subtotal</Typography>
            </Grid>
            <Grid item  xs = {6} display= 'flex' justifyContent= 'end'>
                <Typography>{`€${405.00}`}</Typography>
            </Grid>

            <Grid item  xs = {6}>
                <Typography>Iva (21%)</Typography>
            </Grid>
            <Grid item  xs = {6} display= 'flex' justifyContent= 'end'>
                <Typography>{`€${40.15}`}</Typography>
            </Grid>

            <Grid item  xs = {6} sx={{mt:2}}>
                <Typography variant='subtitle1'>Total</Typography>
            </Grid>
            <Grid item  xs = {6} sx={{mt:2}} display= 'flex' justifyContent= 'end'>
                <Typography>{`€${440.15}`}</Typography>
            </Grid>
        </Grid>
    )
}
