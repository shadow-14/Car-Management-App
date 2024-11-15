import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;  // For Vite

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({email, username, password, confirmPassword}) => {
		const success = handleInputErrors({ email, username, password, confirmPassword});
		if (!success) return;

		setLoading(true);
		
		try {
			// console.log(email, username, password);
			const res = await axios(`${apiUrl}/api/users/register`, {
				method: "POST",
				data: { username, email,password},
			});

			const data = await res.data;
			// console.log(data);
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("authUser", JSON.stringify(data.token));
			setAuthUser(data.token);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ email, username, password, confirmPassword}) {
	if (!email || !username || !password || !confirmPassword ) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}