import React , { useState } from 'react';
import { AppBar , Typography , Button , Container , Toolbar , Box , Menu , MenuItem , makeStyles, IconButton } from '@material-ui/core';
import FunctionsRoundedIcon from '@material-ui/icons/FunctionsRounded';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom'

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
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const classes = useStyle();

  return <AppBar position = 'static' color = 'transparent' className = {classes.appbar }>
      <Container maxWidth = 'xl'>
          <Toolbar disableGutters>
            <Box sx = {{display : {
                xs : 'flex',
                md : 'none'
            }}}>
                <IconButton size = 'medium' onClick = {handleOpenNavMenu} color  = 'inherit'>
                    <MenuIcon color = 'inherit'/>
                </IconButton>
                <Menu 
                open = {Boolean(anchorElNav)} 
                anchorEl={anchorElNav} 
                className = {classes.menu} 
                onClose = {handleCloseNavMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
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
                </Menu>
            </Box>
            <FunctionsRoundedIcon fontSize='large' className = {classes.logoHeading} />
            <Typography variant='h5' noWrap className={classes.heading}> 10X.Parties</Typography>
            <Box sx = {{display : { xs : 'none', md : 'flex'} , flexGrow : 2 , marginLeft : '30px'}}>
                <Button key = 'parties' component = {Link} to='/' onClick={()=>(console.log('parties'))}> 
                    <Typography variant='subtitle1' className= {classes.white}> Party </Typography>
                </Button>
                <Button key = 'create' component = {Link} to='/create' onClick={()=>(console.log('create'))}> 
                    <Typography variant='subtitle1' className= {classes.white}> Create Party </Typography>
                </Button>
            </Box>
          </Toolbar>
      </Container>
  </AppBar>
}

export default Navbar;
