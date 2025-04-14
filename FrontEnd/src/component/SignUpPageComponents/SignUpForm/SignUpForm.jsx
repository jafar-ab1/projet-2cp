import { useEffect, useState } from "react"
import useAuth from "../../../hooks/auth/useAuth"
import { Link } from "react-router-dom" 

import styles from "./SignUpForm.module.css"

import Form from "../../sharedComponents/Form/Form"
import FormHeader from "../../sharedComponents/FormHeader/FormHeader"
import FormFieldsContainer from "../../sharedComponents/FormFieldsContainer/FormFieldsContainer"
import TextInput from "../../sharedComponents/Text-Input/Text-Input"
import Button from "../../sharedComponents/Button/Button"
import { passwordSideIcon } from "../../../constants"
import toast from "react-hot-toast"
import Loading from "../../Loading/Loading"
import { registerUserDataValidationSchema } from "../../../validation/auth/auth"

export default function SignUpForm() {
    const { loading, err, actions: { register } } = useAuth();

    const [formData, setFormData] = useState({
        "mobile-number": "",
        "full-name": "",
        username: "",
        password: "",
    });

    const setUsername     = (username) => setFormData((prev) => ({ ...prev, username }));
    const setPassword     = (password) => setFormData((prev) => ({ ...prev, password }));
    const setMobileNumber = (number) => setFormData((prev) => ({ ...prev, "mobile-number": number }));
    const setFullName     = (fullname) => setFormData((prev) => ({ ...prev, "full-name": fullname }));

    const [formDataError, setFormDataError] = useState({
        "mobile-number": "",
        "full-name": "",
        username: "",
        password: "",
        form: ""
    })

    const handleSignUpButtonClick = async () => {
        const registerUserData = {
            "mobile-number": formData["mobile-number"],
            "full-name": formData["full-name"],
            username: formData.username,
            password: formData.password
        };

        const validationResult = registerUserDataValidationSchema.safeParse(registerUserData);

        // check for success and send the request

        // else put the errors in the state 
    }

    const handleSignWithGoogleClick = async () => {
        return;
    }

    useEffect(() => {
        if(!err) return;
        
        // check for the status codes
        toast.error("failed to register");
    }, [err]);

    if(loading) {
        return <Loading />
    }

    return(
        <Form>
            <FormHeader text="Sign up"/>
            <Button
                onClick={handleSignWithGoogleClick}
                text="continue with Google"
            />
            <div className={styles.separator}>
                <div></div>
                <p>Or</p>
                <div></div>
            </div>
            <FormFieldsContainer>
                <TextInput
                    canBeHidden={false}
                    name={"mobile-number"} 
                    placeholder={"Mobile number or email"} 
                    sideIcon={null} 
                    value={formData["mobile-number"]}
                    setValue={setMobileNumber} 
                />
                <TextInput
                    canBeHidden={false}
                    name={"full-name"} 
                    placeholder={"Full name"} 
                    sideIcon={null} 
                    value={formData["full-name"]}
                    setValue={setFullName} 
                />
                <TextInput 
                    canBeHidden={false}
                    name={"username"} 
                    placeholder={"Username"} 
                    sideIcon={null} 
                    value={formData.username}
                    setValue={setUsername} 
                />
                <TextInput
                    canBeHidden={true}
                    name={"password"} 
                    placeholder={"Password"} 
                    sideIcon={passwordSideIcon} 
                    value={formData.password}
                    setValue={setPassword} 
                />
            </FormFieldsContainer>
            <Button
                onClick={handleSignUpButtonClick}
                text="Sign up"
            />
            <div className={styles.footer}>
                <p>Already have an account? <Link to="/sign-in">sign in</Link></p>
            </div>
        </Form>
    )
}