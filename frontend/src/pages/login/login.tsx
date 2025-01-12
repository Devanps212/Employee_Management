import DynamicForm from "../../components/form/form";
import { LOGIN } from "../../constants";
import { useDispatch } from "react-redux";
import { SET_TOKEN } from "../../feature/redux/reducer";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../../services/loginService";
const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (values: Record<string, string>) => {
    try{
      const token = await handleLogin(values)
      if (token!) {
        dispatch({ type: SET_TOKEN, payload: token })
        alert("Login successful!")
        navigate('/employeeManage')
      }
    }catch(error: unknown){
      alert(error)
    }
  }
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-sm p-8 border rounded-lg shadow-lg bg-white">
        <h1 className="text-center font-semibold text-blue-500 text-2xl mb-6">Login</h1>
        <DynamicForm inputsWithLabel={LOGIN} onSubmit={handleSubmit}/>
      </div>
    </div>
  )
}

export default Login
