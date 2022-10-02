import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { AppBar, Toolbar, Typography, Link, Box, Button, IconButton, Badge } from "@mui/material"

import NextLink from 'next/link';


export const Navbar = () => {
    return (
        <AppBar>
            <Toolbar>

                <NextLink href="/" passHref>
                    <Link display='flex' alignItems='center'>
                        <Typography variant='h6'>Mundo Camper</Typography>
                        <Typography sx={{ ml: .5 }}>| Shop</Typography>
                    </Link>
                </NextLink>

                {/* TODO FLEX */}

                <Box flex={1} />

                <Box sx= {{display: {xs: 'none', md: 'block'}}}>

                    <NextLink href='/category/men' passHref>
                        <Link>
                            <Button>hombres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/women' passHref>
                        <Link>
                            <Button>mujeres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/kids' passHref>
                        <Link>
                            <Button>niñ@s</Button>
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
                            <Badge badgeContent = {2} color= 'secondary' >
                                <ShoppingCartOutlined/>
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <Button>
                    <MenuOutlinedIcon/>
                </Button>

                {/* TODO FLEX */}

            </Toolbar>
        </AppBar>
    )
}
