import {useAuth} from "../context/Auth"
import {withProtect} from "../hoc/ProtectRoute.js"

function Dashboard(props){
	return (
		<div>
			<h1>{props.id}</h1>
		</div>
	)
}


export const getServerSideProps = withProtect()

export default Dashboard