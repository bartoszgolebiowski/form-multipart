import * as React from "react";
import { Box } from "@theme-ui/components";

const Layout: React.FC = (props) => {
  return <Box sx={{ maxWidth: "20rem", margin: "10rem auto" }} {...props} />;
};

export default Layout;
