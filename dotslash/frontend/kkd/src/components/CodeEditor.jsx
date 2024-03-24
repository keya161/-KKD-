import { useRef, useState ,useEffect} from "react";
import { Box, HStack, VStack ,Button} from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const [challengeData, setChallengeData] = useState(null);

  // Fetch challenge data from the database
  const fetchChallengeData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/challenges/random/1`);
      const data = await response.json();
      setChallengeData(data);
    } catch (error) {
      console.error("Error fetching challenge data:", error);
    }
  };

  // Fetch challenge data when component mounts
  useEffect(() => {
    fetchChallengeData();
  }, []);

  let keyboardEnabled = true;

  document.addEventListener('keydown', function(event) {
      if (!keyboardEnabled) {
          event.preventDefault();
          return false;
      }
  });
  
  function freezeKeyboard() {
      keyboardEnabled = false;
      setTimeout(function() {
          keyboardEnabled = true;
      }, 5000); // 5000 milliseconds = 5 seconds
  }
    return (
        <Box>
            <HStack spacing={4} alignItems="flex-start">
            <Box w="40%" h="100%" bg="#353535" borderRadius="md" p={4}>
          <Box bg="#353535" p={4} borderRadius="md">
            <Box p={4} h="10%" textAlign="center" color="white" fontSize="30px">
              {challengeData && challengeData.topic}
            </Box>
            <Box bg="#589BF7" h="30px" w="100px" textAlign="center" color="white" borderRadius="md">
              {challengeData && `Difficulty: ${challengeData.difficulty_level}`}
            </Box>
            <div style={{ overflowY: 'auto', height: 'calc(100% - 70px)', margin: "20px" }}>
              <div>Problem: {challengeData && challengeData.question_name}</div>
              <div>{challengeData && challengeData.question}</div>
              {challengeData && challengeData.test_cases.map((testCase, index) => (
                <div key={index}>
                  Example {index + 1}:<br />
                  Input: {testCase.input[0]}<br />
                  Output: {testCase.expected_output[0]}<br />
                </div>
              ))}
            </div>
            <Button
              onClick={freezeKeyboard}
              rounded="full"
              bg="blue.500"
              color="white"
              px={6}
              py={4}
              _hover={{ bg: "blue.600" }}
              _focus={{ outline: "none" }}
            >
              Exchange code
            </Button>
          </Box>
        </Box>
                <VStack w="60%" spacing={4} alignItems="flex-start">
                    <Box w="100%">
                        <LanguageSelector language={language} onSelect={onSelect} />
                        <Editor
                        options={{
                            minimap: {
                            enabled: false,
                            },
                        }}
                        height="50vh"
                        theme="vs-dark"
                        language={language}
                        defaultValue={CODE_SNIPPETS[language]}
                        onMount={onMount}
                        value={value}
                        onChange={(value) => setValue(value)}
                        />
                    </Box>
                    <Output editorRef={editorRef} language={language} />
                </VStack>
            </HStack>
        </Box>)
};
export default CodeEditor;