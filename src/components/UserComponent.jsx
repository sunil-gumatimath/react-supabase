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
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
              {users.map((user)=>
                  <tr>
                  <th>{user.id}</th>
                  <th>{user.name}</th>
                  <th>{user.age}</th>
                  </tr>
                )}
          </tbody>
        </table>
    </div>
  )
}

export default UserComponent
