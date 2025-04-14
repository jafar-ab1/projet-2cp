import { useEffect, useState } from "react";
import useAuth from "../../../hooks/auth/useAuth";
import { Link } from "react-router-dom";

import styles from "./SignUpForm.module.css";

import Form from "../../sharedComponents/Form/Form";
import FormHeader from "../../sharedComponents/FormHeader/FormHeader";
import FormFieldsContainer from "../../sharedComponents/FormFieldsContainer/FormFieldsContainer";
import TextInput from "../../sharedComponents/Text-Input/Text-Input";
import Button from "../../sharedComponents/Button/Button";
import { passwordSideIcon } from "../../../constants";
import toast from "react-hot-toast";
import Loading from "../../Loading/Loading";
import { registerUserDataValidationSchema } from "../../../validation/auth/auth";

export default function SignInForm() {
    const { loading, err, actions: { register } } = useAuth();

    const [formData, setFormData] = useState({
        mobileNumber: "",
        fullName: "",
        username: "",
        password: "",
    });

    const [formDataError, setFormDataError] = useState({
        mobileNumber: "",
        fullName: "",
        username: "",
        password: "",
        form: ""
    });

    const clearErrors = () => setFormDataError({
        mobileNumber: "",
        fullName: "",
        username: "",
        password: "",
        form: ""
    });

    const setMobileNumber = (value) =>
        setFormData((prev) => ({ ...prev, mobileNumber: value }));
    const setFullName = (value) =>
        setFormData((prev) => ({ ...prev, fullName: value }));
    const setUsername = (value) =>
        setFormData((prev) => ({ ...prev, username: value }));
    const setPassword = (value) =>
        setFormData((prev) => ({ ...prev, password: value }));

    const handleChange = (setFieldFn) => {
        return (value) => {
            clearErrors();
            setFieldFn(value);
        };
    };

    const handleSignUpButtonClick = async () => {
        const validationResult = registerUserDataValidationSchema.safeParse(formData);

        if (validationResult.success) {
            await register(formData);
            return;
        }

        const fieldErrors = validationResult.error.formErrors.fieldErrors;

        setFormDataError({
            mobileNumber: fieldErrors?.mobileNumber?.[0] || "",
            fullName: fieldErrors?.fullName?.[0] || "",
            username: fieldErrors?.username?.[0] || "",
            password: fieldErrors?.password?.[0] || "",
            form: "Please correct the highlighted fields."
        });
    };

    const handleSignWithGoogleClick = async () => {
        return;
    };

    useEffect(() => {
        if (!err) return;
        toast.error("Invalid email or password");
    }, [err]);

    if (loading) return <Loading />;

    return (
        <Form>
            <FormHeader text="Sign up" />
            <Button
                onClick={handleSignWithGoogleClick}
                text="Continue with Google"
                type="button"
            />
            <div className={styles.separator}>
                <div></div>
                <p>Or</p>
                <div></div>
            </div>
            <FormFieldsContainer>
                <TextInput
                    canBeHidden={false}
                    name="mobileNumber"
                    placeholder="Mobile number or email"
                    sideIcon={null}
                    value={formData.mobileNumber}
                    setValue={handleChange(setMobileNumber)}
                    error={formDataError.mobileNumber}
                />
                <TextInput
                    canBeHidden={false}
                    name="fullName"
                    placeholder="Full name"
                    sideIcon={null}
                    value={formData.fullName}
                    setValue={handleChange(setFullName)}
                    error={formDataError.fullName}
                />
                <TextInput
                    canBeHidden={false}
                    name="username"
                    placeholder="Username"
                    sideIcon={null}
                    value={formData.username}
                    setValue={handleChange(setUsername)}
                    error={formDataError.username}
                />
                <TextInput
                    canBeHidden={true}
                    name="password"
                    placeholder="Password"
                    sideIcon={passwordSideIcon}
                    value={formData.password}
                    setValue={handleChange(setPassword)}
                    error={formDataError.password}
                />
            </FormFieldsContainer>
            <Button
                onClick={handleSignUpButtonClick}
                text="Sign up"
                type="button"
            />
            {formDataError.form && <p className={styles.error}>{formDataError.form}</p>}
            <div className={styles.footer}>
                <p>Already have an account? <Link to="/sign-in">Sign in</Link></p>
            </div>
        </Form>
    );
}
