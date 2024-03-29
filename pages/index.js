import Link from "next/link"

function Index(){
	return (
		<>
			<div>
			<nav className="bg-color-2 fixed flex justify-center sm:justify-between items-center flex-col sm:flex-row text-color-1 p-2 sm:p-3 w-full">

				<div className="flex flex-shrink-0 sm:mr-6 font-bold">
					<Link href="/browse"><p className="px-2 underline">Browse</p></Link>
					<p className="px-2">About</p>
					<p className="px-2">Services</p>
					<Link href="/login"><p className="px-2 underline">Sign-in</p></Link>
					
				</div>

			</nav>
			
			<div className="pt-20 sm:pt-48"></div>
			
			<div className="">
				<div className=" p-5 w-auto">
					<h1 className="mb-8 text-5xl text-center text-color-2 tracking-wide font-extrabold mx-auto">grasspart.</h1>
					<p className="text-gray-600 w-auto sm:w-1/3 text-center mx-auto">A <span className="text-color-2 font-bold">social platform</span> made for merchants and alike where one can use our services to advertise products free of cost.</p>
				</div>
			</div>
			
			</div>
		</>
	)	
}

export default Index
	