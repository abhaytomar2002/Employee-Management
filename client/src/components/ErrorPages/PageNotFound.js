import { Container, Typography } from '@mui/material';
import React from 'react';

export default function PageNotFound() {
  return (
    <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%'}}>
        <Typography variant='h1' sx={{mt: 20, fontWeight: 'bold'}}>404</Typography>
        <Typography variant='h4'>No result found!</Typography>
    </Container>
  )
}