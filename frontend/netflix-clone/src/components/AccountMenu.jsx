import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import axios from "axios";

const AccountMenu = ({
  visible
}) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const route = useNavigate()
  const { getAuthenticatedUser, userInfo } = useContext(AuthContext);

  const Logout = async () => {
    await axios({
      method: "POST",
      withCredentials: true,
      url: `${BASE_URL}/api/logout`
    })
      .then((res) => {
        getAuthenticatedUser();
        console.log(res.data);
        route('/auth')
      })
      .catch((err) => {
        console.log(err);
      })
  }


  if (!visible) return null;

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img className="w-8 rounded-md" src="/images/default-blue.png" alt="" />
          <p className="text-white text-sm group-hover/item:underline">{userInfo.username}</p>
        </div>
      </div>
      <hr className="bg-gray-600 border-0 h-px my-4" />
      <div onClick={() => Logout()} className="px-3 text-center text-white text-sm hover:underline">
        Sign out of Netflix
      </div>
    </div>
  )
}

export default AccountMenu