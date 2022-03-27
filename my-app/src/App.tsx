import * as React from "react"
import {
  ChakraProvider,
  theme

} from "@chakra-ui/react"

import { AppSection } from "./pages/appSection"

export const App = () => (
  <ChakraProvider theme={theme}>
    <AppSection />
  </ChakraProvider>
)
