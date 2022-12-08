import React, { useEffect } from 'react';
import { Container, Typography, Divider } from '@mui/material';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer, Label } from 'recharts';

export default function Stats({ employees }) {
  const current = new Date().toISOString()
  const COLORS = ['#003f5c', '#7a5195', '#ef5675', '#ffa600']

  const activeEmp = () => { 
    return employees.filter(item => 
      !item.absences.some(i => i.startDate <= current && i.endDate >= current)) 
  }

  const holidayLeaveEmp = () => {
    return employees.filter(item => 
      item.absences.some(i => 
        (i.startDate <= current && i.endDate >= current) && (i.absenceType === 'vacation'))) 
  }

  const sickLeaveEmp = () => { 
    return employees.filter(item =>
      item.absences.some(i => 
        (i.startDate <= current && i.endDate >= current) && (i.absenceType === 'sick'))) 
  }

  const otherLeaveEmp = () => {
     return employees.filter(item =>
      item.absences.some(i =>
        (i.startDate <= current && i.endDate >= current) && (i.absenceType === 'other'))) 
  }

  const data = [
    {name: 'Active', count: activeEmp().length},
    {name: 'On vacation', count: holidayLeaveEmp().length},
    {name: 'Sick leave', count: sickLeaveEmp().length},
    {name: 'Other', count: otherLeaveEmp().length}
  ]

  if(employees.length === 0) return (
    <Container sx={{height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Typography variant='h4'>Add an employee to see statistics</Typography>
    </Container>
  )

  return (
    <>
      <Typography sx={{mt:3, mb:3}} variant='h5'>Current employee statistics</Typography>
      <Divider/>
      <Container>
        <ResponsiveContainer minWidth={250} width="60%" aspect={2}>
            <PieChart>
              <Pie data={data} dataKey="count" innerRadius="60%" outerRadius="80%">
               <Label value={`Together ${employees.length}`} position="center" />
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fillOpacity={1} stroke={COLORS[index % COLORS.length]} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip wrapperStyle={{ outline: "none" }} />
              <Legend iconSize={12} iconType='circle' verticalAlign='middle' align='right' layout='vertical' />
            </PieChart>
        </ResponsiveContainer>
      </Container>
      <Divider sx={{mb:3}} />
    </>
  )
}
