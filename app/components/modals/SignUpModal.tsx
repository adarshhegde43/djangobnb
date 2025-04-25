'use client';

import Modal from "./Modal";

import { useState } from "react";
import useSignUpModal from "@/app/hooks/useSignUpModal";
import CustomButton from "../forms/CustomButton";


const SignUpModal = () => {
    const signUpModal = useSignUpModal()

    const content = (
        <>
            <form className="space-y-4" >
                <input placeholder="Your e-mail address" type="email" className="w-full h-[54px] px-4 border border-gray-300 bg-gray-50 rounded-xl focus:bg-white focus:border-black" />
                <input placeholder="Your password" type="password" className="w-full h-[54px] px-4 border border-gray-300 bg-gray-50 rounded-xl focus:bg-white focus:border-black" />
                <input placeholder="Repeat password" type="password" className="w-full h-[54px] px-4 border border-gray-300 bg-gray-50 rounded-xl focus:bg-white focus:border-black" />

                <div className="p-5 bg-airbnb text-white rounded-xl opacity-80">
                    The error message
                </div>

                <CustomButton
                    label="Submit"
                    onClick={() => 
                        console.log("Test") 
                    }
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