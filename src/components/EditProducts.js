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

function EditProducts(props) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
    품목코드: '', 품목이름: '', 규격: '', 수량: '', 
    단가: '', 비고:'', 사용여부:  ''
  });
    
  // 모달 폼 열기
  const handleClickOpen = () => {
    setProduct({
      품목코드: props.data.row.품목코드,
      품목이름: props.data.row.품목이름,
      규격: props.data.row.규격,
      수량: props.data.row.수량,
      단가: props.data.row.단가,
      비고: props.data.row.비고,
      사용여부: props.data.row.사용여부
    })      
    setOpen(true);
  }

  // 모달 폼 닫기
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleChange = (event) => {
    setProduct({...product, 
      [event.target.name]: event.target.value});
  }

  // 자동차를 업데이트하고 모달 폼을 닫음
  const handleSave = () => {
    props.updateProduct(product, props.data.id);
    handleClose();
  }

  return(
    <div>
    <IconButton onClick={handleClickOpen}>
      <EditIcon color="primary" />
    </IconButton>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>품목 수정</DialogTitle>
        <DialogContent>
        <Stack spacing={4} mt={1} width={400}>
            <TextField label="품목코드" name="품목코드" autoFocus
              variant="standard" value={product.품목코드} 
              onChange={handleChange}/>
            <TextField label="품목이름" name="품목이름" 
              variant="standard" value={product.품목이름} 
              onChange={handleChange}/>
            <TextField label="규격" name="규격" 
              variant="standard" value={product.규격} 
              onChange={handleChange}/>
               <TextField label="수량" name="수량" 
              variant="standard" value={product.수량} 
              onChange={handleChange}/>
            <TextField label="단가" name="단가" 
              variant="standard" value={product.단가} 
              onChange={handleChange}/>
            <TextField label="비고" name="비고" 
              variant="standard" value={product.비고} 
              onChange={handleChange}/>
            <TextField label="사용여부" name="사용여부" 
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

export default EditProducts;