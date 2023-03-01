import { Grid , Button, Container, Divider, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import FormDialog from './components/data_entry_modal';
import './App.css';
import ImgMediaCard from './components/student_card';

function App() {
  const url = `http://localhost:4000/students`;
  const [modalState, setModalState] = useState(false);
  const [formData, setFormData] = useState({});
  const [studentsData, setStudentsData] = useState([]);

  const handleClickOpen = () => {
    setModalState(true);
  }

  const onChange = (e) => {
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleClose = () => {
    setModalState(false);
    setFormData({});
  }

  const handleUpdate = (oldData) => {
    setFormData(oldData)
    handleClickOpen()
  }

  const handleDelete = (student_id) => {
    const confirm = window.confirm("Are you sure, you want to delete this row", student_id)
    if (confirm) {
      fetch(url + `/${student_id}`, { method: "DELETE" }).then(resp => resp.json()).then(resp => getStudents())

    }
  }

  const handleFormSubmit = () => {
    if (formData.id) {
      const confirm = window.confirm("Are you sure, you want to update this row ?")
      confirm && fetch(url + `/${formData.id}`, {
        method: "PUT", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose();
          getStudents();

        })
    } else {
      fetch(url, {
        method: "POST", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getStudents()
        })
    }
  }

  const getStudents = useCallback(() => {
    fetch(url)
    .then(response => {
      const data = response.json();
      return data;
    })
    .then(data => {
      console.log(data)
      setStudentsData(data);
    });
  }, [url])
  
  useEffect(() => {
    getStudents();
  }, [getStudents]);

  const generateList = () => {
    let studentsList = [];
    studentsData.forEach(student => {
      studentsList.push(
        <Grid key={student.id} item xs={3}>
          <ImgMediaCard key={student.id} data={student} handleUpdate={handleUpdate} handleDelete={handleDelete} sx={{mb:5}} />
        </Grid>
      );
    });
    return studentsList;
  }

  return (
    <Container>
      <Typography variant="h2" component="h2" align="center">
        Student Database
      </Typography>
      <Grid sx={{m:2}} align="center">
          <Button variant="contained" color="primary" onClick={handleClickOpen}>Add Student</Button>
      </Grid>
      <Divider sx={{mb:5}}/>
      <FormDialog open={modalState} handleClose={handleClose}
        data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
      <Grid container spacing={2} align="center" sx={{maxHeight: 500, overflow:'auto'}}>
        {generateList()}
      </Grid>
    </Container>
  );
}

export default App;
