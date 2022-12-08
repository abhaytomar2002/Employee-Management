import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Container, Toolbar, Button, Avatar, Tooltip, IconButton, Stack, Tabs, Tab, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useDispatch } from 'react-redux';

export default function Navbar({ setNotify }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const [time, setTime] = useState(new Date())
  const dispatch = useDispatch()
  let navigate = useNavigate()
  let location = useLocation()

  const logout = () => {
    dispatch({ type: 'LOG_OUT' })
    dispatch({ type: 'DESTROY_SESSION'})
    navigate("/auth", { replace: true })
    setNotify({ isOpen: true, message: "You have been logged out of the profile", type: 'error' })
    setUser(null)
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
    setTime(new Date())
      if(time.toISOString() > user?.expDate) {
        window.location.reload(false)
        logout()
      }
  }, [location])

  return (
    <AppBar color='primary' position="static">
      <Toolbar sx={{display: 'flex', justifyContent:'space-between'}}>
        <Container sx={{m:0, display: 'flex', flexDirection:"row"}}>
          <IconButton color='secondary' size='large' edge="start" component={Link}  to='/'>
            <HomeRoundedIcon />
          </IconButton>
        {user && (
          <Stack sx={{ml:3}} direction='row' spacing={2}>
            <Button variant='text' color={location.pathname === '/' || location.pathname.includes("/employees") ? "white" : "lightgray"} component={Link} to='/'>
              <Typography variant='body2' sx={location.pathname === '/' || location.pathname.includes("/employees") ? {fontWeight: 'bold'} : null}>
                Employees
              </Typography>
            </Button>
            <Button variant='text' color={location.pathname === '/schedules' ? "white" : "lightgray"} component={Link} to='/schedules'>
              <Typography variant='body2' sx={location.pathname === '/schedules' ? {fontWeight: 'bold'} : null}>
                Schedules
              </Typography>
            </Button>
            <Button variant='text' color={location.pathname === '/positions' ? "white" : "lightgray"} component={Link} to='/positions'>
              <Typography variant='body2' sx={location.pathname === '/positions' ? {fontWeight: 'bold'} : null}>
                Positions
              </Typography>
            </Button>
          </Stack>
        )}
        </Container>
        {user && (
          <Stack direction='row' spacing={2}>
            <Tooltip title={user.result.name}>
              <Avatar>
                {user.result.name.charAt(0)}
              </Avatar>
            </Tooltip>
            <IconButton color="secondary" onClick={logout}><LogoutIcon /></IconButton>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  )
}
