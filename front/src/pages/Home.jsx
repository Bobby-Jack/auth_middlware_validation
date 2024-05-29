
import { useNavigate } from "react-router-dom"

import { useEffect, useState } from "react"
import axios from "axios"

function Home(props){
    const navigate = useNavigate()
    const [token, setToken] = useState(localStorage.getItem('access_token'))
    useEffect(() => {
      if (!token) {
        setToken(localStorage.getItem('access_token'))
  
      }
      if (token) {
        axios.get("http://127.0.0.1:8000/api/get_user", {
          headers: {
            'Authorization' : `Bearer ${token}`
          }
        }).then((response)=>{
          console.log(response);
          if (response.data.status == 'success') {
            console.log('success');
            props.setUserData({
              'username' : response.data.user_data.username,
              'id' : response.data.user_data.id,
              'email' : response.data.user_data.email,
              'role' : response.data.user_data.role_id,
            })
          }else{
            console.log('not success');
          }
        })
      }
    }, [])
    console.log(props.userData);


 
      const logout = () => {
        props.setUserData(null)
        // Je retire l'access token du localStorage
        axios.post('http://127.0.0.1:8000/api/logout')
            .then(res => {
              console.log(res);
              localStorage.removeItem('access_token')
          })
            .catch(err => console.log(err))
        
    }
    
    

  return (
    <div className="container">
        <h1>HOME PAGE</h1>
        <div>
          {
            props.userData
            ? 
            <>
            <h2>Vous ètes connecté en tant que {props.userData.username}</h2>
              {
                props.userData.role == 1 ?
                <h3>USER</h3>:
                props.userData.role == 2 ?
                <h3>ADMIN</h3>:
                <h3>BANED</h3>
              }
              <button onClick={logout}>LOGOUT</button>

            </>
            :
            <h2>Vous n'ètes pas connecté</h2>
          }
        </div>
       
        <button onClick={()=>navigate("login")}>Login</button>
        <button onClick={()=>navigate("register")}>Register</button>
        <button onClick={()=>navigate("all_users")}>ALL USER</button>
        <button onClick={()=>{console.log(props.userData)}}>LOG</button>
    </div>
  )
}

export default Home
