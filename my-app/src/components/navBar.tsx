import { HStack, Button } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../state/store";
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { logoutEfect, notifyEffect } from "../state/appSlice";

export const NavBar = () => {
  const isLogedIn = useAppSelector(state => state.app.isLogedIn)
  const dispatch = useAppDispatch();

  return (<HStack borderWidth='1px' p="1" justify="end">
    {isLogedIn && <Button onClick={() => dispatch(notifyEffect())}>Notify </Button>}ß
    {isLogedIn && <Button onClick={() => dispatch(logoutEfect())}>Logout </Button>}
    <ColorModeSwitcher />
  </HStack>);
}



