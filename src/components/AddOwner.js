import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Icon from '@mdi/react';
import { mdiAccountPlus } from '@mdi/js';

function AddOwner(props) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: ''
      
    })
    const [owner, setOwner] = useState({
        clientname: '',
        gender: '',
        phonenumber: '',
        address:''
    });

      //  modal form 열기
    const handleClickOpen = () => {
         setOpen(true);
    };

     // modal form 닫기 
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setOwner({...owner, [event.target.name]: event.target.value});
        setCar({...car, [event.target.name]: event.target.value});
    }

    //저장하고 모달 폼을  닫음
    const handleSave = () => {
    props.addOwner(owner);
    props.addcar(car);
    setCar({
        brand: ''
        
    })
    setOwner({
        clientname: '',
        gender: '',
        phonenumber: '',
        address:''
    })
    handleClose();
    }

    return (
        <div>
            <Button variant='contained' onClick={handleClickOpen} size="small">
            <Icon path={mdiAccountPlus} size={1} />
            </Button>
            <Dialog open={open} onClose={handleClose}>
             <DialogTitle>New owner</DialogTitle>
             <DialogContent>
             <Stack spacing={4} mt={1} width={400}>
            <TextField label="clientname" name="clientname" autoFocus
              variant="standard" value={owner.clientname} 
              onChange={handleChange}/>
            <TextField label="gender" name="gender" autoFocus
              variant="standard" value={owner.gender} 
              onChange={handleChange}/>
            <TextField label="phonenumber" name="phonenumber" autoFocus
              variant="standard" value={owner.phonenumber} 
              onChange={handleChange}/>
            <TextField label="Address" name="address" autoFocus
              variant="standard" value={owner.address} 
              onChange={handleChange}/>
            <TextField label="brand" name="brand" autoFocus
              variant="standard" value={car.brand} 
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

export default AddOwner;