import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { SetupForm } from './components/SetupForm';
import { useSellerSetup } from './hooks/useSellerSetup';
import { FormError } from '../../shared/FormError';
import { useOutletContext } from 'react-router-dom';
import { Text } from '../../../components/Text';
import { User } from '../../../contexts/user.types';
import { Card, CardContent } from '../../../components/Card';
import { TbMoodNerd } from 'react-icons/tb';

interface InitialValues {
  name: string;
  description: string;
  country: string;
  state: string;
  city: string;
  address: string;
  accept: boolean;
}

const initialValues: InitialValues = {
  name: '',
  description: '',
  country: 'Nigeria',
  state: '',
  city: '',
  address: '',
  accept: false,
};

const validationSchema = yup.object().shape({
  name: yup.string().required('What is the name of your store'),
  description: yup
    .string()
    .required('Give your store description')
    .min(100, 'Minimum of 100 characters')
    .max(256, 'Maximum of 256 characters'),
  country: yup.string().required('Which country is your store located'),
  state: yup.string().required('Which state is your store located'),
  city: yup.string().required('Which city is your store located'),
  address: yup.string().required('Provide your store address'),
  accept: yup
    .boolean()
    .required('Accept our terms')
    .oneOf([true], 'To sign up, you must agree to our Terms of service.'),
});

export const SetupContainer = () => {
  const { status, sellerSetup } = useSellerSetup();
  const { isSeller } = useOutletContext() as Pick<User, 'isSeller'>;

  const handleSubmit = async (values: InitialValues) => {
    await sellerSetup({
      isSeller: true,
      store: {
        name: values.name,
        description: values.description,
        location: {
          city: values.city,
          state: values.state,
          country: values.country,
          address: values.address,
        },
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className='w-full mx-auto sm:w-4/5 lg:w-2/5'>
        {!isSeller ? (
          <SetupForm isLoading={status.isLoading} />
        ) : (
          <EmptyState />
        )}
        {status.state === 'error' ? <FormError error={status.error} /> : null}
      </Form>
    </Formik>
  );
};

const EmptyState = () => {
  return (
    <Card className='w-full p-0 ring-0 sm:w-96'>
      <CardContent className='flex flex-col items-center gap-y-3'>
        <TbMoodNerd className='w-8 h-8 stroke-zinc-400' />
        <div className='space-y-1 text-center'>
          <Text
            as='h6'
            weight={500}
          >
            You are now a seller
          </Text>
          <Text
            as='p'
            size='sm'
          >
            You no longer have access to this page, you can continue by creating
            a new a product, view your profile and build your community.
          </Text>
        </div>
      </CardContent>
    </Card>
  );
};
