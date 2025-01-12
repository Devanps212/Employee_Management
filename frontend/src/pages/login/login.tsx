import axios, { AxiosError, AxiosResponse } from "axios";
import DynamicForm from "../../components/form/form";
import { LOGIN } from "../../constants";
import config from "../../config/config";
import { useSelector, useDispatch } from "react-redux";
import { SET_TOKEN } from "../../feature/redux/reducer";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const dispatch = useDispatch()
  const token = useSelector((state: {token: string | null})=>state.token)
  const navigate = useNavigate()

  console.log(token)

  const handleSubmit = async(values:Record<string, string>)=>{
    try{

      const response: AxiosResponse = await axios.post(config.login, values)
      const token : string = response.data.token
      dispatch({type:SET_TOKEN, payload: token})
      alert(response.data.message)
      navigate('/manage')

    }catch(error: unknown){
      if(error instanceof AxiosError){
        alert(error.response?.data.message)
        return
      }
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
  );
};

export default Login;
