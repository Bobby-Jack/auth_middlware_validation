import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import "./AllUser.css"


function AllUser(){
    const navigate = useNavigate()
    const [allUserData, setAllUserData] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('access_token'))

    const [userId, setUserId] = useState(0)
    const [roleId, setRoleId] = useState(0)

    const [displayModal, setDisplayModal] = useState(false)


    useEffect(() => {

      axios.get('http://127.0.0.1:8000/api/get_all_users', {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      } ).then((rep)=>{
        if (rep.data.status == 'success') {
            setAllUserData(rep.data.usersData)

        }else{
            console.log(rep);
            alert(rep.data.message)
        }
      })
    
      
    }, [])
    

    function showModal(id){
      setUserId(id)
      setDisplayModal(true)
    }
    

    const sendModif = (e)=>{
        e.preventDefault()
        const token = localStorage.getItem('access_token')
        axios.put(`http://127.0.0.1:8000/api/change_role/${userId}`, 
            {
                "id" : userId,
                "role_id" : roleId,
            }
        ).then((rep)=>{
            if (rep.data.status == 'success') {
                alert("modification effectué")
                setRoleId(0)
                setUserId(0)
                setDisplayModal(false)
            }else{
                alert(rep.data.message)
                console.log(rep);
            }
        })
    }
    



    return (
        <div className="allUserPage">
        <div className={displayModal ? "changeRoleModal" : "changeRoleModal hide"}>
                <h3>Change the role of user n°{userId}</h3>
                <h3>your choice is {roleId}</h3>
            <form onSubmit={(e)=>{sendModif(e)}}>
                <select onChange={(e)=>setRoleId(e.target.value)} >
                    <option value={0}>Choissez un rôle</option>
                    <option value={1}>USER</option>
                    <option value={2}>ADMIN</option>
                    <option value={3}>BAN</option>
                </select>
                <button type="submit">change</button>
            </form>
        </div>
            {
            allUserData
            ?
            allUserData.map((user, index)=>{
                return <div key={index}>{user.username} <button onClick={()=>{showModal(user.id)}}>change role</button></div>
            })
            :
            ""
            }

        </div>
    )


}

export default AllUser
