import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

function Login(props){
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
      username: '',
      password: '',
    })

    const change = (e) => {
      const {name,value} = e.target
      setFormData({...formData, [name]: value})
  }

  const login = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('access_token')
    const response = await axios.post("http://127.0.0.1:8000/api/connect", {...formData}
    
  )
    console.log(response)
    if (response.data.status === 'success') {
        console.log(response);
        localStorage.setItem("access_token", response.data.access_token)
        navigate('/')
    } else {
        alert(response.data.message)
    }
  }


  return (
    <div className="container">
        <h1>LOGIN PAGE</h1>
        <button onClick={()=>navigate("/")}>Return HOME</button>
        <div>
            <form onSubmit={login}>
                <label htmlFor="">Username</label>
                <input type="text" name='username' value={formData.username} onChange={(e) => change(e)} />
                <label htmlFor="">Password</label>
                <input type="password" name='password' value={formData.password} onChange={(e) => change(e)} />
                <button type="submit">Inscription</button>
            </form>
        </div>
    </div>
  )
}

export default Login
