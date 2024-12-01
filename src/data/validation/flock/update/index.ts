import { stringNotRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const updateFlockSchema = yup.object().shape({
  body: yup.object().shape({
    name: stringNotRequired({
      english: 'name',
      length: 255,
      portuguese: 'nome'
    })
  })
});
