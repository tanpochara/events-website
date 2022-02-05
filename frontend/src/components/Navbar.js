import React , { useEffect, useState , useRef } from 'react';
import { AppBar , Typography , Button , Container , Toolbar , Box , Avatar ,  Menu , MenuItem , makeStyles, IconButton } from '@material-ui/core';
import FunctionsRoundedIcon from '@material-ui/icons/FunctionsRounded';
import MenuIcon from '@material-ui/icons/Menu';
import { Link,  useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode'

const useStyle = makeStyles({
    appbar : {
        display: 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginBottom : '10px',
        color : 'white'
    },
    white : {
        color : 'white',
      },
    heading : {
        display : 'flex',
        mr : 2,
        color : 'white',
    },
    logoHeading : {
        display : 'flex'
    },
    menu : {
        display : {
            xs : 'box',
            md : 'none'
        }
    },
});

function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [user , setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyle();
    let email = useRef('')
  
    const logout = () => {
        dispatch({type: 'LOGOUT'});
        navigate('/login');
        setUser(null);
    }

    useEffect(() => {
        const userE = JSON.parse(localStorage.getItem('profile'));
        const token = userE?.token;
        if(token) {
            const decodedToken = decode(token)
            email.current = decodedToken.email;
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                dispatch({type : 'LOGOUT'});
                navigate('/login');
                setUser(null);
            };
        } else {
            navigate('/login');
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [dispatch, navigate]);
    
    const handleOpenNavMenu = (e) => {
      setAnchorElNav(e.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };


  return <AppBar position = 'static' color = 'transparent' className = {classes.appbar }>
            <Container maxWidth = 'xl'>
                <Toolbar disableGutters>
                {user?.token && ( 
                    <Box sx = {{display : { xs : 'flex', md : 'none' }}}>
                        <IconButton size = 'medium' onClick = {handleOpenNavMenu} color  = 'inherit'>
                            <MenuIcon color = 'inherit'/>
                        </IconButton>
                        <Menu 
                        open = {Boolean(anchorElNav)} 
                        anchorEl={anchorElNav} 
                        className = {classes.menu} 
                        onClose = {handleCloseNavMenu}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}>
                            <MenuItem key = 'parties' component = {Link} to ='/' onClick = {handleCloseNavMenu}>
                                <Typography textalign="center">Parties</Typography>
                            </MenuItem>
                            <MenuItem key = 'create' component = {Link} to = '/create' onClick = {handleCloseNavMenu}>
                                <Typography textalign="center">Create Party</Typography>
                            </MenuItem>
                            <MenuItem key = 'logout' onClick = {logout}>
                                <Typography textalign="center">logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>)}
                    <FunctionsRoundedIcon fontSize='large' className = {classes.logoHeading} />
                    <Typography variant='h5' noWrap className={classes.heading}> 10X.Parties</Typography>
                    { user?.token && (
                        <>
                            <Box sx = {{display : { xs : 'none', md : 'flex'} , flexGrow : 2 , marginLeft : '30px'}}>
                                <Button key = 'parties' onClick={() => {navigate('/')}}> 
                                    <Typography variant='subtitle1' className= {classes.white}> Party </Typography>
                                </Button>
                                <Button key = 'create' onClick={() => {navigate('/create')}}> 
                                    <Typography variant='subtitle1' className= {classes.white}> Create Party </Typography>
                                </Button>
                            </Box>
                            <Box sx = {{display : {xs : 'none' , md :'flex'}}}>
                                <Avatar> {email.current.charAt(0).toUpperCase()} </Avatar>
                                <Button onClick={logout} variant='outlined' className = {classes.white}> log out </Button>
                            </Box>    
                    </>)}
                </Toolbar>
            </Container>
        </AppBar>
}

export default Navbar;
