import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import { SERVER_URL } from '../constants.js';
import { useEffect } from 'react';
import MenuBar from './MenuBar.js';

function Login() {
  const [user, setUser] = useState({
    username: '', 
    password: ''
  });
  const [isAuthenticated, setAuth] = useState(false);
  const [open, setOpen] = useState(false);             //Snackbar 표시 여부를 제어할 open 상태
  
  const handleChange = (event) => {
    setUser({...user, [event.target.name] : event.target.value});
  }
  
  // 인증이 실패하면 open 상태 값을 true로 설정해 Snackbar 컴포넌트 표시
  const login = () => {
    if (!user.username || !user.password) {
        // 사용자 이름 또는 암호 중 하나라도 비어 있을 때 로그인 시도 방지
        setOpen(true);
        return;
      }
      
    fetch(SERVER_URL + 'login', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(user)
    })
    .then(res => {
      const jwtToken = res.headers.get('Authorization');
      if (jwtToken !== null) {
        sessionStorage.setItem("jwt", jwtToken);
        setAuth(true);
      }
      else {
        setOpen(true);
      }
    })
    .catch(err => console.error(err))
  }

  //로그아웃 
    const logout = () => {
        if (window.confirm("정말..? 로그아웃하시겠습니까? (ᵔ-ᵔ)")) {
        sessionStorage.removeItem("jwt");  // 세션 스토리지에서 토큰 제거
        setAuth(false);                    // isAuthenticated 상태 값을 false로 변경
    }}

  // 컴포넌트가 로드될 때 세션 스토리지에서 인증 상태를 확인(로그인 하면 carlist 페이지 유지)
    useEffect(() => {
        if (sessionStorage.getItem("jwt")) {
        setAuth(true);
        }
    }, []);

    return (
        <div>
          {isAuthenticated ? (
          <div>
          <MenuBar />
          <div style={{ position: "absolute", bottom: 20, left: 60, margin: "20px" }}>
              <Button variant="outlined" color="secondary" onClick={logout}>
                  Logout
              </Button>
          </div>
      </div>
      
          ) : (
            <Box border={2} p={5} borderRadius={5} width={300} style={{ margin: '0 auto', borderColor: '#1976d2', paddingTop: 10, marginTop: 190}}>
            <Stack spacing={3} alignItems='center' mt={10} style={{ marginTop: 55}}>
                 <Typography variant="h4"  color="primary" gutterBottom>
                    Login
                </Typography>
              <TextField 
                name="username"
                label="Username" 
                onChange={handleChange}
                onKeyPress={(event) => { if (event.key === "Enter") { login();}}} />
                {/* 이벤트 핸들러에서 Enter 키를 감지 */}
              <TextField 
                type="password"
                name="password"
                label="Password"
                onChange={handleChange}
                onKeyPress={(event) => { if (event.key === "Enter") { login();}}} />
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={login}>
                  Login
              </Button>
            </Stack>
            </Box>
          )}
    
          <Snackbar 
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            message="로그인 실패: 사용자 이름과 암호를 확인하세요"
            anchorOrigin={{
                vertical: 'top', // 수직 위치 (top 또는 bottom)
                horizontal: 'center' // 수평 위치 (left, center, 또는 right)
              }}
          />
        </div>
      );
    }


export default Login;