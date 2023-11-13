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
  // 사용자 정보와 인증 상태, Snackbar 표시 여부를 관리하는 상태 변수들을 초기화
  const [user, setUser] = useState({
    username: '', 
    password: ''
  });
  const [isAuthenticated, setAuth] = useState(false);
  const [open, setOpen] = useState(false); // Snackbar 표시 여부를 제어할 open 상태

  // 입력 폼의 값이 변경될 때 호출되는 이벤트 핸들러
  const handleChange = (event) => {
    setUser({...user, [event.target.name] : event.target.value});
  }
  
  // 로그인 시도 
  const login = () => {
    // 사용자 이름 또는 암호 중 하나라도 비어 있을 때 로그인 시도 방지
    if (!user.username || !user.password) {
      setOpen(true); // Snackbar를 열어 사용자에게 경고를 표시
      return;
    }

    // 서버에 로그인 요청
    fetch(SERVER_URL + 'login', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(user)
    })
    .then(res => {
      // 서버 응답에서 Authorization 헤더로부터 JWT 토큰을 가져옴
      const jwtToken = res.headers.get('Authorization');
      if (jwtToken !== null) {
        // JWT 토큰을 세션 스토리지에 저장하고, 인증 상태를 true로 변경
        sessionStorage.setItem("jwt", jwtToken);
        setAuth(true);
      } else {
        // 토큰이 없으면 인증 실패로 간주하고 Snackbar를 연다
        setOpen(true);
      }
    })
    .catch(err => console.error(err));
  }

  
  // 컴포넌트가 로드될 때 세션 스토리지에서 인증 상태를 확인(로그인 하면 carlist 페이지 유지)
  useEffect(() => {
    if (sessionStorage.getItem("jwt")) {
      setAuth(true);
    }
  }, []);
  
  //로그아웃 
    const logout = () => {
        if (window.confirm("로그아웃하시겠습니까?")) {
        sessionStorage.removeItem("jwt");  // 세션 스토리지에서 토큰 제거
        setAuth(false);                    // isAuthenticated 상태 값을 false로 변경
    }}


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