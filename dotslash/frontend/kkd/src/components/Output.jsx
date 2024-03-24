import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCodeR = async () => {
    const response = await fetch(`http://localhost:8080/challenges/random/1`); // Adjust the URL as per your backend route
    const challengeData = await response.json();
    const input = challengeData.test_cases[0].input[0];
    const exp_op = challengeData.test_cases[0].expected_output[0];
    const sourceCode = editorRef.current.getValue() + input;

    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      const texp_op = exp_op.toString().trim();
      const tres = result.output.toString().trim();
      const op = texp_op === tres
        ? `${texp_op}\n Matched`
        : `${tres}\nNot Matched `;
      setOutput(op.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const runCodeS = async () => {
    const response = await fetch(`http://localhost:8080/challenges/random/1`); // Adjust the URL as per your backend route
    const challengeData = await response.json();
    var count = 0;
    for (let i = 0; i < challengeData.test_cases.length; i++) {
      var input = challengeData.test_cases[i].input[0];
      var exp_op = challengeData.test_cases[i].expected_output[0];
      var sourceCode = editorRef.current.getValue() + input;

      if (!sourceCode) return;
      try {
        setIsLoading(true);
        var { run: result } = await executeCode(language, sourceCode);
        const texp_op = exp_op.toString().trim();
        const tres = result.output.toString().trim();
        if(texp_op===tres){
          count++;
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    var op=`Passed ${count} out of ${challengeData.test_cases.length} test cases`;
    setOutput(op.split("\n"));
    // if(count === challengeData.test_cases.length){
    //   setTimeout(() => {
    //     window.location.href = '/leaderboard';
    //   }, 5000);
    // }
  };

  return (
    <Box w="50%">
      <div>
        <Button
          variant="outline"
          colorScheme="green"
          mr={4}
          mb={4}
          isLoading={isLoading}
          onClick={runCodeR}
        >
          Run Code
        </Button>
        <Button
          variant="outline"
          colorScheme="green"
          mr={4}
          mb={4}
          isLoading={isLoading}
          onClick={runCodeS}
        >
          Submit
        </Button>
      </div>

      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Box
        height="13vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output && Array.isArray(output) ? (
          <div>
            {output.map((line, i) => (
              <Text key={i}>{line}</Text>
            ))}
          </div>
        ) : (
          'Click "Run Code" to see the output here'
        )}
      </Box>
    </Box>
  );
};

export default Output;
