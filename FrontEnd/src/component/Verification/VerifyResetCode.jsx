import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyResetCode } from '../../api';
import styles from './VerifyResetCodeForm.module.css';
import Form from '../../sharedComponents/Form/Form';
import FormHeader from '../../sharedComponents/FormHeader/FormHeader';
import TextInput from '../../sharedComponents/Text-Input/Text-Input';
import Button from '../../sharedComponents/Button/Button';
import toast from 'react-hot-toast';

export default function VerifyResetCodeForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const email = location.state?.email || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await verifyResetCode({ email, code });
      navigate('/reset-password', { 
        state: { 
          email,
          token: response.token 
        } 
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormHeader text="Verify Reset Code" />
      <div className={styles.instructions}>
        <p>Enter the 6-digit code sent to {email}</p>
      </div>
      <TextInput
        type="text"
        name="code"
        placeholder="Verification Code"
        value={code}
        setValue={setCode}
        maxLength={6}
        required
      />
      <Button 
        type="submit" 
        text={loading ? "Verifying..." : "Verify Code"} 
        disabled={loading}
      />
      <div className={styles.footer}>
        <p>Didn't receive a code? <a href="/forgot-password">Resend</a></p>
      </div>
    </Form>
  );
}