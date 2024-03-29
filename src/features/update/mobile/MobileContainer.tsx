import * as yup from 'yup';
import { useOutletContext } from 'react-router-dom';
import { Form } from './components/Form';
import { useUpdateMobile } from './hooks/useUpdateMobile';
import {
  SettingsForm,
  SettingsFormButtons,
  SettingsFormMessage,
} from '../../../pages/app/settings/shared/SettingsForm';
import { Text } from '../../../components/Text';
import { User } from '../../../contexts/user.types';

interface Schema {
  code: 234;
  number: number;
}

const validationSchema = yup.object().shape({
  code: yup.number().required('Provide your country code'),
  number: yup.number().required('Provide your mobile number'),
});

export const MobileContainer = () => {
  const { status, updateMobile } = useUpdateMobile();
  const { mobile } = useOutletContext() as User;

  const initialValues: Schema = {
    code: 234,
    number: mobile.number,
  };

  const handleSubmit = (values: Schema) => {
    updateMobile({ mobile: { ...values } });
  };

  return (
    <SettingsForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      status={status}
    >
      {(action) => (
        <>
          {action === 'view' ? (
            <Text
              as='p'
              size='sm'
            >
              {`+${mobile.code} ${mobile.number}`}
            </Text>
          ) : (
            <Form />
          )}
          <SettingsFormButtons />
          <SettingsFormMessage />
        </>
      )}
    </SettingsForm>
  );
};
