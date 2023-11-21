import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function EditOwner(props) {
    const [open, setOpen] = useState(false);
    const [owner, setOwner] = useState({
        clientname: '',
        gender: '',
        phonenumber: '',
        address:''
    });

    // 모달 폼 열기
  const handleClickOpen = () => {
    setOwner({
        clientname: props.data.row.clientname,
        gender: props.data.row.gender,
        phonenumber: props.data.row.phonenumber,
        address: props.data.row.address
    })
    setOpen(true);
  }

  // 모달 폼 닫기
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setOwner({...owner, 
      [event.target.name]: event.target.value});
  }

  //업데이트하고 모달 폼을 닫음
  const handleSave = () => {
    props.updateOwner(owner, props.data.id);
    handleClose();
  }

    return (
        <div>
     <IconButton onClick={handleClickOpen}>
      <EditIcon color="primary" />
    </IconButton>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit owner</DialogTitle>
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
            <TextField label="address" name="address" autoFocus
              variant="standard" value={owner.address} 
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

export default EditOwner;