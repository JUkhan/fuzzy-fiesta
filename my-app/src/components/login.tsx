import { Stack, Input, Button, FormControl, FormLabel, FormErrorMessage, } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../state/store";
import { useForm } from "@jukhan/react-form";
import { useEffect } from "react";
import { loginEffect } from "../state/appSlice";

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

    <Stack alignSelf="center" maxW='sm' spacing={3} borderWidth='1px' borderRadius='lg' p="3">

      <FormControl isRequired isInvalid={getStatus('email') === "warning"} >
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input
          id="email"
          value={getValue("email")}
          onChange={(e) => setValue("email", e.target.value)}
          placeholder='User name'
        />
        <FormErrorMessage>{getMessage('email')}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={getStatus('password') === "warning"}>
        <FormLabel htmlFor='password'>Password</FormLabel>
        <Input
          id="password"
          value={getValue("password")}
          onChange={(e) => setValue("password", e.target.value)}
          placeholder='Password'
        />
        <FormErrorMessage>{getMessage('password')}</FormErrorMessage>
      </FormControl>

      <Button isLoading={loading} onClick={submit}>Login</Button>
    </Stack>

  )
};