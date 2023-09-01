import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate } from "react-router-dom"

function IsPrivate(props) {

  const { isUserActive } = useContext(AuthContext)

  if (isUserActive === true) {
    return props.children // continua con la pagina
  } else {
    return <Navigate to="/login"/>
  }

}

export default IsPrivate