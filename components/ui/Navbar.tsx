import { useContext } from "react";
import NextLink from 'next/link';

import { useRouter } from "next/router";
import { UiContext } from "../../context";

import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
// import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { AppBar, Toolbar, Typography, Link, Box, Button, IconButton, Badge } from "@mui/material"



export const Navbar = () => {

    const {asPath} = useRouter();

    const {toggleSideMenu} = useContext(UiContext)

    return (
        <AppBar>
            <Toolbar>

                <NextLink href="/" passHref>
                    <Link display='flex' alignItems='center' justifyContent='center'>
                        <Typography variant='h6'>Mundo Camper</Typography>
                        <Typography sx={{ ml: .5 }}>| Shop</Typography>
                    </Link>
                </NextLink>

                {/* TODO FLEX */}

                <Box flex={1} />

                <Box className="fadeIn" sx={{ display: { xs: 'none', md: 'block' } }}>

                    <NextLink href='/category/men' passHref >
                        <Link >
                            <Button color={asPath === '/category/men' ? 'secondary' : 'info'}>hombres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/women' passHref >
                        <Link>
                            <Button color={asPath === '/category/women' ? 'secondary' : 'info'}>mujeres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/kids' passHref >
                        <Link>
                            <Button color={asPath === '/category/kids' ? 'secondary' : 'info'}>niñ@s</Button>
                        </Link>
                    </NextLink>
                    {/* <NextLink href='category/interiores' passHref>
                        <Link>
                            <Button>interiores</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='category/esteriores' passHref>
                        <Link>
                            <Button>exteriores</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='category/muebles-custom' passHref>
                        <Link>
                            <Button>muebles a medida</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='category/recambios' passHref>
                        <Link>
                            <Button>recambios</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='category/productos-quimicos' passHref>
                        <Link>
                            <Button>productos químicos</Button>
                        </Link>
                    </NextLink> */}

                </Box>

                <Box flex={1} />

                <IconButton>
                    <SearchOutlined />
                </IconButton>

                <NextLink href='/cart' passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={2} color='secondary' >
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <Button onClick={toggleSideMenu}>
                    Menú
                    {/* <MenuOutlinedIcon /> */}
                </Button>

                {/* TODO FLEX */}

            </Toolbar>
        </AppBar>
    )
}
