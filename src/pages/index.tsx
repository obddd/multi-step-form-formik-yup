import { Card, CardContent } from '@material-ui/core';
import { Formik, Form, Field, FormikConfig, FormikValues } from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
import * as yup from 'yup';
import React, { useState } from 'react'

export default function Home() {
  return (
    <Card>
      <CardContent>
        <FormikStepper
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
          
            <div>
            <Field name="firstname" component={TextField} label="First Name" />
            <Field name="lastname" component={TextField} label="Last Name" />
            <Field
              type="checkbox"
              name="millionaire"
              component={CheckboxWithLabel}
              Label={{ label: 'I am a millionaire!' }}
            />
            </div>
            <div>
            <Field
              type="number"
              name="money"
              component={TextField}
              label="Money I have!"
            />
            </div>
            <div>
            <Field
              name="description"
              component={TextField}
              label="Description"
            />
            </div>
        </FormikStepper>
      </CardContent>
    </Card>
  );
}

export function FormikStepper({children, ...props}:FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(children)
  const [step, setStep] = useState(0)
  const currentChild = childrenArray[step]
  return(
    <Formik {...props}>
      <Form autoComplete="off">{currentChild}</Form>
    </Formik>
  )
}