import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function AddCar(props) {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({
    brand: '',
    model: '',
    color: '', 
    year: '',  
    fuel: '',  
    price: '',
    registerNumber: ''
  });

  //  modal form 열기
  const handleClickOpen = () => {
    setOpen(true);
  };
    
  // modal form 닫기 
  const handleClose = () => {
    setOpen(false);
  };

  // 자동차를 저장하고 모달 폼을  닫음
const handleSave = () => {
  props.addCar(car);
  setCar({
    brand: '',
    model: '',
    color: '',
    year: '',
    fuel: '',
    price: '',
    registerNumber: ''
  });
  handleClose();
}

  const handleChange = (event) => {
    setCar({...car, [event.target.name]: event.target.value});
  }
  
  return(
    <div>
      <Button variant='contained' onClick={handleClickOpen}>New Car</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New car</DialogTitle>
        <DialogContent>
        <Stack spacing={4} mt={1} width={400}>
            <TextField label="Brand" name="brand" autoFocus
              variant="standard" value={car.brand} 
              onChange={handleChange}/>
            <TextField label="Model" name="model" 
              variant="standard" value={car.model} 
              onChange={handleChange}/>
            <TextField label="Color" name="color" 
              variant="standard" value={car.color} 
              onChange={handleChange}/>
            <TextField label="Year" name="year" 
              variant="standard" value={car.year} 
              onChange={handleChange}/>
            <TextField label="Price" name="price" 
              variant="standard" value={car.price} 
              onChange={handleChange}/>
            <TextField label="RegisterNumber" name="registerNumber" 
              variant="standard" value={car.registerNumber} 
              onChange={handleChange}/>
          </Stack>
        </DialogContent>
        <DialogActions>
           <Button onClick={handleClose}>Cancel</Button>
           <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>            
    </div>
  );  
}

export default AddCar;