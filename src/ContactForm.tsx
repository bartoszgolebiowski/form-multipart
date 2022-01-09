import * as React from "react";
import * as Yup from "yup";

import MultistepForm from "./MultistepForm";
import SingleStepForm from "./SingleStep";
import FieldInput from "./FieldInput";

type Props = {
  onSubmitFirstStep: (values: Values) => void;
  onSubmitSecondStep: (values: Values) => void;
  onSubmitThirdStep: (values: Values) => void;
  onSubmitFinal: (values: Values) => void;
  initialValues?: Values;
};

export type Values = {
  firstName: string;
  lastName: string;
  code: string;
  email: string;
  phone: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
};

export const defaultInitialValues: Values = {
  firstName: "",
  lastName: "",
  code: "",
  email: "",
  phone: "",
  cardNumber: "",
  cardExpiry: "",
  cardCVC: "",
};

const yupFirstSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
});

const yupSecondSchema = Yup.object().shape({
  code: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  phone: Yup.string().required("Required"),
});

const yupThirdSchema = Yup.object().shape({
  cardNumber: Yup.string().length(12).required("Required"),
  cardExpiry: Yup.string()
    .matches(
      /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
      "Provide correct card expiry"
    )
    .required("Required"),
  cardCVC: Yup.string().required("Required"),
});

const ContactForm = (props: Props) => {
  const {
    onSubmitFirstStep,
    onSubmitSecondStep,
    onSubmitThirdStep,
    onSubmitFinal,
    initialValues = defaultInitialValues,
  } = props;

  return (
    <MultistepForm initialValues={initialValues} onSubmit={onSubmitFinal}>
      <SingleStepForm<Values>
        label="Person details"
        onSubmit={onSubmitFirstStep}
        validationSchema={yupFirstSchema}
      >
        <FieldInput
          placeholder="First name"
          label="First name"
          name="firstName"
        />
        <FieldInput placeholder="Last name" label="Last name" name="lastName" />
      </SingleStepForm>
      <SingleStepForm
        label="Location details"
        onSubmit={onSubmitSecondStep}
        validationSchema={yupSecondSchema}
      >
        <FieldInput placeholder="Code" label="Code" name="code" />
        <FieldInput
          type="email"
          placeholder="Email"
          label="Email"
          name="email"
        />
        <FieldInput type="tel" placeholder="Phone" label="Phone" name="phone" />
      </SingleStepForm>
      <SingleStepForm
        label="Card details"
        onSubmit={onSubmitThirdStep}
        validationSchema={yupThirdSchema}
      >
        <FieldInput
          type="tel"
          placeholder="1234 1234 1234 1234"
          label="Card Number"
          name="cardNumber"
          maxLength={12}
        />
        <FieldInput
          type="text"
          placeholder="01/01"
          label="Card Expiry"
          name="cardExpiry"
          maxLength={5}
        />
        <FieldInput
          type="password"
          placeholder="CVC"
          label="Card CVC"
          name="cardCVC"
          maxLength={3}
        />
      </SingleStepForm>
    </MultistepForm>
  );
};

export default ContactForm;
