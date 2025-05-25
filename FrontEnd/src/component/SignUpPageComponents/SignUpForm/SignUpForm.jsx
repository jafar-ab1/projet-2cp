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
import {registerUserDataValidationSchema} from "../../../validation/auth/auth.js"
export default function SignUpForm() {
    const navigate = useNavigate();
    const { loading, err, accessToken, actions: { register, clearError } } = useAuth();

    const [formData, setFormData] = useState({
        mobileNumber: "",
        fullName: "",
        email: "",
        password: "",
        role: "client" // Default role
    });

    const [formDataError, setFormDataError] = useState({
        mobileNumber: "",
        fullName: "",
        email: "",
        password: "",
        role: "",
        form: ""
    });

    const clearErrors = () => setFormDataError({
        mobileNumber: "",
        fullName: "",
        email: "",
        password: "",
        role: "",
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
    const setRole = (value) =>
        setFormData((prev) => ({ ...prev, role: value }));

    const handleChange = (setFieldFn) => {
        return (value) => {
            clearErrors();
            clearError(); // Clear auth store errors
            setFieldFn(value);
        };
    };

    const handleRoleChange = (e) => {
        clearErrors();
        clearError();
        setRole(e.target.value);
    };

    const handleSignUpButtonClick = async () => {
        const registerUserData = formData;
        const validationResult = registerUserDataValidationSchema.safeParse(registerUserData);

        const { success } = validationResult;
        if (!success) {
            const fieldErrors = validationResult.error.formErrors.fieldErrors;
            setFormDataError({
                mobileNumber: fieldErrors?.mobileNumber?.[0] || "",
                fullName: fieldErrors?.fullName?.[0] || "",
                email: fieldErrors?.email?.[0] || "",
                password: fieldErrors?.password?.[0] || "",
                role: fieldErrors?.role?.[0] || "",
                form: "Please correct the highlighted fields."
            });
            return;
        }

        try {
            const result = await register(formData);
            
            if (result.requiresVerification) {
                toast.success(result.message || "Registration successful! Please verify your email.");
                navigate("/verify-email", { 
                    state: { email: result.email || formData.email }
                });
            } else if (result.success) {
                // Direct success (shouldn't happen with new flow)
                toast.success("Registration successful!");
                navigate("/");
            }
        } catch (error) {
            // Error handling is done in useEffect
        }
    };

    const handleSignWithGoogleClick = async () => {
        toast.error("Google sign-in not implemented yet");
    };

    // Handle errors from auth store
    useEffect(() => {
        if (!err) return;
        
        const { status } = err;
        if (status === 401) {
            toast.error("Email already used");
        } else if (status === 403 && err.requiresVerification) {
            // User tried to login but needs verification
            toast.error("Please verify your email before logging in");
            navigate("/verify-email", { 
                state: { email: err.email }
            });
        } else {
            toast.error("Internal server error");
        }
    }, [err, navigate]);

    // Redirect if already authenticated
    useEffect(() => {
        if (accessToken) {
            navigate("/");
        }
    }, [accessToken, navigate]);

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
                
                {/* Role Selection */}
                <div className={styles.roleSelection}>
                    <label htmlFor="role" className={styles.roleLabel}>Account Type:</label>
                    <select 
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleRoleChange}
                        className={`${styles.roleSelect} ${formDataError.role ? styles.error : ''}`}
                    >
                        <option value="client">client</option>
                        <option value="admin">admin</option>
                    </select>
                    {formDataError.role && (
                        <span className={styles.errorText}>{formDataError.role}</span>
                    )}
                </div>
            </FormFieldsContainer>
            <Button
                onClick={handleSignUpButtonClick}
                text="Sign up"
                type="button"
                disabled={loading}
            />
            {formDataError.form && <p className={styles.error}>{formDataError.form}</p>}
            <div className={styles.footer}>
                <p>Already have an account? <Link to="/auth/sign-in">Sign in</Link></p>
            </div>
        </Form>
    );
}