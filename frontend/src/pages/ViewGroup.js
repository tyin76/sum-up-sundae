import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { getPeopleInGroup } from '../api/api.js'
import ProfileCard from '../components/ProfileCard.js';
import { Typography, Box } from '@mui/material';

function ViewGroup() {
    const [groupUsers, setGroupUsers] = useState(null);

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
    <>
    <Box
     sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-evenly'
        
      }}>
        {groupUsers && groupUsers.map((user, index) => {
            return <ProfileCard key={index}>
                <Box sx={{
                    
                }}>
                <Typography>Name: {user.name}</Typography>
                <Typography>Email: {user.email}</Typography>
                </Box>
                </ProfileCard>
        })}
    </Box>

    {console.log(groupUsers)}
    
    </>
  )
}

export default ViewGroup
