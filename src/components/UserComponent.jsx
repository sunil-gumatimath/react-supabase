import React, { useEffect } from 'react'
import { supabase } from '../createClient.js'
import { useState } from 'react'


const UserComponent = () => {

  const [users,setUsers] = useState([]);
  const [user,setUser] = useState({
    name : '',
    age : ''
  });


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

  async function createUser() {
    await supabase
    .from('users')
    .insert({name: user.name, age : user.age})
  }

  const handleChange = (e) => {
    
    setUser(prevFromData => {
      return{
        ...prevFromData,
        [e.target.name]:e.target.value
      }
    })
  }

  return (
    <div>


    <form onSubmit={createUser}>
      <input
       type="text"
       placeholder='enter name'
       name='name'
       onChange={(handleChange)}
       />
       
       <input
       type="number"
       placeholder='enter age'
       name='age'
       onChange={(handleChange)}
       />
      <button type='submit'>Create</button>
    </form>



        <table>
          <thead>
            <tr key={user.id}>
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
