import { VStack, Input, Button, FormControl, FormErrorMessage, Flex, Box, InputGroup, InputLeftElement, Center, Container } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../state/store";
import { useForm } from "@jukhan/react-form";
import { useEffect } from "react";
import { loginEffect } from "../state/appSlice";
import { EmailIcon, WarningIcon } from "@chakra-ui/icons";

export const Login = () => {

  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.app.loading);
  const {
    validate,
    setValue,
    getValue,
    formData,
    setValidation,
    getStatus,
    getMessage,
  } = useForm();

  useEffect(() => {
    setValidation("email", (val) =>
      val ? ["", ""] : ["warning", "Email is required."]
    );
    setValidation("password", (val) =>
      val ? ["", ""] : ["warning", "Password is required."]
    );
  }, [dispatch]);

  const submit = () => {
    if (validate()) dispatch(loginEffect(formData()));
  };

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w={64}>
        <VStack spacing={4} align="flex-start">
          <Container>
            <Box fontWeight='bold' fontSize="2xl" as='h1' textAlign="center" >Login</Box>
          </Container>

          <FormControl isRequired isInvalid={getStatus('password') === "warning"}>
            <InputGroup bgColor="gray.200">
              <InputLeftElement
                pointerEvents='none'
                children={<EmailIcon color='black' />}
              />
              <Input type='tel' placeholder='Email Address' value={getValue("email")}
                onChange={(e) => setValue("email", e.target.value)} />

            </InputGroup>
            <FormErrorMessage>{getMessage('email')}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={getStatus('password') === "warning"}>
            <InputGroup bgColor="gray.200">
              <InputLeftElement
                pointerEvents='none'
                children={<WarningIcon color='black' />}
              />
              <Input type='password' placeholder='Password' value={getValue("password")}
                onChange={(e) => setValue("password", e.target.value)} />

            </InputGroup>
            <FormErrorMessage>{getMessage('password')}</FormErrorMessage>
          </FormControl>
          <Container>
            <Center>
              <Button size="sm" colorScheme="blue" isLoading={loading} onClick={submit}>LOG IN</Button>
            </Center>
          </Container>
        </VStack>
      </Box>
    </Flex>
  )
};