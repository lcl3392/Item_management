import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { SERVER_URL } from '../constants.js'
import { DataGrid ,GridToolbarContainer, GridToolbarExport, gridClasses} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import EditOwner from './EditOwner.js';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveOwner from './SaveOwner.js';
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: '#000',
  border: '2px solid #000',
}));

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function Ownerlist() {
  const [owner, setOwner] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null); 

  React.useEffect(() => {
      fetchOwners();
  }, []);

  const fetchOwners = () => {
      const token = sessionStorage.getItem("jwt");

      fetch(SERVER_URL + 'api/owners', {
          headers: { 'Authorization': token }
      })
          .then(response => response.json())
          .then(data => setOwner(data._embedded.owners))
          .catch(err => console.error(err));
  }

  const columnsON = [
      {
          field: '',
          headerName: '',
          width: 80,
          headerAlign: 'center',
          align: 'center',
          sortable: false,
          filterable: false,
          renderCell: (params) => (
              <IconButton size="small" onClick={() => handleNoClick(params.row)}>
                  <Icon path={mdiAccount} size={1} />
              </IconButton>
          ),
      },
        {field:'clientname', headerName:'Name', width: 180, headerAlign: 'center', align: 'center'},
        {field:'gender', headerName:'Gender', width: 130, headerAlign: 'center', align: 'center'},
        {field:'phonenumber', headerName:'Phone number', width: 180, headerAlign: 'center', align: 'center'},
        {
          field: '_links.owner.href',
          headerName:'수정',
          width: 120,
          headerAlign: 'center',
          align: 'center',
          sortable: false,
          filterable: false,
          renderCell: row =>
           <EditOwner
              data={row}
              updateOwner={updateOwner}/>
        },
        {
          field: '_links.self.href',
          headerName:'삭제',
          width: 120,
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

    const handleNoClick = (row) => {
      // 클릭한 행의 데이터를 SaveOwner 컴포넌트에 전달
      setSelectedRow(row);
  }

    //삭제
    const onDelClick = (url) => {
      if (window.confirm("삭제하시겠습니까?")){
        const token = sessionStorage.getItem("jwt");

      fetch(url, {
        method: 'DELETE',
        headers: { 'Authorization' : token }
      })
      .then(response => {
        if (response.ok){
        fetchOwners();
        setOpen(true);
        }
        else{
          alert('문제가 생겼습니다.')
        }
      })
      .catch(err => console.error(err))
    }
  }

  //추가
  const addOwner = (owner) => {
    
    const token = sessionStorage.getItem("jwt");

    fetch(SERVER_URL  +  'api/owners',
        { method: 'POST',
          headers: {
            'Content-Type':'application/json',
            'Authorization' : token
          },   
          body: JSON.stringify(owner)      
    })
    .then(response => {
        if (response.ok) {
            fetchOwners();
        }
        else {
            alert('문제가생겼습니다.');
        }
    })
      .catch(err => console.error(err));  
  }

  //업데이트
  const updateOwner = (owner, link) => {
    const token = sessionStorage.getItem("jwt"); 

    fetch(link,
      { 
        method: 'PUT', 
        headers: { 
          'Content-Type':'application/json',
          'Authorization' : token
        },
        body: JSON.stringify(owner)  
    })
    .then(response => {
      if (response.ok) {
        fetchOwners();
      }
      else {
        alert('문제가생겼습니다.');
      }
    })
    .catch(err => console.error(err))
  }
  

  return (
    <Box sx={{ flexGrow: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', 
    marginTop: '-745px', marginLeft: '300px'}}>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={6.5}>
          <Item style={{height:'780px'}}>
            <h2 style={{marginRight:'700px'}}>Owner</h2>
           <div style={{width:'100%', height: 700}}>
           <DataGrid
            rows={owner}
            columns={columnsON}
            getRowId={row => row._links.self.href}
            components={{ Toolbar: CustomToolbar }}
           />
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
          </Item>
        </Grid>
        <Grid item xs={5}>
    <Item style={{ height: '780px' }}>
        <h2 style={{marginRight:'400px'}}>Information</h2>
        <SaveOwner addOwner={addOwner} selectedRow={selectedRow} />
    </Item>
</Grid>
      </Grid>
    </Box>
  );
}