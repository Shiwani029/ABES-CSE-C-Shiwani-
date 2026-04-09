import React, {useState} from "react";
import API from "../api";

function Login() {
    const  handleSubmit=async (e) => {
        try {
            const res=await API.post("/login",form);
            alert(res.data.message);
        }
        catch (err) {
            alert("Invalid credentials");
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>
                Login
            </h2>
            
        </form>
    )
}