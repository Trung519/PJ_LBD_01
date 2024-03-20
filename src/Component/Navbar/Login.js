import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import './Login.css';
import Home from './Home';
import bg_lg from '../assets/bg-login.jpg';
import { json, useNavigate } from 'react-router-dom';
function Func_Login() {
    const [action, setaction] = useState('Login');
    const [userId, setuserId] = useState('');
    const [password, setpassword] = useState('')
    const handleinput = () => {
        if (!userId || !password) {
            alert("Please check again!")
        }
    }
    const [data, setdata] = useState([]);
    useEffect(() => {
        setdata(JSON.parse(localStorage.getItem('user')));
    }, [])
    const nav = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("name");
        if (e.target.userid.value && e.target.pw.value) {
            if (!localStorage.getItem('user')) {
                if (action === "Login") {
                    alert("Account does not exist! Please Sign up");
                    setaction("Sign up");
                }
                else
                {
                    localStorage.setItem('user',JSON.stringify([{userid: e.target.userid.value, pw:e.target.pw.value}]))
                    return true; 
                }
            }
            else {
                for (let i of data) {
                    if (i.userid === e.target.userid.value) {
                        if (action !== "Login")
                            alert("User id existed!");
                        else {
                            if (i.pw == e.target.pw.value)
                                nav("/Home");
                            else alert("Password does not match!");
                        }
                    }
                    else {
                        if (action === "Login") {
                            alert("Account does not exist! Please Sign up");
                            if (action === "Login")
                                setaction("Sign up");
                        }

                    }

                }
            }
            if (action !== "Login" && localStorage.getItem('user')) {
                localStorage.setItem('user', JSON.stringify([...data, { userid: e.target.userid.value, pw: e.target.pw.value }]))
                nav("/Home");
            }
        }
    }
    return (
        <div id='loginjs'>
            <form id='formlogin' onSubmit={(e) => handleSubmit(e)}>
                <fieldset>
                    <div>
                        <h1 id='header' onClick={(event) => { event.preventDefault(); setaction("Sign up") }}><b>{action}</b></h1>
                    </div>
                    {action === "Sign up" ? <div>
                        <input type='text' placeholder=' Enter Yourname'></input>
                        <input type='number' placeholder=' Enter Your Phonecall'></input>
                    </div> : <div></div>}
                    <div>
                        <input type='text' placeholder=' Enter UserID' name='userid' id='placeholder_user' onChange={(e) => { setuserId(e.target.value) }}></input>
                    </div>
                    <div>
                        <input type='password' placeholder=' Enter Password' name='pw' onChange={(e) => { setpassword(e.target.value) }}></input>
                    </div>
                    <div>

                    </div>
                    <div className='submit-container'>
                        {action === "Login" ? <button className='submit' >Login</button> : <div></div>}
                        <button className='submit'>Sign up</button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}
export default function Login() {
    return (
        <Func_Login />
    )
}

