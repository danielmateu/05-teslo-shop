import { useContext, useState } from "react";
import NextLink from 'next/link';

import { UiContext } from "../../context";

import { AppBar, Toolbar, Typography, Link, Box, Button } from "@mui/material"


export const AdminNavbar = () => {


    const { toggleSideMenu } = useContext(UiContext);

    return (
        <AppBar>
            <Toolbar>

                <NextLink href="/" passHref>
                    <Link display='flex' alignItems='center' justifyContent='center'>
                        <Typography  variant='h6' className="fadeIn">Solid Camper|</Typography>
                        <Typography sx={{ p: .4 }} className="fadeIn">Shop</Typography>
                    </Link>
                </NextLink>

                {/* TODO FLEX */}

                <Box flex={1} />

                <Button onClick={toggleSideMenu}>
                    Menú
                    {/* <MenuOutlinedIcon /> */}
                </Button>

                {/* TODO FLEX */}

            </Toolbar>
        </AppBar>
    )
}
