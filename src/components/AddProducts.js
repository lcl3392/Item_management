import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function AddProducts(props) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
    품목코드: '',
    품목이름: '',
    규격: '', 
    수량: '', 
    단가: '',  
    비고: '',  
    사용여부: ''
  });

  // Open 
  const handleClickOpen = () => {
    setOpen(true);
  };
    
  // Close 
  const handleClose = () => {
    setOpen(false);
  };

  // Save 
  const handleSave = () => {
    props.addProducts(product);
    setProduct({
      품목코드: '',
      품목이름: '',
      규격: '',
      수량: '',
      단가: '',
      비고: '',
      사용여부: ''
    });
    handleClose();
  }

  const handleChange = (event) => {
    setProduct({...product, [event.target.name]: event.target.value});
  }
  
  return(
    <div>
      <Button variant='contained' onClick={handleClickOpen}>품목 추가</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>품목 추가</DialogTitle>
        <DialogContent>
        <Stack spacing={4} mt={1} width={400}>
              <TextField label="품목코드" name="품목코드" autoFocus
              variant="standard" value={product.품목코드} 
              onChange={handleChange}/>
                <TextField label="품목이름" name="품목이름" autoFocus
              variant="standard" value={product.품목이름} 
              onChange={handleChange}/>
                <TextField label="규격" name="규격" autoFocus
              variant="standard" value={product.규격} 
              onChange={handleChange}/>
               <TextField label="수량" name="수량" autoFocus
              variant="standard" value={product.수량} 
              onChange={handleChange}/>
                <TextField label="단가" name="단가" autoFocus
              variant="standard" value={product.단가} 
              onChange={handleChange}/>
                <TextField label="비고" name="비고" autoFocus
              variant="standard" value={product.비고} 
              onChange={handleChange}/>
               <TextField label="사용여부" name="사용여부" autoFocus
              variant="standard" value={product.사용여부} 
              onChange={handleChange}/>
         </Stack>
        </DialogContent>
        <DialogActions>
           <Button onClick={handleClose}>취소</Button>
           <Button onClick={handleSave}>저장</Button>
        </DialogActions>
      </Dialog>            
    </div>
  );  
}

export default AddProducts;