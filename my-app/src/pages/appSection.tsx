
import * as React from "react"
import { Box, Center } from "@chakra-ui/react"
import { Login } from "../components/login"

import { Devices } from "../components/devices"
import { useAppSelector, useAppDispatch } from "../state/store"
import { init } from "../state/appSlice"
import { useEffect } from "react"

export const AppSection = () => {
  const dispatch = useAppDispatch()
  const { isLogedIn, message, error } = useAppSelector(state => state.app)

  useEffect(() => {
    dispatch(init())
  }, [dispatch]);

  return <>

    {message && <Box color="black" bg="gray.100" p="3" borderWidth="1px" borderRadius="lg">{message}</Box>}
    {error && <Box bg="tomato" p="3" borderWidth="1px" borderRadius="lg">{error}</Box>}
    <Box>
      {isLogedIn ? <Devices /> : <Login />}
    </Box>
  </>;

}
