import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../constants';
import { DataGrid,  GridToolbarContainer, GridToolbarExport, gridClasses } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack'
import AddProducts from './AddProducts';
import EditProducts from './EditProducts';
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

function Productlist() {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
       fetchProducts();
    }, []);

    const fetchProducts = () => {
      //세션 저장소에서 토큰을 읽고 
      //Authorization 헤더에 이를 포함한다.
      const token = sessionStorage.getItem("jwt");

        fetch(SERVER_URL + 'api/products' ,{
          headers: { 'Authorization' : token }
        })
        .then(response => response.json())
        .then(data => setProducts(data._embedded.products))
        .catch(err => console.error(err));
    }

    const columnPr = [
        { field: '품목코드', headerName: '품목코드', width: 200, headerAlign: 'center', align: 'center' },
        { field: '품목이름', headerName: '품목이름', width: 200, headerAlign: 'center', align: 'center' },
        { field: '규격', headerName: '규격', width: 140, headerAlign: 'center', align: 'center' },
        { field: '수량', headerName: '수량', width: 140, headerAlign: 'center', align: 'center' },
        { field: '단가', headerName: '단가', width: 200, headerAlign: 'center', align: 'center' },
        { field: '비고', headerName: '비고', width: 200, headerAlign: 'center', align: 'center' },
        { field: '사용여부', headerName: '사용여부', width: 150, headerAlign: 'center', align: 'center' },
        {
            field: '_links.car.href',
            headerName: '수정',
            width: 100,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            filterable: false,
            renderCell: (row) => <EditProducts data={row} updateProduct={updateProduct} />,
          },
        {
            field: 'delete',
            headerName: '삭제',
            width: 100,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <IconButton
                    onClick={() => onDelClick(params.row._links.self.href)}>
                   <DeleteIcon color="error" />
                </IconButton>
            )
        }
    ];

    //삭제
    const onDelClick = (url) => {
        if (window.confirm("삭제하시겠습니까?")) {
          const token = sessionStorage.getItem("jwt");

        fetch(url, { 
          method: 'DELETE',
          headers: {'Authorization' :token}
        })
        .then(response => { 
            if (response.ok) {
              fetchProducts();
              setOpen(true);
            }
            else {
              alert('뭔가 잘못됐어요!');
            }  
        })
        .catch(err => console.error(err));
        }
    }

     //품목 추가 
  const addProducts = (product) => {
    const token = sessionStorage.getItem("jwt"); 

    fetch(SERVER_URL  +  'api/products',
      { method: 'POST', 
        headers: {
         'Content-Type':'application/json',
          'Authorization' :token
        },
      body: JSON.stringify(product)
    })
    .then(response => {
      if (response.ok) {
        fetchProducts();
      }
      else {
        alert('Something went wrong!');
      }
    })
    .catch(err => console.error(err))
  }

  // 품목 업데이트
const updateProduct = (Product, link) => {
    const token = sessionStorage.getItem("jwt"); 
  
    fetch(link,
      { 
        method: 'PUT', 
        headers: {
        'Content-Type':'application/json',
        'Authorization' :token
      },
      body: JSON.stringify(Product)
    })
    .then(response => {
      if (response.ok) {
        fetchProducts();
      }
      else {
        alert('Something went wrong!');
      }
    })
    .catch(err => console.error(err))
  }
    
    return (
        <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-680px', marginLeft: '220px' }}>
        <Stack direction="row" spacing={150} mt={4} mb={5} marginLeft={0}>
          <h2>품목관리</h2>
          <AddProducts addProducts={addProducts} />
      </Stack>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%' }}>
            <DataGrid
            rows={products}
            columns={columnPr}
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

export default Productlist;
