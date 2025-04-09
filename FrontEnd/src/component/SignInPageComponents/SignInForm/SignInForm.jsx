import { useState } from "react"
import { Link } from "react-router-dom" 

import styles from "./SignInForm.module.css"

import { passwordSideIcon, usernameSideIcon } from "../../../constants"

import Form from "../../sharedComponents/Form/Form"
import FormHeader from "../../sharedComponents/FormHeader/FormHeader"
import FormFieldsContainer from "../../sharedComponents/FormFieldsContainer/FormFieldsContainer"
import TextInput from "../../sharedComponents/Text-Input/Text-Input"
import CheckBoxInput from "../../sharedComponents/CheckBox-Input/CheckBox-Input"
import Button from "../../sharedComponents/Button/Button"

export default function SignInForm() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        rememberMe: false,
    });

    const setUsername = (username) => setFormData((prev) => ({ ...prev, username }));
    const setPassword = (password) => setFormData((prev) => ({ ...prev, password }));
    const toggleRememberMe = () => setFormData((prev) => ({ ...prev, rememberMe: !prev.rememberMe })); 


    const handleSignInButtonClick = async () => {
        return;
    }

    return(
        <Form>
            <FormHeader text="Sign in"/>
            <FormFieldsContainer>
                <TextInput 
                    canBeHidden={false}
                    name={"username"} 
                    placeholder={"Username"} 
                    sideIcon={usernameSideIcon} 
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