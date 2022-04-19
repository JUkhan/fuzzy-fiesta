
import * as React from "react"
import { Box, Center } from "@chakra-ui/react"
import { Login } from "../components/login"

import { Devices } from "../components/devices"
import { useAppSelector, useAppDispatch } from "../state/store"
import { init } from "../state/appSlice"
import { useEffect } from "react"
import { MessageBar } from "../components/messageBar"

export const AppSection = () => {
  const dispatch = useAppDispatch()
  const isLogedIn = useAppSelector(state => state.app.isLogedIn)

  useEffect(() => {
    dispatch(init())
  }, [dispatch]);

  return <>

    <MessageBar />
    <Box>
      {isLogedIn ? <Devices /> : <Login />}
    </Box>
  </>;

}
