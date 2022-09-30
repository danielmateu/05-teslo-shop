import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
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

                    <NextLink href='category/men' passHref>
                        <Link>
                            <Button>Hombres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='category/women' passHref>
                        <Link>
                            <Button>Mujeres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='category/children' passHref>
                        <Link>
                            <Button>Children</Button>
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

                <Button>Menú</Button>

                {/* TODO FLEX */}

            </Toolbar>
        </AppBar>
    )
}
