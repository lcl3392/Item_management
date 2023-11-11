import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../constants.js'
import { DataGrid,  GridToolbarContainer, GridToolbarExport, gridClasses } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import AddCar from './AddCar.js';
import EditCar from './EditCar.js';
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


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
    
    useEffect(() => {
        fetchCars();
      }, []);
    
      const fetchCars = () => {
        // 세션 저장소에서 토큰을 읽고
        // Authorization header에 이를 포함한다.
        const token = sessionStorage.getItem("jwt"); 
    
        fetch(SERVER_URL + 'api/cars', {
          headers: { 'Authorization' : token }
        })
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err));    
      }

      //목록 삭제
      const onDelClick = (url) => {
        if (window.confirm("삭제하시겠습니까? (ᵔ-ᵔ)")) {
          const token = sessionStorage.getItem("jwt"); 
    
          fetch(url, {
            method:  'DELETE', 
            headers: { 'Authorization' : token }
          })
          .then(response => { 
            if (response.ok) {
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
    const token = sessionStorage.getItem("jwt"); 

    fetch(SERVER_URL  +  'api/cars',
      { method: 'POST', headers: {
        'Content-Type':'application/json',
        'Authorization' : token
      },
      body: JSON.stringify(car)
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

// 자동차 업데이트
const updateCar = (car, link) => {
  const token = sessionStorage.getItem("jwt"); 

  fetch(link,
    { 
      method: 'PUT', 
      headers: {
      'Content-Type':'application/json',
      'Authorization' : token
    },
    body: JSON.stringify(car)
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
        { field: 'year', headerName: 'Year', width: 160, headerAlign: 'center', align: 'center' ,},
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
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-680px', marginLeft: '170px'}}>
           <Stack direction="row" spacing={133} mt={4} mb={5} marginLeft={0}>
                <h2>CarList</h2>
                <AddCar addCar={addCar} />
            </Stack>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '100%' }}>
                    <DataGrid
                        rows={cars}
                        columns={columns}
                        disableSelectionOnClick={true}
                        getRowId={row => row._links.self.href}
                        components={{ Toolbar: CustomToolbar }}
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