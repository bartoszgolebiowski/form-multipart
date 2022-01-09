import * as React from "react";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm, { defaultInitialValues, Values } from "./ContactForm";

describe("ContactForm", () => {
  const onSubmitFirstStep = jest.fn();
  const onSubmitSecondStep = jest.fn();
  const onSubmitThirdStep = jest.fn();
  const onSubmitFinal = jest.fn();

  describe("First step", () => {
    it("should render person details with empty values and correct step number", async () => {
      render(
        <ContactForm
          onSubmitFirstStep={onSubmitFirstStep}
          onSubmitSecondStep={onSubmitSecondStep}
          onSubmitThirdStep={onSubmitThirdStep}
          onSubmitFinal={onSubmitFinal}
        />
      );
      expect(screen.getByText(/Person details/i)).toBeInTheDocument();
      expect(
        screen.getByRole("contentinfo", { name: "step-1" })
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/first name/i)).toHaveValue("");
      expect(screen.getByLabelText(/last name/i)).toHaveValue("");
    });

    it("should not redirect to next step when step is not filled", async () => {
      render(
        <ContactForm
          onSubmitFirstStep={onSubmitFirstStep}
          onSubmitSecondStep={onSubmitSecondStep}
          onSubmitThirdStep={onSubmitThirdStep}
          onSubmitFinal={onSubmitFinal}
        />
      );

      expect(screen.getByText(/Person details/i)).toBeInTheDocument();
      expect(
        screen.getByRole("contentinfo", { name: "step-1" })
      ).toBeInTheDocument();
      userEvent.click(screen.getByRole("button", { name: /next/i }));
      await waitFor(() =>
        expect(screen.queryAllByText(/required/i)).toHaveLength(2)
      );
    });

    it("should render person details with filled values, next button should redirect to next step", async () => {
      const initialValues: Values = {
        ...defaultInitialValues,
        firstName: "John",
        lastName: "Doe",
      };

      render(
        <ContactForm
          onSubmitFirstStep={onSubmitFirstStep}
          onSubmitSecondStep={onSubmitSecondStep}
          onSubmitThirdStep={onSubmitThirdStep}
          onSubmitFinal={onSubmitFinal}
          initialValues={initialValues}
        />
      );

      expect(screen.getByLabelText(/first name/i)).toHaveValue(
        initialValues.firstName
      );
      expect(screen.getByLabelText(/last name/i)).toHaveValue(
        initialValues.lastName
      );

      userEvent.click(screen.getByRole("button", { name: /next/i }));
      await waitForElementToBeRemoved(() =>
        screen.queryByText(/Person details/i)
      );
      expect(screen.getByText(/Location details/i)).toBeInTheDocument();
      expect(
        screen.getByRole("contentinfo", { name: "step-2" })
      ).toBeInTheDocument();
    });
  });

  describe("Second step", () => {
    it("should render location details with empty values and correct step number", async () => {
      const initialValues: Values = {
        ...defaultInitialValues,
        firstName: "John",
        lastName: "Doe",
      };

      render(
        <ContactForm
          onSubmitFirstStep={onSubmitFirstStep}
          onSubmitSecondStep={onSubmitSecondStep}
          onSubmitThirdStep={onSubmitThirdStep}
          onSubmitFinal={onSubmitFinal}
          initialValues={initialValues}
        />
      );

      userEvent.click(screen.getByRole("button", { name: /next/i }));
      await waitForElementToBeRemoved(() =>
        screen.queryByText(/Person details/i)
      );
      expect(screen.getByText(/location details/i)).toBeInTheDocument();
      expect(
        screen.getByRole("contentinfo", { name: "step-2" })
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/code/i)).toHaveValue("");
      expect(screen.getByLabelText(/email/i)).toHaveValue("");
      expect(screen.getByLabelText(/phone/i)).toHaveValue("");
    });

    it("should not redirect to next step when step is not filled", async () => {
      const initialValues: Values = {
        ...defaultInitialValues,
        firstName: "John",
        lastName: "Doe",
      };

      render(
        <ContactForm
          onSubmitFirstStep={onSubmitFirstStep}
          onSubmitSecondStep={onSubmitSecondStep}
          onSubmitThirdStep={onSubmitThirdStep}
          onSubmitFinal={onSubmitFinal}
          initialValues={initialValues}
        />
      );

      userEvent.click(screen.getByRole("button", { name: /next/i }));
      await waitForElementToBeRemoved(() =>
        screen.queryByText(/Person details/i)
      );
      expect(screen.getByText(/location details/i)).toBeInTheDocument();
      expect(
        screen.getByRole("contentinfo", { name: "step-2" })
      ).toBeInTheDocument();
      userEvent.click(screen.getByRole("button", { name: /next/i }));
      await waitFor(() =>
        expect(screen.queryAllByText(/required/i)).toHaveLength(3)
      );
    });

    it("should render contact details with filled values, next button should redirect to next step", async () => {
      const initialValues: Values = {
        ...defaultInitialValues,
        firstName: "John",
        lastName: "Doe",
        code: "de8c7627dd023b4ee4f4eca10ca8871962c42f49d9c3103c2be135f7b94ca048",
        email: "john.snow@gmail.com",
        phone: "+48123456789",
      };

      render(
        <ContactForm
          onSubmitFirstStep={onSubmitFirstStep}
          onSubmitSecondStep={onSubmitSecondStep}
          onSubmitThirdStep={onSubmitThirdStep}
          onSubmitFinal={onSubmitFinal}
          initialValues={initialValues}
        />
      );

      userEvent.click(screen.getByRole("button", { name: /next/i }));
      await waitForElementToBeRemoved(() =>
        screen.queryByText(/Person details/i)
      );
      expect(screen.getByLabelText(/code/i)).toHaveValue(initialValues.code);
      expect(screen.getByLabelText(/email/i)).toHaveValue(initialValues.email);
      expect(screen.getByLabelText(/phone/i)).toHaveValue(initialValues.phone);

      userEvent.click(screen.getByRole("button", { name: /next/i }));
      await waitForElementToBeRemoved(() =>
        screen.queryByText(/Location details/i)
      );
      expect(screen.getByText(/Card details/i)).toBeInTheDocument();
      expect(
        screen.getByRole("contentinfo", { name: "step-3" })
      ).toBeInTheDocument();
    });
  });

  describe("Third step", () => {
    it("should render card details with empty values and correct step number", async () => {
      const initialValues: Values = {
        ...defaultInitialValues,
        firstName: "John",
        lastName: "Doe",
        code: "de8c7627dd023b4ee4f4eca10ca8871962c42f49d9c3103c2be135f7b94ca048",
        email: "john.snow@gmail.com",
        phone: "+48123456789",
      };

      render(
        <ContactForm
          onSubmitFirstStep={onSubmitFirstStep}
          onSubmitSecondStep={onSubmitSecondStep}
          onSubmitThirdStep={onSubmitThirdStep}
          onSubmitFinal={onSubmitFinal}
          initialValues={initialValues}
        />
      );

      userEvent.click(screen.getByRole("button", { name: /next/i }));
      await waitForElementToBeRemoved(() =>
        screen.queryByText(/Person details/i)
      );
      userEvent.click(screen.getByRole("button", { name: /next/i }));
      await waitForElementToBeRemoved(() =>
        screen.queryByText(/location details/i)
      );
      expect(screen.getByText(/card details/i)).toBeInTheDocument();

      expect(
        screen.getByRole("contentinfo", { name: "step-3" })
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/card number/i)).toHaveValue("");
      expect(screen.getByLabelText(/card expiry/i)).toHaveValue("");
      expect(screen.getByLabelText(/card cvc/i)).toHaveValue("");
    });

    it("should not redirect to next step when step is not filled", async () => {
      const initialValues: Values = {
        ...defaultInitialValues,
        firstName: "John",
        lastName: "Doe",
        code: "de8c7627dd023b4ee4f4eca10ca8871962c42f49d9c3103c2be135f7b94ca048",
        email: "john.snow@gmail.com",
        phone: "+48123456789",
      };

      render(
        <ContactForm
          onSubmitFirstStep={onSubmitFirstStep}
          onSubmitSecondStep={onSubmitSecondStep}
          onSubmitThirdStep={onSubmitThirdStep}
          onSubmitFinal={onSubmitFinal}
          initialValues={initialValues}
        />
      );

      userEvent.click(screen.getByRole("button", { name: /next/i }));
      await waitForElementToBeRemoved(() =>
        screen.queryByText(/Person details/i)
      );
      userEvent.click(screen.getByRole("button", { name: /next/i }));
      await waitForElementToBeRemoved(() =>
        screen.queryByText(/location details/i)
      );
      expect(screen.getByText(/card details/i)).toBeInTheDocument();
      userEvent.click(screen.getByRole("button", { name: /submit/i }));
      await waitFor(() =>
        expect(screen.queryAllByText(/required/i)).toHaveLength(3)
      );
    });

    it("should render card details with filled values, next button should submit with correct argument", async () => {
      const initialValues: Values = {
        ...defaultInitialValues,
        firstName: "John",
        lastName: "Doe",
        code: "de8c7627dd023b4ee4f4eca10ca8871962c42f49d9c3103c2be135f7b94ca048",
        email: "john.snow@gmail.com",
        phone: "+48123456789",
        cardNumber: "123456789012",
        cardExpiry: "12/20",
        cardCVC: "123",
      };

      render(
        <ContactForm
          onSubmitFirstStep={onSubmitFirstStep}
          onSubmitSecondStep={onSubmitSecondStep}
          onSubmitThirdStep={onSubmitThirdStep}
          onSubmitFinal={onSubmitFinal}
          initialValues={initialValues}
        />
      );

      userEvent.click(screen.getByRole("button", { name: /next/i }));
      await waitForElementToBeRemoved(() =>
        screen.queryByText(/Person details/i)
      );
      userEvent.click(screen.getByRole("button", { name: /next/i }));
      await waitForElementToBeRemoved(() =>
        screen.queryByText(/location details/i)
      );
      expect(screen.getByText(/card details/i)).toBeInTheDocument();

      expect(screen.getByLabelText(/card number/i)).toHaveValue(
        initialValues.cardNumber
      );
      expect(screen.getByLabelText(/card expiry/i)).toHaveValue(
        initialValues.cardExpiry
      );
      expect(screen.getByLabelText(/card cvc/i)).toHaveValue(
        initialValues.cardCVC
      );

      userEvent.click(screen.getByRole("button", { name: /submit/i }));
      await waitFor(() => expect(onSubmitFinal).toBeCalled());
      expect(onSubmitFinal.mock.calls[0][0]).toStrictEqual(initialValues);
    });
  });

  describe("Integration", () => {
    it("should be possible to fill all steps and submit form", async () => {
      const exampleValues: Values = {
        firstName: "John",
        lastName: "Doe",
        code: "de8c7627dd023b4ee4f4eca10ca8871962c42f49d9c3103c2be135f7b94ca048",
        email: "john.snow@gmail.com",
        phone: "+48123456789",
        cardNumber: "123456789012",
        cardExpiry: "12/20",
        cardCVC: "123",
      };

      render(
        <ContactForm
          onSubmitFirstStep={onSubmitFirstStep}
          onSubmitSecondStep={onSubmitSecondStep}
          onSubmitThirdStep={onSubmitThirdStep}
          onSubmitFinal={onSubmitFinal}
        />
      );
      const type = async (element: HTMLElement, value: string) => {
        userEvent.type(element, value);
        await screen.findByDisplayValue(value);
      };

      await type(screen.getByLabelText(/first name/i), exampleValues.firstName);
      await type(screen.getByLabelText(/last name/i), exampleValues.lastName);
      userEvent.click(screen.getByRole("button", { name: /next/i }));
      await waitForElementToBeRemoved(() =>
        screen.queryByText(/Person details/i)
      );
      expect(onSubmitFirstStep).toBeCalled();

      await type(screen.getByLabelText(/code/i), exampleValues.code);
      await type(screen.getByLabelText(/email/i), exampleValues.email);
      await type(screen.getByLabelText(/phone/i), exampleValues.phone);
      userEvent.click(screen.getByRole("button", { name: /next/i }));
      await waitForElementToBeRemoved(() =>
        screen.queryByText(/location details/i)
      );
      expect(onSubmitSecondStep).toBeCalled();

      await type(
        screen.getByLabelText(/card number/i),
        exampleValues.cardNumber
      );
      await type(
        screen.getByLabelText(/card expiry/i),
        exampleValues.cardExpiry
      );
      await type(screen.getByLabelText(/card cvc/i), exampleValues.cardCVC);
      userEvent.click(screen.getByRole("button", { name: /submit/i }));
      await waitFor(() => expect(onSubmitThirdStep).toBeCalled());
      expect(onSubmitFinal.mock.calls[0][0]).toStrictEqual(exampleValues);
    });

    it("should be possible to navigate from 1->2->3->2->1", async () => {
      const initialValues: Values = {
        firstName: "John",
        lastName: "Doe",
        code: "de8c7627dd023b4ee4f4eca10ca8871962c42f49d9c3103c2be135f7b94ca048",
        email: "john.snow@gmail.com",
        phone: "+48123456789",
        cardNumber: "123456789012",
        cardExpiry: "12/20",
        cardCVC: "123",
      };

      render(
        <ContactForm
          onSubmitFirstStep={onSubmitFirstStep}
          onSubmitSecondStep={onSubmitSecondStep}
          onSubmitThirdStep={onSubmitThirdStep}
          onSubmitFinal={onSubmitFinal}
          initialValues={initialValues}
        />
      );
      expect(
        screen.getByRole("contentinfo", { name: "step-1" })
      ).toBeInTheDocument();
      userEvent.click(screen.getByRole("button", { name: /next/i }));

      await waitForElementToBeRemoved(() =>
        screen.queryByText(/Person details/i)
      );
      expect(
        screen.getByRole("contentinfo", { name: "step-2" })
      ).toBeInTheDocument();
      userEvent.click(screen.getByRole("button", { name: /next/i }));

      await waitForElementToBeRemoved(() =>
        screen.queryByText(/location details/i)
      );
      expect(
        screen.getByRole("contentinfo", { name: "step-3" })
      ).toBeInTheDocument();
      expect(screen.getByText(/card details/i)).toBeInTheDocument();
      userEvent.click(
        screen.getByRole("button", {
          name: /previous/i,
        })
      );

      expect(
        screen.getByRole("contentinfo", { name: "step-2" })
      ).toBeInTheDocument();
      userEvent.click(
        screen.getByRole("button", {
          name: /previous/i,
        })
      );

      expect(
        screen.getByRole("contentinfo", { name: "step-1" })
      ).toBeInTheDocument();
      expect(screen.getByText(/person details/i)).toBeInTheDocument();
    });
  });
});
