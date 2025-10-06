import React from 'react'
import { supabase } from './createClient'
import { useState } from 'react'


const UserComponent = () => {

    const [users,setUsers] = useState([]);
  console.log(users);
  
  async function fetchUser() {
    const {data} = supabase
    .from('users')
    .select('*')
    setUsers(data)
  }
  return (
    <div>
        fetchUser();
    </div>
  )
}

export default UserComponent