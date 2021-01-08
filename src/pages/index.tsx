import { Card, CardContent, Button } from '@material-ui/core';
import { Formik, Form, Field, FormikConfig, FormikValues } from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
import * as yup from 'yup';
import React, { useState } from 'react';

export default function Home() {
  return (
    <Card>
      <CardContent>
        <FormikStepper
          initialValues={{
            firstname: '',
            lastname: '',
            millionaire: false,
            money: 0,
            description: '',
          }}
          onSubmit={() => {}}
        >
          <FormikStep>
            <Field name="firstname" component={TextField} label="First Name" />
            <Field name="lastname" component={TextField} label="Last Name" />
            <Field
              type="checkbox"
              name="millionaire"
              component={CheckboxWithLabel}
              Label={{ label: 'I am a millionaire!' }}
            />
          </FormikStep>
          <FormikStep
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
          >
            <Field
              type="number"
              name="money"
              component={TextField}
              label="Money I have!"
            />
          </FormikStep>
          <FormikStep>
            <Field
              name="description"
              component={TextField}
              label="Description"
            />
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  );
}

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step] as React.ReactElement<FormikStepProps>
  console.log(currentChild)
  const isLastStep = () => step === childrenArray.length - 1;
  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      <Form autoComplete="off">
        {currentChild}
        {step > 0 ? (
          <Button onClick={() => setStep((s) => s - 1)}>Back</Button>
        ) : null}
        <Button type="submit">{isLastStep() ? 'Submit' : 'Next'}</Button>
      </Form>
    </Formik>
  );
}
