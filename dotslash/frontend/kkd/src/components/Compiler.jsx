import { ChakraProvider, Box } from "@chakra-ui/react";
import theme from "../theme";
import CodeEditor from "./CodeEditor";

function Compiler() {
  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
        <CodeEditor />
      </Box>
    </ChakraProvider>
  );
}

export default Compiler;