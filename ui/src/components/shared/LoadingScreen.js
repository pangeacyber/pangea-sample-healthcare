import Spinner from 'react-bootstrap/Spinner'

const LoadingScreen = () => (
    <div style={{textAlign: 'center', display: 'flex', justifyContent: 'center', marginTop:10 }}>
        <h3>Loading..</h3>
        <Spinner role="status" animation="border">
            {/* <span className="visually-hidden">Loading...</span> */}
        </Spinner>
        
    </div>
)

export default LoadingScreen