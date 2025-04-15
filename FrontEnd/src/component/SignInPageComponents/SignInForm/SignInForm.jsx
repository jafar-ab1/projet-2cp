import { useEffect, useState } from "react"
import { Link } from "react-router-dom" 
import useAuth from "../../../hooks/auth/useAuth"

import styles from "./SignInForm.module.css"

import { passwordSideIcon, usernameSideIcon } from "../../../constants"
import Form from "../../sharedComponents/Form/Form"
import FormHeader from "../../sharedComponents/FormHeader/FormHeader"
import FormFieldsContainer from "../../sharedComponents/FormFieldsContainer/FormFieldsContainer"
import TextInput from "../../sharedComponents/Text-Input/Text-Input"
import CheckBoxInput from "../../sharedComponents/CheckBox-Input/CheckBox-Input"
import Button from "../../sharedComponents/Button/Button"
import Loading from "../../Loading/Loading"
import toast from "react-hot-toast"
import {  useNavigate } from "react-router-dom";

import { loginUserDataValidationSchema } from "../../../validation/auth/auth"

export default function SignInForm() {
    const navigate = useNavigate();
    const { loading, err, accessToken, actions: { login } } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const setEmail = (email) => setFormData((prev) => ({ ...prev, email }));
    const setPassword = (password) => setFormData((prev) => ({ ...prev, password }));
    const toggleRememberMe = () => setFormData((prev) => ({ ...prev, rememberMe: !prev.rememberMe })); 

    const [formDataError, setFormDataError] = useState({
        email: "",
        password: "",
    });

    const clearErrors = () => setFormDataError({
        email: "",
        password: "",
    });


    const handleSignInButtonClick = async () => {
        const loginUserData = { 
            email: formData.email,
            password: formData.password
        };

        const validationResult = loginUserDataValidationSchema.safeParse(loginUserData);
        const { success } = validationResult;
        
        if(success) return await login(loginUserData);
        
        const { error: { formErrors: { fieldErrors } } } = validationResult;
        return setFormDataError({
            email: (fieldErrors?.email || [""])[0],
            password: (fieldErrors?.password || [""])[0],
        });
    }


    const handleChange = (setState) => {
        return (value) => {
            clearErrors();
            return setState(value);
        }
    }

    useEffect(() => {
        if(!err) return;
        const {status}=err;
        if (status == 401){
            toast.error("Email or password incorrect")

        }
    }, [err]);

  
    useEffect(() => {
        if(!accessToken) return;
        navigate("/");
    }, [accessToken])
    if(loading) {
        return <Loading />
    }

    return(
        <Form>
            <FormHeader text="Sign in"/>
            { formDataError.form !== "" && <p className={styles.formError}>{formDataError.form}</p> }
            <FormFieldsContainer>
                <TextInput 
                    canBeHidden={false}
                    name={"email"} 
                    placeholder={"Email"} 
                    sideIcon={usernameSideIcon} 
                    value={formData.email}
                    setValue={handleChange(setEmail)}
                    error={formDataError.email}
                />
                <TextInput
                    canBeHidden={true}
                    name={"password"} 
                    placeholder={"Password"} 
                    sideIcon={passwordSideIcon} 
                    value={formData.password}
                    setValue={handleChange(setPassword)} 
                    error={formDataError.password}
                />
                <div className={styles.rememberMe}>
                    <CheckBoxInput 
                        isChecked={formData.rememberMe}
                        toggle={toggleRememberMe}
                        text="remember me"
                    />
                    <Link to="/forgotPassword">forgot password?</Link>
                </div>
            </FormFieldsContainer>
            <Button
                onClick={handleSignInButtonClick}
                text="Sign in"
            />
            <div className={styles.footer}>
                <p>Don't have an account? <Link to="/sign-up">register</Link></p>
            </div>
        </Form>
    )
}