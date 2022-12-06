import { Navigate } from 'react-router-dom'

export default function RequireAuth({ user, children }) {

	return user !== null ? children : <Navigate to='/' replace />
}
