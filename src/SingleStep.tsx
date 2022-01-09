import * as React from "react";
import { FormikConfig } from "formik";

export interface SingleStepProps<T> {
  validationSchema: FormikConfig<T>["validationSchema"];
  onSubmit: FormikConfig<T>["onSubmit"];
  label: string;
  children: React.ReactNode;
}

const SingleStepForm = <T extends object>(props: SingleStepProps<T>) => {
  return <>{props.children}</>;
};

export default SingleStepForm;
