import Input from "./Input";
import { useState, useCallback, useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const route = useNavigate()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [variant, setVariant] = useState('login')

    // User Login Function

    const Login = async () => {
        const loginData = new FormData()
        loginData.append("email", email)
        loginData.append("password", password)

        await axios({
            method: 'post',
            withCredentials: true,
            url: `${BASE_URL}/api/login`,
            data: loginData,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': 'csrfToken'
            },
            credentials: 'include',

        })

            .then((res) => {
                route("/profile");
            })
            .catch((err) => {
                console.log(console.log(err));
            })
    }


    const Register = async () => {
        const form = new FormData();
        form.append('username', name);
        form.append('password', password);
        form.append('email', email);

        await axios({
            method: "POST",
            url: `${BASE_URL}/api/register`,
            data: form,
        })
            .then((res) => {
                setVariant('login');
            })
            .catch((err) => {
                console.log(err);
            })
    }





    const toggleVarient = useCallback(() => {
        setVariant((variant) => variant === 'login' ? 'register' : 'login');
    }, [])

    return (

        <div className="relative h-screen w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black lg:bg-opacity-50 w-ful h-full">
                <nav className="px-12 py-2">
                    <img src="./images/logo.png" alt="logo" className="h-12" />
                </nav>

                <div className="flex justify-center">
                    <div className="bg-black px-16 py-10 mt-2 self-center lg:bg-opacity-70 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === 'login' ? 'Sign In' : 'Register'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {
                                variant === 'register' &&
                                <Input id="name" type="text" label="Username" onChange={(e) => setName(e.target.value)} value={name} />
                            }

                            <Input id="email" type="email" label="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                            <Input id="password" type="password" label="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </div>

                        {
                            variant === 'register' ?
                                <button onClick={() => Register()} className="bg-red-600 py-3 text-white rounded-md w-full hover:bg-red-500 mt-10 transition">Register</button>
                                :
                                <button onClick={() => Login()} className="bg-red-600 py-3 text-white rounded-md w-full hover:bg-red-500 mt-10 transition">Login</button>
                        }

                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div className="
                                w-10
                                h-10
                                bg-white
                                rounded-full
                                flex
                                items-center
                                justify-center
                                cursor-pointer
                                hover: opacity-80
                                transition
                            "
                                onClick={() => { }}
                            >
                                <FcGoogle size={30} />

                            </div>

                            <div className="
                                w-10
                                h-10
                                bg-white
                                rounded-full
                                flex
                                items-center
                                justify-center
                                cursor-pointer
                                hover: opacity-80
                                transition
                                ">
                                <FaGithub size={30} />

                            </div>
                        </div>

                        <p className=" text-neutral-500 mt-5">
                            {variant === 'login' ? 'First time using Netflix?' : 'Already have account'}
                            <span onClick={toggleVarient} className="text-white ml-1 hover:underline cursor-pointer">
                                {variant === 'login' ? 'Create an account' : 'Login'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;