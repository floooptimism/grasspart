import Link from "next/link"
import {useRouter} from "next/router"
import {useForm} from "react-hook-form"
import Head from "next/head"
import {useState, useEffect} from "react"
import validator from "validator"

import $ from "jquery"

const axios = require("axios")


const userErr = {
	required: "Username is required.",
	minLength: "Username must contain at least 5 characters",
	validate: "Username must be an alphanumeric.",
	userexist: "Username is not available.",
	server_err: "Something terrible happened. :( huhu"
}


function Register(){
	const input_style = "tracking-wide text-gray-600 w-full border-b border-color-2 px-4 py-2"
	const {register, handleSubmit, errors, setError,reset,trigger} = useForm({mode:"onChange",shouldFocusError:false})
	const router = useRouter()
	const [flashmsg, setFlashmsg] = useState(null)
	const [loading, setLoading] = useState(null)
	const [available, setAvailable] = useState(null)
	
	const updateBorder = (id)=>{
		const string = id+""
		const element = $("#"+""+id)
		if(errors[id+""]){
			element.removeClass("border-color-2").addClass("border-red-500")
		}else{
			element.removeClass("border-red-500").addClass("border-color-2")
		}
		return true
	}
	
	useEffect(()=>{
		updateBorder("username")
		updateBorder("password")
		updateBorder("confirmPassword")
	},[errors.username,errors.password,errors.confirmPassword])
	
	const onSubmit = async function(data){
		let classes = "shadow-lg p-2 text-white rounded text-sm mb-5"
		let button = $("#buttonReg")
		button.html("Loading...")
		
		try{
			const res = await axios.post("/api/register", data)
			const bgcolor = res.data.code>0 && res.data.code ? "bg-green-500":"bg-red-500"
			setFlashmsg(<p className={bgcolor+" "+classes}>{res.data.text}</p>)
			if(res.data.code == 1) setTimeout(()=>router.push("/login"),2000)
		}catch(err){
			setFlashmsg(<p className="shadow-lg p-2 bg-red-500 text-white rounded text-sm mb-5">Error: Something unusual happened. Notify dev.</p>)
		}finally{
			button.html("Register")
		}
		
		
	}
	
	const isExist = async(e)=>{
		if(!e.target.value) trigger("username")
		setLoading(<p className="text-xs mt-2 text-gray-500 font-bold">Fetching...</p>)
		let res = await axios.post("/api/corporeality",{username:e.target.value})
		if(res.data){
			setAvailable(null)
			res.data == 1 ? setError("username",{type:"userexist"}):setError("username",{type:"server_err"})
		}else{
			if(!errors.username)
				setAvailable(<p className="text-xs mt-2 text-color-2 font-bold">User available.</p>)
		}
		setLoading(null)
		
	}
	
	const confirmPass = (value)=> value == $("#password").val()
	
	//slap'em error msgs
	const printError = (data)=> <p className=" text-red-500 text-xs rounded  mt-2 font-bold">{data}</p>
	
	
	return (

		<div className="w-full max-w-xs mx-auto mt-16">
			<form className="border shadow-md rounded px-8 py-8" onSubmit={handleSubmit(onSubmit)} id="form">
				{flashmsg}
				<div className="mb-8">
					<label className="outline-none tracking-wide font-bold text-xs text-color-2 block mb-1 uppercase">Username</label>
					<input type="text" id="username" name="username" ref={register({required:true,maxLength:40,minLength:5,validate: (val)=>validator.isAlphanumeric(validator.rtrim(validator.ltrim(val)))})} onBlur={isExist} className={input_style} placeholder="Username" autoComplete="off"/>
					{errors.username && errors.username.type  && printError(userErr[errors.username.type]) || loading || available}
				</div>
				<div className="mb-8">
					<label className="outline-none tracking-wide font-bold text-xs text-color-2 block mb-1 uppercase">Password</label>
					<input id="password" type="password" name="password" ref={register({required:true,minLength:8})} className={input_style} placeholder="Password"/>
					{errors.password && printError("Password must contain at least 8 characters.")}
				</div>
				<div className="mb-8">
					<label className="outline-none tracking-wide font-bold text-xs text-color-2 block mb-1 uppercase">Confirm password.</label>
					<input type="password" id="confirmPassword" name="confirmPassword" ref={register({required:true,validate:confirmPass})} onChange={updateBorder.bind(null,"confirmPassword")} className="tracking-wide text-gray-600 w-full border-b border-color-2 px-4 py-2" placeholder="Confirm password"/>
					{errors.confirmPassword && printError("Password doesn't match.")}
				</div>
				<div className="mb-8">
					<button type="submit" id="buttonReg" className="disabled px-2 py-1 w-full bg-color-2 rounded text-color-1 tracking-wide">Register</button>
				</div>
				<p className="text-center text-gray-600 text-xs">or</p>
				<Link href="/login"><a className="mt-2  text-center text-xs text-color-2 block underline ">Already have an account? Login.</a></Link>
				
			</form>
		</div>
		
	)
	
}

export default Register