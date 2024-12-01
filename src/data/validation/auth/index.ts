import { booleanRequired, emailRequired, stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const authenticateSchema = yup.object().shape({
  body: yup.object().shape({
    accessToken: stringRequired({
      english: 'access token',
      portuguese: ''
    }),
    displayName: stringRequired({
      english: 'display name',
      portuguese: ''
    }),
    email: emailRequired(),
    emailVerified: booleanRequired({
      english: 'email verified',
      portuguese: ''
    }),
    googleId: stringRequired({
      english: 'google id',
      portuguese: ''
    })
  })
});
