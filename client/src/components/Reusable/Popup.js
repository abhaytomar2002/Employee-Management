import React from 'react';
import { Dialog, DialogContent, DialogTitle, Typography, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function Popup({ title, children, openPopup, setOpenPopup }) {
  return (
    <Dialog open={openPopup}>
      <DialogTitle>
        <div style={{display:'flex'}}>
          <Typography variant='h6' style={{flexGrow:1}}>
            {title}
          </Typography>
                
          <Button sx={{ width:"20px" }} onClick = {() => { setOpenPopup(false) }}>
            <CloseIcon /> 
          </Button>
        </div>
      </DialogTitle>

      <DialogContent dividers>
        {children}
      </DialogContent>
    </Dialog>
  )
}
