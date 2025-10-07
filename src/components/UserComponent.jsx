import React, { useEffect } from 'react'
import { supabase } from '../createClient.js'
import { useState } from 'react'


const UserComponent = () => {

  const [users,setUsers] = useState([]);
  const [user,setUser] = useState({
    name : '',
    age : ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


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

  async function createUser(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('users')
        .insert({name: user.name, age: user.age})
        .select();

      if (error) throw error;

      // Reset form
      setUser({ name: '', age: '' });

      // Refresh users list
      fetchUser();

      console.log('User created:', data);
    } catch (error) {
      setError(error.message);
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
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
       value={user.name}
       onChange={(handleChange)}
       required
       />

       <input
       type="number"
       placeholder='enter age'
       name='age'
       value={user.age}
       onChange={(handleChange)}
       required
       />
      <button type='submit' disabled={loading}>
        {loading ? 'Creating...' : 'Create'}
      </button>
    </form>

    {error && <p style={{color: 'red'}}>Error: {error}</p>}



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
