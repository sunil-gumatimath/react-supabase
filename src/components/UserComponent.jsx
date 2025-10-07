import React, { useEffect } from 'react'
import { supabase } from '../createClient.js'
import { useState } from 'react'


const UserComponent = () => {

    const [users,setUsers] = useState([]);

    console.log(users);


    useEffect (()=>{
      fetchUser()
    }, [])

  async function fetchUser() {
    const {data} = await supabase
    .from('users')
    .select('*')
    setUsers(data)
    console.log(data);
  }
  return (
    <div>
        
    </div>
  )
}

export default UserComponent
