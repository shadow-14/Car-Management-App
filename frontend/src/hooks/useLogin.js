import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;  // For Vite


const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login = async (email, password) => {
        // console.log(username, password);
		const success = handleInputErrors(email, password);

		if (!success) return;
		setLoading(true);
       
		try {
            const data =  await axios({
                method: 'POST',
                url: `${apiUrl}/api/users/login`,
                data: {email,password},
            })
            
			
            // console.log(data.data.token);
			if (data.data.error) {
				throw new Error(data.data.error);
			}

			localStorage.setItem("authUser", JSON.stringify(data.data.token));
			setAuthUser(data.data.token);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}