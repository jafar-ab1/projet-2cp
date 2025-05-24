import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/auth/useAuth';
import styles from './SignInForm.module.css';
import { passwordSideIcon, usernameSideIcon } from '../../../constants';
import Form from '../../sharedComponents/Form/Form';
import FormHeader from '../../sharedComponents/FormHeader/FormHeader';
import FormFieldsContainer from '../../sharedComponents/FormFieldsContainer/FormFieldsContainer';
import TextInput from '../../sharedComponents/Text-Input/Text-Input';
import CheckBoxInput from '../../sharedComponents/CheckBox-Input/CheckBox-Input';
import Button from '../../sharedComponents/Button/Button';
import Loading from '../../Loading/Loading';
import toast from 'react-hot-toast';
import { loginUserDataValidationSchema } from '../../../validation/auth/auth';

export default function SignInForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    loading,
    err,
    accessToken,
    user,
    actions: { login, clearError },
  } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [formDataError, setFormDataError] = useState({
    email: '',
    password: '',
  });

  const clearErrors = () => {
    setFormDataError({ email: '', password: '' });
    clearError();
  };

  const setEmail = (email) =>
    setFormData((prev) => ({ ...prev, email }));

  const setPassword = (password) =>
    setFormData((prev) => ({ ...prev, password }));

  const toggleRememberMe = () =>
    setFormData((prev) => ({ ...prev, rememberMe: !prev.rememberMe }));

  const handleChange = (setState) => (value) => {
    clearErrors();
    setState(value);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    clearErrors();

    const loginUserData = {
      email: formData.email,
      password: formData.password,
    };

    const validationResult = loginUserDataValidationSchema.safeParse(loginUserData);

    if (!validationResult.success) {
      const { error: { formErrors: { fieldErrors } } } = validationResult;
      return setFormDataError({
        email: (fieldErrors?.email || [''])[0],
        password: (fieldErrors?.password || [''])[0],
      });
    }

    try {
      await login(loginUserData);
      // Navigation is handled by the useEffect
    } catch (error) {
      // handled in useEffect
    }
  };

  useEffect(() => {
    if (!err) return;

    if (err.status === 401) {
      toast.error('Email or password incorrect');
    } else if (err.message) {
      toast.error(err.message);
    }
  }, [err]);

useEffect(() => {
  if (accessToken !== null && user) {
    if (user.role === 'client') {
      navigate('/');
    } else if (user.role === 'admin') {
      navigate('/dashboard'); // or whatever your admin dashboard route is
    } else {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }
}, [accessToken, user, navigate, location.state]);
  if (loading) {
    return <Loading />;
  }

  return (
    <Form onSubmit={handleSignIn}>
      <FormHeader text="Sign in" />
      <FormFieldsContainer>
        <TextInput
          type="email"
          name="email"
          placeholder="Email"
          sideIcon={usernameSideIcon}
          value={formData.email}
          setValue={handleChange(setEmail)}
          error={formDataError.email}
          autoComplete="username"
          required
        />
        <TextInput
          type="password"
          name="password"
          placeholder="Password"
          sideIcon={passwordSideIcon}
          canBeHidden={true} // <--- This lets the icon toggle visibility
          value={formData.password}
          setValue={handleChange(setPassword)}
          error={formDataError.password}
          autoComplete="current-password"
          required
        />
        <div className={styles.rememberMe}>
          <CheckBoxInput
            isChecked={formData.rememberMe}
            toggle={toggleRememberMe}
            text="Remember me"
          />
          <Link to="/forgot-password" className={styles.forgotPassword}>
            Forgot password?
          </Link>
        </div>
      </FormFieldsContainer>
      <Button 
        type="submit" 
        text="Sign in" 
        disabled={loading}
        onClick={handleSignIn}
      />
      <div className={styles.footer}>
        <p>
          Don't have an account? <Link to="/auth/sign-up">Register</Link>
        </p>
      </div>
    </Form>
  );
}
