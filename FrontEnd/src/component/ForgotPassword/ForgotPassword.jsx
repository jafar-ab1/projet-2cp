import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { forgotPassword } from "../../api/index";
import styles from "./ForgotPassword.module.css";
import Form from "../sharedComponents/Form/Form";
import FormHeader from "../sharedComponents/FormHeader/FormHeader";
import FormFieldsContainer from "../sharedComponents/FormFieldsContainer/FormFieldsContainer";
import TextInput from "../sharedComponents/Text-Input/Text-Input";
import Button from "../sharedComponents/Button/Button";
import Loading from "../Loading/Loading";
import { usernameSideIcon } from "../../constants";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [loading, setLoading] = useState(false);

    const clearErrors = () => {
        setEmailError("");
    };

    const handleEmailChange = (value) => {
        clearErrors();
        setEmail(value);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearErrors();

        if (!email.trim()) {
            setEmailError("Email is required");
            return;
        }

        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address");
            return;
        }

        setLoading(true);
        try {
            const response = await forgotPassword(email);
            toast.success(response.message || "Reset code sent to your email!");
            navigate("/reset-password", { 
                state: { email: email }
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to send reset code";
            if (error.response?.status === 404) {
                setEmailError("No account found with this email address");
            } else {
                toast.error(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormHeader text="Forgot Password" />
            <div className={styles.instructions}>
                <p>Enter your email address and we'll send you a code to reset your password.</p>
            </div>
            <FormFieldsContainer>
                <TextInput
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    sideIcon={usernameSideIcon}
                    value={email}
                    setValue={handleEmailChange}
                    error={emailError}
                    autoComplete="email"
                    required
                />
            </FormFieldsContainer>
            <Button 
                type="submit" 
                text={loading ? "Sending..." : "Send Reset Code"} 
                disabled={loading}
            />
            <div className={styles.footer}>
                <Link to="/auth/sign-in" className={styles.backLink}>
                    ← Back to Sign In
                </Link>
            </div>
        </Form>
    );
}