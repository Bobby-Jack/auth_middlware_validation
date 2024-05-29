import { useState } from "react"
import axios from "axios"

function Validation(){

    const [formData, setFormData] = useState({
        "username" : "",
        "first_name" : "",
        "last_name" : "",
        "password" : "",
        "email" : "",
        "phone" : "",
        "city" : "",
        "postal" : "",
        "url_img" : "",
    })

    const change = (e) => {
        const {name,value} = e.target
        setFormData({...formData, [name]: value})
    }

    const submit = (e) =>{
        e.preventDefault()
        axios.post('http://127.0.0.1:8000/api/validation', formData)
        .then((rep)=>{
            console.log(rep);
        })
    }

    return(
        <div>
            <form className="formValidation" onSubmit={(e)=>{submit(e)}}>
                <label htmlFor="">Username</label>
                <input type="text" name='username' value={formData.username} onChange={(e) => change(e)} />
                <label htmlFor="">First Name</label>
                <input type="text" name='first_name' value={formData.first_name} onChange={(e) => change(e)} />
                <label htmlFor="">Last Name</label>
                <input type="text" name='last_name' value={formData.last_name} onChange={(e) => change(e)} />
                <label htmlFor="">city</label>
                <input type="text" name='city' value={formData.city} onChange={(e) => change(e)} />
                <label htmlFor="">postal code</label>
                <input type="text" name='postal' value={formData.postal} onChange={(e) => change(e)} />
                <label htmlFor="">IMG URL</label>
                <input type="text" name='url_img' value={formData.url_img} onChange={(e) => change(e)} />
                <label htmlFor="">Email</label>
                <input type="email" name='email' value={formData.email} onChange={(e) => change(e)} />
                <label htmlFor="">Password</label>
                <input type="password" name='password' value={formData.password} onChange={(e) => change(e)} />
                <button type="submit">envoyer</button>
            </form>
        </div>
    )
}

export default Validation
