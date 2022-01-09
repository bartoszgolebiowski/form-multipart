import * as React from "react";
import { Theme, ThemeProvider } from "theme-ui";
import ContactForm, { Values } from "./ContactForm";

import Layout from "./Layout";

const theme: Theme = {
  colors: {
    text: "#111",
    background: "#fff",
    primary: "tomato",
    secondary: "#3f3f3f",
    muted: "#e0e0e0",
    highlight: "#9f9f9f",
    gray: "#6c6c6c",
    accent: "#3f3f3f",
  },
  buttons: {
    primary: {
      color: "background",
      bg: "primary",
      "&:hover": {
        bg: "text",
      },
    },
    secondary: {
      color: "background",
      bg: "secondary",
    },
  },
};

const App = () => {
  const handleSubmitFinal = (values: Values) => {
    alert(JSON.stringify(values, null, 2));
  };
  const handleSubmitFirstStep = (values: Values) => {};
  const handleSubmitSecondStep = (values: Values) => {};
  const handleSubmitThirdStep = (values: Values) => {};

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <ContactForm
          onSubmitFirstStep={handleSubmitFirstStep}
          onSubmitSecondStep={handleSubmitSecondStep}
          onSubmitThirdStep={handleSubmitThirdStep}
          onSubmitFinal={handleSubmitFinal}
        />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
