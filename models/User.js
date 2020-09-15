const agent = require("../lib/pg_db.js")
const blanket = require("../lib/procScrypt")


const User = {
	create: async(data)=>{
		const coldy = await blanket(data.password,data.username + data.username)
		const values = [data.username,coldy.toString("hex"),data.email]
		const res = await agent.query("INSERT INTO users(user_username,user_password,user_email,user_token) VALUES($1,$2,$3,NULL)",values)
		return (res && res.rowCount) ? true: false
		
	},
	userExist: async(user) => {
		const res = await agent.query("SELECT user_id FROM users WHERE user_username = $1",[user])
		return (res &&res.rowCount) ? true:false
	},
	emailExist: async (email) => {
		const res = await agent.query("SELECT user_id FROM users WHERE user_email = $1",[email])
		return (res && res.rowCount) ? true:false
	},
	attachToken: async (user,token) => {
		const res = await agent.query("UPDATE users  SET user_token = $2 WHERE user_username = $1",[user,token])
		return res.rowCount ? true:false
	},
	verifySession: async (session) => {
		console.log("entered")
		const res = await agent.query("SELECT user_token FROM users WHERE user_username = $1",[session.user])
		const [data] = res.rows
		return (session.token == data.user_token) ? true:false
	},
	verifyUser: async(credentials) => {
		const values = [credentials.username]
		const res = await agent.query("SELECT user_username,user_password FROM users WHERE user_username = $1",values)
		if(!res || !res.rowCount) return false
		const [data] = res.rows
		const coldy = blanket.SHA256(credentials.username + credentials.password).toString(blanket.enc.Base64)
		if(data.user_password === coldy) return true
		return false
	},
	connect: async () =>{
		let res = await agent.connect()
		return res
	},
	disconnect: async () => {
		let res = await agent.disconnect()
		return res
	}
}

module.exports = User