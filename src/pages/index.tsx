import {
  Box,
  Card,
  CardContent,
  Button,
  Stepper,
  StepLabel,
  Step,
  Grid,
  CircularProgress,
} from '@material-ui/core';
import { Formik, Form, Field, FormikConfig, FormikValues } from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
import * as yup from 'yup';
import React, { useState } from 'react';

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

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
          onSubmit={async (values) => {
            await sleep(3000);
            console.log('values', values);
          }}
        >
          <FormikStep label="Personal Info">
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="firstname"
                component={TextField}
                label="First Name"
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="lastname"
                component={TextField}
                label="Last Name"
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                type="checkbox"
                name="millionaire"
                component={CheckboxWithLabel}
                Label={{ label: 'I am a millionaire!' }}
              />
            </Box>
          </FormikStep>
          <FormikStep
            label="Bank Accounts"
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
            <Box paddingBottom={2}>
              <Field
                fullWidth
                type="number"
                name="money"
                component={TextField}
                label="Money I have!"
              />
            </Box>
          </FormikStep>
          <FormikStep label="More Info">
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="description"
                component={TextField}
                label="Description"
              />
            </Box>
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  );
}

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
}

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
  const currentChild = childrenArray[
    step
  ] as React.ReactElement<FormikStepProps>;

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
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child) => (
              <Step key={child.props.label}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {currentChild}
          <Grid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
