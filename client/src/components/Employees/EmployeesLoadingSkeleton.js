import React from 'react'
import { Skeleton, Container } from '@mui/material'

export default function EmployeesLoadingSkeleton() {
  return (
    <>
      <Container sx={{
          display:'flex',
          justifyContent:'space-between'
        }}>
        <Skeleton variant='rounded' width='35%' height={50}/>
        <Skeleton variant='rounded' width='20%' height={50}/>
      </Container>
      <Container sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'center',
        mt: 2
      }}>
        <Skeleton variant='rounded' width='100%' height={50} sx={{mb: 1.5 , bgcolor:'grey.400'}}/>
        
        {[...Array(10)].map((_,index) => (
          <Skeleton key={index} variant='rounded' width='100%' height={50} sx={{mt:1}}/>
        ))}
      </Container>
    </>
  )
}
