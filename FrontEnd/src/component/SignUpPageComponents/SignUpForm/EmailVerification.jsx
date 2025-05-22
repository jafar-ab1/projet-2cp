import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/auth/useAuth";
import toast from "react-hot-toast";
import Loading from "../../Loading/Loading";
import styles from "./EmailVerification.module.css";
import backgroundImage from '../../../../public/images/sign-in-page.cover.png';

export default function EmailVerification() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const { 
        loading, 
        err, 
        accessToken, 
        pendingVerificationEmail,
        actions: { verifyEmail, sendVerificationCode, clearError }
    } = useAuth();

    const emailFromProps = location.state?.email;
    const emailFromStore = pendingVerificationEmail;
    const email = emailFromProps || emailFromStore;

    const [verificationCode, setVerificationCode] = useState("");
    const [codeError, setCodeError] = useState("");
    const [resendLoading, setResendLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        if (!email) {
            toast.error("No email found for verification");
            navigate("/auth/sign-up");
        }
    }, [email, navigate]);

    useEffect(() => {
        if (accessToken) {
            navigate("/");
        }
    }, [accessToken, navigate]);

    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleVerificationCodeChange = (e) => {
        clearError();
        setCodeError("");
        setVerificationCode(e.target.value);
    };

    const handleVerifyClick = async () => {
        if (!verificationCode.trim()) {
            setCodeError("Verification code is required");
            return;
        }

        if (verificationCode.length !== 6) {
            setCodeError("Verification code must be 6 digits");
            return;
        }

        try {
            const result = await verifyEmail(email, verificationCode);
            if (result.success) {
                toast.success(result.message || "Email verified successfully!");
                navigate("/");
            }
        } catch (error) {
            if (error.response?.status === 400) {
                const message = error.response.data.message;
                if (message.includes("Code invalide")) {
                    setCodeError("Invalid verification code");
                } else if (message.includes("Code expiré")) {
                    setCodeError("Verification code has expired");
                } else {
                    setCodeError(message);
                }
            } else {
                toast.error("Verification failed. Please try again.");
            }
        }
    };

    const handleResendCode = async () => {
        if (countdown > 0) return;

        setResendLoading(true);
        try {
            await sendVerificationCode(email);
            toast.success("Verification code sent successfully!");
            setCountdown(60);
        } catch (error) {
            toast.error("Failed to send verification code. Please try again.");
        } finally {
            setResendLoading(false);
        }
    };

    const handleBackToSignIn = () => {
        navigate("/auth/sign-in");
    };

    if (loading) return <Loading />;
    if (!email) return <Loading />;

    return (
        <div className={styles.container} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className={styles.form}>
                <h1 className={styles.header}>Verify Your Email</h1>
                
                <div className={styles.instructions}>
                    <p>We've sent a 6-digit verification code to:</p>
                    <strong>{email}</strong>
                    <p>Please enter the code below to verify your email address.</p>
                </div>

                <input
                    type="text"
                    className={styles.inputField}
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={handleVerificationCodeChange}
                    maxLength={6}
                />
                {codeError && <p className={styles.error}>{codeError}</p>}

                <button
                    className={styles.primaryButton}
                    onClick={handleVerifyClick}
                    disabled={loading}
                >
                    {loading ? "Verifying..." : "Verify Email"}
                </button>

                <div className={styles.resendSection}>
                    <p>Didn't receive the code?</p>
                    <button
                        className={styles.secondaryButton}
                        onClick={handleResendCode}
                        disabled={countdown > 0 || resendLoading}
                    >
                        {countdown > 0 
                            ? `Resend in ${countdown}s` 
                            : resendLoading 
                                ? "Sending..." 
                                : "Resend Code"}
                    </button>
                </div>

                <div className={styles.footer}>
                    <button 
                        onClick={handleBackToSignIn}
                        className={styles.backButton}
                    >
                        ← Back to Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}