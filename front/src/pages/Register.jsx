import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

function Register(props) {

    const [message, setMessage] = useState("")


    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email:''
    })

    const navigate = useNavigate()

    const inscription = async (e) => {
        e.preventDefault()
        const response = await axios.post("http://127.0.0.1:8000/api/register", formData)
        console.log(response.data)
        if (response.data.status === 'success') {
            console.log(response);
            navigate('/')
            
        } else {
            alert(response.data.message)
        }
    }

    const change = (e) => {
        const {name,value} = e.target
        setFormData({...formData, [name]: value})
    }

    return(
        <div>
            {/* {message.length > 0 ? <p>{message}</p> : null}  */}
            <form onSubmit={inscription}>
                <label htmlFor="">Username</label>
                <input type="text" name='username' value={formData.username} onChange={(e) => change(e)} />
                <label htmlFor="">Email</label>
                <input type="text" name='email' value={formData.email} onChange={(e) => change(e)} />
                <label htmlFor="">Password</label>
                <input type="password" name='password' value={formData.password} onChange={(e) => change(e)} />
                <button type="submit">Inscription</button>
            </form>
        </div>
    )
}

export default Register;