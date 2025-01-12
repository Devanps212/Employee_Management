import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { REMOVE_TOKEN } from "../../feature/redux/reducer";

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector((state: {token: string | null})=>state.token)

    useEffect(()=>{
        if(!token)navigate('/')
    }, [token, navigate])

  const handleLoginLogout = () => {
        dispatch({type: REMOVE_TOKEN})
  }

  return (
    <header className="fixed w-screen bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          {token && (
            <>
              <Link to="/employeeManage" className="hover:bg-blue-500 px-3 py-2 rounded-md">
                Employee Management
              </Link>
              <Link to="/departmentManage" className="hover:bg-blue-500 px-3 py-2 rounded-md">
                Department Managements
              </Link>
            </>
          )}
        </div>
        <button
          onClick={handleLoginLogout}
          className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600">
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header
