import { Card, CardContent } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';

export default function Home() {
  return (
    <Card>
      <CardContent>
        <Formik
          initialValues={{
            firstname: '',
            lastname: '',
            millionaire: false,
            money: '',
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
              label="I have Money"
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
