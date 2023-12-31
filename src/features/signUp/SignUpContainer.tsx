import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Component } from './components/Component';
import { useSignUp } from './hooks/useSignUp';
import { Success } from './components/Success';
import { FormError } from '../shared/FormError';

interface InitialValuesTypes {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  password: string;
  accept: boolean;
}

const initialValues: InitialValuesTypes = {
  firstName: '',
  lastName: '',
  email: '',
  bio: '',
  password: '',
  accept: false,
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required('What is your first name?'),
  lastName: yup.string().required('What is your last name?'),
  email: yup
    .string()
    .required('Provide your email address')
    .email('Provide a valid email address'),
  bio: yup
    .string()
    .required('Provide your bio?')
    .min(15, 'Minimum of 15 characters')
    .max(255, 'Maximum of 255 characters'),
  password: yup
    .string()
    .required('Provide your password')
    .min(8, 'At least 8 characters long'),
  accept: yup
    .boolean()
    .required('Accept our terms')
    .oneOf([true], 'To sign up, you must agree to our Terms of service.'),
});

export const SignUpContainer = () => {
  const { status, signUp } = useSignUp();

  const handleSubmit = async (values: InitialValuesTypes) => {
    await signUp({ isSeller: false, ...values });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form className='space-y-8'>
          {status.state === 'success' ? (
            <Success email={formik.values.email} />
          ) : (
            <Component isLoading={status.isLoading} />
          )}
          {status.state === 'error' ? <FormError error={status.error} /> : null}
        </Form>
      )}
    </Formik>
  );
};
