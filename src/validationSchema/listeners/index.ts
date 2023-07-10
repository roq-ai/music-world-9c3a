import * as yup from 'yup';

export const listenerValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
  followed_label_id: yup.string().nullable(),
});
