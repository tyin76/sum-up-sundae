import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { getPeopleInGroup } from '../api/api.js'
import ProfileCard from '../components/ProfileCard.js';
import { Typography, Box, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CustomButton from '../components/CustomButton.js';
import { useRef } from 'react'
import { uploadVideo } from '../api/api'


function ViewGroup() {

    const onUpload = async (e) => {
      console.log('File selected:', e.target.files[0]);
      const videoFile = e.target.files[0];
      const uid = await localStorage.getItem("uid");
      uploadVideo(uid, videoFile);
    }

    const [groupUsers, setGroupUsers] = useState(null);

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    useEffect(() => {
        const fetchGroupUsers = async () => {
            document.body.style.backgroundColor = '#FFF5F4';
            try {
                const users = await getPeopleInGroup();
                setGroupUsers(users);
            } catch (error) {
                console.error('Error fetching group users:', error);
            }
        };
    
        fetchGroupUsers();
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <Box
          sx={{
            padding: 4,
            minHeight: '100vh', 
          }}
        >
          <Grid
            container
            spacing={4}
            sx={{
              justifyContent: 'center', 
              textAlign: 'center', 
            }}
          >
            {groupUsers &&
              groupUsers.map((user, index) => (
                <Grid
                  item
                  key={index}
                  xs={12} 
                  sm={6} 
                  md={4} 
                  lg={3}
                >
                  <Card
                    sx={{
                      padding: 2,
                      backgroundColor: '#FCB5BA',
                      borderRadius: 4,
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                      },
                      transition: 'transform 0.2s ease-in-out',
                    }}
                  >
                    <CardContent sx={{ 
                        padding: 0.5, 
                        '&:last-child': {
                            paddingBottom: 1,
                        },
                     }}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: 'Bubble',
                          fontSize: '24px',
                          color: 'white'
                        }}
                      >
                        Name: {user.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
          <Box
      sx={{
        marginTop: '10vh', 
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        width: '100%',
        padding: 2,
      }}
    >
      <CustomButton onClick={handleButtonClick}>Upload Video</CustomButton>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }} // Hidden from view but still functional
        onChange={onUpload}
      />
            </Box>
        </Box>
      );
    };
    
    export default ViewGroup;
