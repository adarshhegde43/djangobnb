'use client';

import Modal from "./Modal";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useSignUpModal from "@/app/hooks/useSignUpModal";
import CustomButton from "../forms/CustomButton";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";


const SignUpModal = () => {
    const router = useRouter();
    const signUpModal = useSignUpModal()
    const [email , setEmail] = useState("");
    const [password1 , setPassword1 ] = useState("");
    const [password2 , setPassword2 ] = useState("");
    const [errors , setError] = useState<string[]>([]);

    //Submit functionality...
    const submitSignup = async() => {
        const formData = {
            email:email,
            password1: password1,
            password2:password2
        }

        const response = await apiService.postWithoutToken('/api/auth/register/' , formData)
        console.log('Signup API Response:', response);

        if (response.access) {
            handleLogin(response.user.pk , response.access , response.refresh);

            signUpModal.close();
            router.push('/')
        }
        else{
            const tmpErrors : string[] = Object.values(response).map((error : any) => {
                return error;
            })

            setError(tmpErrors);
        }
    }


    const content = (
        <>
            <form action = {submitSignup} className="space-y-4" >
                <input onChange={(e) => setEmail(e.target.value)} placeholder="Your e-mail address" type="email" className="w-full h-[54px] px-4 border border-gray-300 bg-gray-50 rounded-xl focus:bg-white focus:border-black" />
                <input onChange={(e) => setPassword1(e.target.value)} placeholder="Your password" type="password" className="w-full h-[54px] px-4 border border-gray-300 bg-gray-50 rounded-xl focus:bg-white focus:border-black" />
                <input onChange={(e) => setPassword2(e.target.value)} placeholder="Repeat password" type="password" className="w-full h-[54px] px-4 border border-gray-300 bg-gray-50 rounded-xl focus:bg-white focus:border-black" />

                {errors.map((error , index) => {
                    return (
                        <div key={`error${index}`} className="p-5 bg-airbnb text-white rounded-xl opacity-80">
                            {error}
                        </div>
                    )
                })}

                <CustomButton
                    label="Submit"
                    onClick={submitSignup}
                />
            </form>
        </>
    )

    return (
        <Modal
            isOpen = {signUpModal.isOpen}
            close = {signUpModal.close}
            label = "Sign Up"
            content={content}
        />
    )
}

export default SignUpModal;