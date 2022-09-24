import React, { useState, useEffect } from 'react';
import {TextField, Button, Stack, Grid, Card, CardContent, IconButton, InputAdornment} from '@mui/material';
import UserList from './components/onlineUserlist';
import UserProfile from './components/userProfile';
import SendIcon from '@mui/icons-material/Send';
import { padding } from '@mui/system';

 function Chat({socket, username, room }){
    const [currentMessage, setcurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const sendMessage = () =>{
        if(currentMessage !== ""){
            const messageData = {
                room : room,
                author : username,
                message : currentMessage,
                time : new Date(Date.now()).getHours() + ":"+ new Date(Date.now()).getMinutes()
            }

             socket.emit('send_message', messageData)
             setMessageList((list) => [...list, messageData])
        }
    }

    useEffect(()=>{
        socket.on("receive_message", (data)=>{
        //   console.log(data);
          setMessageList((list) => [...list, data])
        })
      },[socket])
    return(
       <div>
            <Grid container spacing={2}>
                <Grid item xs={3} md={3}>
                    <UserList />
                </Grid>
                <Grid item xs={6} md={6}>
                    {/* chat box */}

                    
                <Card sx={{ height : "100vh" }}> 
                    <CardContent> 
                    <Stack>
                        {
                            messageList.map(data=>(
                                <div
                                    style={{
                                        borderRadius : "10px",
                                        backgroundColor : "#eee",
                                        padding : "10px",
                                        margin : "10px",
                                        maxWidth : "200px"
                                    }}
                                > {data.message} </div>
                            ))
                        }
                    </Stack>
                    <Stack
                        display= "flex"
                        alignItems= "flex-end"
                    > 

                    </Stack>
                    <Grid container spacing={2}> 
                        <Grid item xs={8}>
                            <TextField 
                                variant='standard'
                                type="text"
                            
                                placeholder='Hey...'
                                onChange={(e) => setcurrentMessage(e.target.value)}
                            
                            />
                        </Grid>
               
                        <Grid md = {6} > 
                            <IconButton 

                                variant='contained'
                                onClick={sendMessage} >
                                <SendIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    </CardContent>
                    </Card> 
                </Grid>
                <Grid item xs={3} md={3}>
                    <UserProfile />


                </Grid>
            </Grid>
       </div>
    )
}

export default Chat;