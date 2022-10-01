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

                <Box sx= {{display: {xs: 'none', lg: 'block'}}}>

                    <NextLink href='category/agua' passHref>
                        <Link>
                            <Button>Agua</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='category/electricidad' passHref>
                        <Link>
                            <Button>Electricidad</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='category/gas' passHref>
                        <Link>
                            <Button>Gas</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='category/interiores' passHref>
                        <Link>
                            <Button>Interior</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='category/esteriores' passHref>
                        <Link>
                            <Button>Exterior</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='category/muebles-custom' passHref>
                        <Link>
                            <Button>Muebles a medida</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='category/recambios' passHref>
                        <Link>
                            <Button>Recambios</Button>
                        </Link>
                    </NextLink>
                
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
