import { useContext, useState } from "react";
import NextLink from 'next/link';

import { useRouter } from "next/router";
import { UiContext } from "../../context";

import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
// import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { AppBar, Toolbar, Typography, Link, Box, Button, IconButton, Badge, Input, InputAdornment, } from "@mui/material"




export const Navbar = () => {

    const { asPath, push } = useRouter();
    const { toggleSideMenu } = useContext(UiContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false)

    // const router = useRouter();

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;

        navigateTo(`/search/${searchTerm}`)
    }

    const navigateTo = (url: string) => {
        toggleSideMenu();
        push(url);
    }

    return (
        <AppBar>
            <Toolbar>

                <NextLink href="/" passHref>
                    <Link display='flex' alignItems='center' justifyContent='center'>
                        <Typography  variant='h6' className="fadeIn">Mundo Camper|</Typography>
                        <Typography sx={{ p: .4 }} className="fadeIn">Shop</Typography>
                    </Link>
                </NextLink>

                {/* TODO FLEX */}

                <Box flex={1} />

                <Box className="fadeIn" sx={{ display: isSearchVisible ? 'none' : { xs: 'none', md: 'block' } }}>

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

                </Box>

                <Box flex={1} />


                {/* PANTALLAS GRANDES */}

                {
                    isSearchVisible
                        ? (
                            <Input
                                sx={{ display: { xs: 'none', md: 'flex' } }}
                                className="fadeIn"
                                autoFocus
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyUp={(e) => e.key === 'Enter' && onSearchTerm()}
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end" >
                                        <IconButton onClick={() => setIsSearchVisible(false)} >
                                            <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        )
                        : (
                            <IconButton
                                className="fadeIn"
                                sx={{ display: { xs: 'none', md: 'flex' } }}
                                onClick={() => setIsSearchVisible(true)}>

                                <SearchOutlined />
                            </IconButton>
                        )
                }


                {/* PANTALLAS PEQUEÑAS */}
                <IconButton 
                    sx={{ display: { sm: 'block', md: 'none' } }}
                    onClick={toggleSideMenu}
                >
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
