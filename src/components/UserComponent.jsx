import React, { useEffect } from 'react'
import { supabase } from '../createClient.js'
import { useState } from 'react'


const UserComponent = () => {

    const [users,setUsers] = useState([]);

    useEffect (()=>{
      fetchUser()
    })
  
  async function fetchUser() {
    const {data} = supabase
    .from('users')
    .select('*')
    setUsers(data)
    console.log(users);
    
  }
  return (
    <div>
        
    </div>
  )
}

export default UserComponent
