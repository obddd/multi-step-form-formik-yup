import { Card, CardContent } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
import * as yup from 'yup';

export default function Home() {
  return (
    <Card>
      <CardContent>
        <Formik
          validationSchema={yup.object({
            money: yup.mixed().when('millionaire', {
              is: true,
              then: yup
                .number()
                .required()
                .min(1000000, "But you said you're a millionaire."),
              other: yup.number().required(),
            }),
          })}
          initialValues={{
            firstname: '',
            lastname: '',
            millionaire: false,
            money: 0,
            description: '',
          }}
          onSubmit={() => {}}
        >
          <Form autoComplete="off">
            <Field name="firstname" component={TextField} label="First Name" />
            <Field name="lastname" component={TextField} label="Last Name" />
            <Field
              type="checkbox"
              name="millionaire"
              component={CheckboxWithLabel}
              Label={{ label: 'I am a millionaire!' }}
            />
            <Field
              type="number"
              name="money"
              component={TextField}
              label="Money I have!"
            />
            <Field
              name="description"
              component={TextField}
              label="Description"
            />
          </Form>
        </Formik>
      </CardContent>
    </Card>
  );
}
