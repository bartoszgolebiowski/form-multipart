import * as React from "react";
import { Text, Button, Flex } from "@theme-ui/components";
import { Form, Formik, FormikConfig, FormikHelpers } from "formik";
import { SingleStepProps } from "./SingleStep";

interface Props<T> extends FormikConfig<T> {}

const MultistepForm = <T extends object>(props: Props<T>) => {
  const [snap, setSnap] = React.useState<T>(props.initialValues);
  const [step, setStep] = React.useState(0);
  const steps = React.Children.toArray(props.children) as React.ReactElement<
    SingleStepProps<T>
  >[];
  const currentStep = steps[step];
  const stepProps = currentStep.props;

  const nextPage = (value: T) => {
    setSnap(value);
    setStep(step + 1);
  };

  const prevPage = (value: T) => {
    setSnap(value);
    setStep(step - 1);
  };

  const hasPrev = step !== 0;
  const hasNext = step !== steps.length - 1;

  const handleSubmit = (value: T, helper: FormikHelpers<T>) => {
    if (stepProps.onSubmit) {
      stepProps.onSubmit(value, helper);
    }
    if (!hasNext) {
      props.onSubmit(value, helper);
    } else {
      nextPage(value);
    }
  };

  return (
    <Formik
      initialValues={snap}
      onSubmit={handleSubmit}
      validationSchema={stepProps.validationSchema}
    >
      {(formik) => (
        <Form>
          <Flex
            sx={{
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Text sx={{ fontSize: 5, fontWeight: "bold" }}>
              {currentStep.props.label}
            </Text>
            <Text
              sx={{ fontSize: 3, textAlign: "end" }}
              role="contentinfo"
              aria-label={`step-${step + 1}`}
            >
              {step + 1}/{steps.length}
            </Text>
          </Flex>
          {currentStep}
          <Flex
            pt={2}
            sx={{
              justifyContent: "flex-end",
              "& > button": {
                ml: 2,
              },
            }}
          >
            {hasPrev && (
              <Button
                variant="secondary"
                type="button"
                onClick={() => prevPage(formik.values)}
              >
                Previous
              </Button>
            )}
            <Button type="submit" variant="primary">
              {hasNext ? "Next" : "Submit"}
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default MultistepForm;
