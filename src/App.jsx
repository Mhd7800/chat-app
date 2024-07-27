import React, { useState } from 'react';
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelListContainer, ChannelContainer, Auth } from './Components';
import './App.css';
import 'stream-chat-react/dist/css/index.css';


const cookies = new Cookies();

const apiKey = 'sgmgvwndnj29';
const client = StreamChat.getInstance(apiKey);
const authToken = cookies.get("token");

if(authToken){
  client.connectUser({
    name : cookies.get('username'),
    fullName : cookies.get('fullName'),
    id : cookies.get('userId'),
    phoneNumber : cookies.get('phoneNumber'),
    image : cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'), 
}, authToken)
}

const App = () => {

  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


  if(!authToken) return <Auth />
  return (
    <div className='app__wrapper'>

        <Chat client={client} theme="team light">
            <ChannelListContainer 
            isCreating={isCreating}
            setIsCreating= {setIsCreating}
            setIsEditing = {setIsEditing}
            setCreateType = {setCreateType}
            />

            <ChannelContainer
              isCreating={isCreating}
              setIsCreating= {setIsCreating}
              setIsEditing = {setIsEditing}
              setCreateType = {setCreateType}
            />
        </Chat>
    </div>
  )
}

export default App