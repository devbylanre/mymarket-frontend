import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useSignIn } from './hooks/useSignIn';
import { Component } from './components/Component';
import { Error } from './components/Error';
import { Success } from './components/Success';

interface InitialValueTypes {
  email: string;
  password: string;
}

const initialValues: InitialValueTypes = {
  email: '',
  password: '',
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Provide your email address')
    .email('Only accept valid email address'),
  password: yup
    .string()
    .required('Provide your password')
    .min(8, 'Password must be at least 8 characters in length'),
});

export const SignInContainer = () => {
  const { resource, signIn } = useSignIn();

  const handleSubmit = async (values: InitialValueTypes) => {
    await signIn(values, (data) => console.log(data));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className='space-y-5'>
        {resource.state === 'success' ? (
          <Success />
        ) : (
          <>
            <Component isLoading={resource.isLoading} />
            {resource.error ? <Error error={resource.error} /> : null}
          </>
        )}
      </Form>
    </Formik>
  );
};
