import React, {createContext,useContext, useState} from"react"
import axios from "axios"

const AuthContext = createContext();

function AuthProvider(props){
	const [user, setUser] = useState(null)
	
	const authorize = (user) => {
		setUser(user)
	}
	
	return (
		<AuthContext.Provider value={{isAuthenticated: !!user, user,authorize}}>
			{props.children}
		</AuthContext.Provider>
	)

}

const AuthConsumer = AuthContext.Consumer

export function useAuth(){
	const context = useContext(AuthContext)
	return context
}

export {AuthProvider, AuthConsumer}

