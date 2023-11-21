import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function SaveOwner(props) {
  const [owner, setOwner] = useState(props.selectedRow || {
      clientname: '',
      gender: '',
      phonenumber: '',
      address:''
  });

  useEffect(() => {
      // selectedRow가 변경될 때마다 owner 상태 업데이트
      setOwner(props.selectedRow || {
          clientname: '',
          gender: '',
          phonenumber: '',
          address:''
      });
  }, [props.selectedRow]);

  const handleChange = (event) => {
      setOwner({ ...owner, [event.target.name]: event.target.value });
  }

  const handleSave = () => {
      // addOwner 함수를 호출하여 입력한 내용을 저장
      props.addOwner(owner);

      // 상태 초기화
      setOwner({
          clientname: '',
          gender: '',
          phonenumber: '',
          address:''
      });
    }

    const reset = () => {
        // 상태 초기화
        setOwner({
            clientname: '',
            gender: '',
            phonenumber: '',
            address:''
        });
    }

  return (
      <div>
          <Stack spacing={4} mt={5} mb={5} width={500} style={{marginLeft:'50px'}}>
              <TextField label="Client name" name="clientname" autoFocus
                  variant="standard" value={owner.clientname}
                  onChange={handleChange} />
              <TextField label="Gender" name="gender" 
                  variant="standard" value={owner.gender}
                  onChange={handleChange} />
              <TextField label="Phone number" name="phonenumber" 
                  variant="standard" value={owner.phonenumber}
                  onChange={handleChange} />
              <TextField label="Address" name="address" 
                  variant="standard" value={owner.address}
                  onChange={handleChange} />
          </Stack>
          <div style={{ display: 'block', margin:'30px 0 0 240px' }}>
              <Button variant="outlined" onClick={reset} color="secondary" size="large" style={{marginRight:'30px'}}>Cancel</Button>
              <Button variant="outlined" onClick={handleSave} size="large">Save</Button>
          </div>
      </div>
  );
}

export default SaveOwner;
