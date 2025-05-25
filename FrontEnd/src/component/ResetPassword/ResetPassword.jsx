import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { verifyResetCode, resetPassword } from '../../api/index';
import styles from './ResetPassword.module.css';
import Form from '../sharedComponents/Form/Form';
import FormHeader from '../sharedComponents/FormHeader/FormHeader';
import FormFieldsContainer from '../sharedComponents/FormFieldsContainer/FormFieldsContainer';
import TextInput from '../sharedComponents/Text-Input/Text-Input';
import Button from '../sharedComponents/Button/Button';
import Loading from '../Loading/Loading';
import { passwordSideIcon } from '../../constants';

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const emailFromProps = location.state?.email;
  const [email] = useState(emailFromProps || '');

  const [step, setStep] = useState(1); // 1: verify code, 2: reset password
  const [loading, setLoading] = useState(false);

  // Step 1 states
  const [verificationCode, setVerificationCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [resetToken, setResetToken] = useState('');

  // Step 2 states
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useEffect(() => {
    if (!email) {
      toast.error('No email found for password reset');
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  const clearErrors = () => {
    setCodeError('');
    setPasswordError('');
    setConfirmPasswordError('');
  };

  const handleVerificationCodeChange = (value) => {
    clearErrors();
    setVerificationCode(value);
  };

  const handleNewPasswordChange = (value) => {
    clearErrors();
    setNewPassword(value);
  };

  const handleConfirmPasswordChange = (value) => {
    clearErrors();
    setConfirmPassword(value);
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    return '';
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    if (!verificationCode.trim()) {
      setCodeError('Verification code is required');
      return;
    }

    if (verificationCode.length !== 6) {
      setCodeError('Verification code must be 6 digits');
      return;
    }

    setLoading(true);
    try {
      const response = await verifyResetCode({ email, code: verificationCode });
      setResetToken(response.token);
      setStep(2);
      toast.success('Code verified! Now enter your new password.');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Invalid or expired code';
      if (errorMessage.includes('Code invalide')) {
        setCodeError('Invalid verification code');
      } else if (errorMessage.includes('Code expiré')) {
        setCodeError('Verification code has expired');
      } else {
        setCodeError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    clearErrors();

    const passwordValidationError = validatePassword(newPassword);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {

      const response = await resetPassword({
        email: email,
        newPassword: newPassword,
        code: verificationCode,
      });

      toast.success(response.message || 'Password reset successful!');
      navigate('/auth/sign-in');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Failed to reset password';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToForgotPassword = () => {
    navigate('/forgot-password');
  };

  if (loading) {
    return <Loading />;
  }

  if (!email) {
    return <Loading />;
  }

  if (step === 1) {
    return (
      <Form onSubmit={handleVerifyCode}>
        <FormHeader text="Enter Reset Code" />
        <div className={styles.instructions}>
          <p>We've sent a 6-digit reset code to:</p>
          <strong>{email}</strong>
          <p>Please enter the code below to continue.</p>
        </div>
        <FormFieldsContainer>
          <TextInput
            type="text"
            name="verificationCode"
            placeholder="Enter 6-digit code"
            value={verificationCode}
            sideIcon={null}
            setValue={handleVerificationCodeChange}
            error={codeError}
            maxLength={6}
            required
          />
        </FormFieldsContainer>
        <Button
          type="submit"
          text="Verify Code"
          disabled={loading}
          onClick={handleVerifyCode}
        />
        <div className={styles.footer}>
          <button
            type="button"
            onClick={handleBackToForgotPassword}
            className={styles.backButton}
          >
            ← Back to Forgot Password
          </button>
        </div>
      </Form>
    );
  }

  return (
    <Form onSubmit={handleResetPassword}>
      <FormHeader text="Reset Password" />
      <div className={styles.instructions}>
        <p>Enter your new password below.</p>
      </div>
      <FormFieldsContainer>
        <TextInput
          type="password"
          name="newPassword"
          placeholder="New Password"
          sideIcon={passwordSideIcon}
          value={newPassword}
          setValue={handleNewPasswordChange}
          error={passwordError}
          autoComplete="new-password"
          required
        />
        <TextInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          sideIcon={passwordSideIcon}
          value={confirmPassword}
          setValue={handleConfirmPasswordChange}
          error={confirmPasswordError}
          autoComplete="new-password"
          required
        />
      </FormFieldsContainer>
      <Button
        type="submit"
        text="Reset Password"
        disabled={loading}
        onClick={handleResetPassword}
      />
    </Form>
  );
}
