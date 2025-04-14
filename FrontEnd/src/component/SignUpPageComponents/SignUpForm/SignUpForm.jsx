import { useEffect, useState } from "react";
import useAuth from "../../../hooks/auth/useAuth";
import { Link, useNavigate } from "react-router-dom";

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

export default function SignUpForm() {
    const navigate = useNavigate();

    const { loading, err, accessToken, actions: { register } } = useAuth();

    const [formData, setFormData] = useState({
        mobileNumber: "",
        fullName: "",
        email: "",
        password: "",
    });

    const [formDataError, setFormDataError] = useState({
        mobileNumber: "",
        fullName: "",
        email: "",
        password: "",
        form: ""
    });

    const clearErrors = () => setFormDataError({
        mobileNumber: "",
        fullName: "",
        email: "",
        password: "",
        form: ""
    });

    const setMobileNumber = (value) =>
        setFormData((prev) => ({ ...prev, mobileNumber: value }));
    const setFullName = (value) =>
        setFormData((prev) => ({ ...prev, fullName: value }));
    const setEmail = (value) =>
        setFormData((prev) => ({ ...prev, email: value }));
    const setPassword = (value) =>
        setFormData((prev) => ({ ...prev, password: value }));

    const handleChange = (setFieldFn) => {
        return (value) => {
            clearErrors();
            setFieldFn(value);
        };
    };

    const handleSignUpButtonClick = async () => {
        const registerUserData = formData;
        const validationResult = registerUserDataValidationSchema.safeParse(registerUserData);

        const { success } = validationResult;
        if (success) {
            return await register(formData);
        }

        const fieldErrors = validationResult.error.formErrors.fieldErrors;
        setFormDataError({
            mobileNumber: fieldErrors?.mobileNumber?.[0] || "",
            fullName: fieldErrors?.fullName?.[0] || "",
            email: fieldErrors?.email?.[0] || "",
            password: fieldErrors?.password?.[0] || "",
            form: "Please correct the highlighted fields."
        });
    };

    const handleSignWithGoogleClick = async () => {
        return;
    };

    useEffect(() => {
        if (!err) return;
        const { status } = err;
        if(status == 401) {
            toast.error("Email already used");
        } else {
            toast.error("Internal server error");
        }
    }, [err]);

    useEffect(() => {
        if(!accessToken) return;
        navigate("/");
    }, [accessToken])

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
                    placeholder="Mobile number"
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
                    name="email"
                    placeholder="Email"
                    sideIcon={null}
                    value={formData.email}
                    setValue={handleChange(setEmail)}
                    error={formDataError.email}
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
