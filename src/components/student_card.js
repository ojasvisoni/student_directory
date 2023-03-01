import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export default function ImgMediaCard(props) {
    const {data, handleUpdate, handleDelete} = props;
    const {id, name, email, phone, dob} = data;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="student"
        image="/student.png"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Phone: {phone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Birthday: {dob}
        </Typography>
      </CardContent>
      <Grid container spacing={2} align="center">
        <Grid item xs={12}>
            <Button 
                size="small"
                onClick={() => handleUpdate(data)}
            >
                Update
            </Button>
            <Button
                size="small"
                color="error"
                onClick={() => handleDelete(id)}
            >
                Delete
            </Button>
        </Grid>
      </Grid>
    </Card>
  );
}