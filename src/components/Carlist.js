import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../constants.js'
import { DataGrid,  GridToolbarContainer, GridToolbarExport, gridClasses } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import AddCar from './AddCar.js';
import EditCar from './EditCar.js';
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Icon from '@mdi/react';
import { mdiCarSearch } from '@mdi/js';


//GridToolbarContainer,Export 컴포넌트로 Export 버튼을 렌더링하는 toolbar 컴포넌트
function CustomToolbar() {
    return (
      <GridToolbarContainer className={gridClasses.toolbarContainer}>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }


function Carlist() {
    const [cars, setCars] = useState([]);     //비어 있는 배열을 기본값으로 cars 상태 선언
    const [open, setOpen] = useState(false);  //Snackbar 컴포넌트의 open 프롭 값은 boolean, 이 값이 true면 컴포넌트 표시
    const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCars();
  }, [searchTerm]);

  const fetchCars = () => {
    const token = sessionStorage.getItem("jwt");
    const url = searchTerm
      ? `${SERVER_URL}api/cars/search/findByvehicleYear?vehicleYear=${searchTerm}`
      : `${SERVER_URL}api/cars`;

    fetch(url, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => setCars(data._embedded.cars))
      .catch((err) => console.error(err));
  };

      //목록 삭제
      const onDelClick = (url) => {
        // 사용자에게 삭제 여부를 확인하는 대화상자
        if (window.confirm("삭제하시겠습니까?")) {
          // 현재 세션에서 JWT 토큰을 가져옴
          const token = sessionStorage.getItem("jwt"); 
      
          // 서버에 DELETE 요청
          fetch(url, {
            method: 'DELETE',  // DELETE 메서드를 사용하여 삭제 요청
            headers: { 'Authorization' : token }  // 요청에 JWT 토큰을 포함시켜 인증
          })
          .then(response => { 
            // 서버 응답이 성공적인지 확인
            if (response.ok) {
              // 성공하면 자동차 목록을 다시 가져오고, 사용자에게 성공 메시지를 보여줌
              fetchCars();
              setOpen(true);  
            }
            else {
              alert('뭔가 잘못됐어요!');
            }  
          })
          .catch(err => console.error(err))
        }
      }


  // 새로운 자동차 추가 
  const addCar = (car) => {
    // 현재 세션에서 JWT 토큰을 가져옴
    const token = sessionStorage.getItem("jwt");

    // 서버에 POST 요청을 보냅니다.
    fetch(SERVER_URL  +  'api/cars',
        { method: 'POST', headers: {
            'Content-Type':'application/json',   // 요청의 본문 형식을 JSON으로 지정
            'Authorization' : token              // 요청에 JWT 토큰을 포함시켜 인증
        },
        body: JSON.stringify(car)               // 자동차 정보를 JSON 형식으로 변환하여 요청의 본문에 포함
    })
    .then(response => {
        // 서버 응답이 성공적인지 확인
        if (response.ok) {
            // 성공하면 자동차 목록을 다시 가져옴
            fetchCars();
        }
        else {
            // 실패하면 경고 메시지를 표시
            alert('Something went wrong!');
        }
    })
    .catch(err => console.error(err));  // 네트워크 오류 등의 예외 상황이 발생하면 콘솔에 에러를 출력
}


// 자동차 업데이트
const updateCar = (car, link) => {
  // 현재 세션에서 JWT 토큰을 가져옴
  const token = sessionStorage.getItem("jwt"); 

  // 서버에 PUT 요청
  fetch(link,
    { 
      method: 'PUT',  // PUT 메서드를 사용하여 업데이트 요청
      headers: {
        'Content-Type':'application/json',  // 요청의 본문 형식을 JSON으로 지정
        'Authorization' : token  // 요청에 JWT 토큰을 포함시켜 인증
      },
      body: JSON.stringify(car)  // 자동차 정보를 JSON 형식으로 변환하여 요청의 본문에 포함
  })

  .then(response => {
    if (response.ok) {
      fetchCars();
    }
    else {
      alert('Something went wrong!');
    }
  })
  .catch(err => console.error(err))
}


    // field는 자동차 객체의 속성
    const columns = [
        { field: 'brand', headerName: 'Brand', width: 200, headerAlign: 'center', align: 'center' ,},
        { field: 'model', headerName: 'Model', width: 200, headerAlign: 'center', align: 'center' ,},
        { field: 'color', headerName: 'Color', width: 200, headerAlign: 'center', align: 'center' ,},
        { field: 'vehicleYear', headerName: 'Year', width: 160, headerAlign: 'center', align: 'center' ,},
        { field: 'price', headerName: 'Price', width: 160, headerAlign: 'center', align: 'center' ,},
        { field: 'registerNumber', headerName: 'RegisterNumber', width: 150, headerAlign: 'center', align: 'center' },
        {
          field: '_links.car.href',
          headerName: 'Up Date',
          width: 100,
          headerAlign: 'center',
          align: 'center',
          sortable: false,
          filterable: false,
          renderCell: (row) => <EditCar data={row} updateCar={updateCar} />,
        },
        {
          field: '_links.self.href',
          headerName: 'Delete',
          width: 100,
          headerAlign: 'center',
          align: 'center',
          sortable: false,
          filterable: false,
          renderCell: (row) => (
            <IconButton onClick={() => onDelClick(row.id)}>
              <DeleteIcon color="error" />
            </IconButton>
          ),
        },
      ];
    
   

      return (
        <React.Fragment>
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', 
           marginTop: '-750px', marginLeft: '300px', border:'2px solid #000', width:'1500px', borderRadius:'5px'}}>
           
           <div style={{ position: 'relative', top: '100px', left:'350px' }}>
              <Icon path={mdiCarSearch} size={1.5} />
              <input type="text" placeholder="검색어를 입력해주세요." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} style={{width:'500px',height:'30px'}}/>
            </div>
            
           <Stack direction="row" spacing={133} mt={1} mb={10} marginLeft={0}>
                <h2>CarList</h2>
                <AddCar addCar={addCar} />
            </Stack>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom:'50px' }}>
                <div style={{ width: '100%' }}>
                    <DataGrid
                        rows={cars}
                        columns={columns}
                        disableSelectionOnClick={true}
                        getRowId={row => row._links.self.href}
                        components={{ Toolbar: CustomToolbar }}
                        checkboxSelection
                    />
                </div>
            </div>
            </div>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message="목록에서 삭제되었습니다."
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            />
        </React.Fragment>
    );
}

export default Carlist;