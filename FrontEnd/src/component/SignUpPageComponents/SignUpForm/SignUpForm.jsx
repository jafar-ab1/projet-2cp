import { useState } from "react"
import { Link } from "react-router-dom" 

import styles from "./SignUpForm.module.css"


import Form from "../../sharedComponents/Form/Form"
import FormHeader from "../../sharedComponents/FormHeader/FormHeader"
import FormFieldsContainer from "../../sharedComponents/FormFieldsContainer/FormFieldsContainer"
import TextInput from "../../sharedComponents/Text-Input/Text-Input"
import Button from "../../sharedComponents/Button/Button"
import { passwordSideIcon } from "../../../constants"

export default function SignInForm() {
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

    const handleSignUpButtonClick = async () => {
        return;
    }

    const handleSignWithGoogleClick = async () => {
        return;
    }

    return(
        <Form>
            <FormHeader text="Sign in"/>
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