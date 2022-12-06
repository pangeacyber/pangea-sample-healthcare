import PatientIndex from "./patients/PatientIndex"

const Home = (props) => {
	// const { msgAlert, user } = props
	// console.log('props in home', props)
	const { msgAlert} = props
    const { user } = props

	return (
		
		<div className="homeContainerMiddleBody">
			{/* <div className="image-doctor"> */}
				{/* <img className="dr-picture img-fuild" src={doctorSmilePic}></img> */}
			{/* </div> */}

			<div className="hold-afterpicture">

					<h2 className="h2themedics">The Medics</h2>

					<h3>See the Patients</h3>
					{
						user
						?
						<PatientIndex 
							msgAlert= { msgAlert }
							user={user}
						/>
						:
						<p>log in to see patients.</p>
					}

			</div>

			{/* <footer className="footerHomeBody">
					<h3>
						ola.
					</h3>
			</footer> */}

						<footer className="footerHomeBody">
								
						</footer>

				</div>			


		
	)
}

export default Home
