import { Box } from '@mui/material';
import { Stack, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import io from 'socket.io-client';
import Chat from './chat';
const socket = io.connect("http://localhost:4000");



function App(){ 
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState();
  const [showChatBox, setShowChatBox] = useState(false);

  const joinRoom = ()=>{
    if(username != "" && room != ""){
      socket.emit('join_room', room)
      setShowChatBox(true)
    }
  }

    return (
     
       <Stack
        // textAlign= "center"
       >
         
            {!showChatBox? 
              <Stack
                spacing={2}
                minWidth = {400}
                margin = "auto"
                marginTop="10%"
              
              >
              <TextField 
                fullWidth
                type = 'text' 
                placeholder='Your Name'  
                onChange={(e)=>setUsername(e.target.value)}
              />
              <TextField 
                fullWidth
                type = "text"
                placeholder='Room Number'
                onChange={(e)=> setRoom(e.target.value)}
              />
              <Button
                fullWidth
                variant='contained'
                type = "submit" 
                onClick={joinRoom} 
               
              > Join </Button>
            </Stack>
            : 
            <Chat socket={socket} username = {username} room = {room} />
          }  
       

       </Stack>
   
    );
}

export default App;
