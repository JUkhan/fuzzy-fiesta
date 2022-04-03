import { HStack, Button } from "@chakra-ui/react";
import { useAppDispatch } from "../state/store";
import { logoutEfect, notifyEffect } from "../state/appSlice";


export const NavBar = () => {

  const dispatch = useAppDispatch();

  return (<HStack bgColor="red.300" p="2" justify="center">
    <Button size='sm' bgColor="white" color="black" onClick={() => dispatch(notifyEffect())}>NOTIFY </Button>
    <Button size='sm' bgColor="black" color="white" onClick={() => dispatch(logoutEfect())}>LOG OUT </Button>

  </HStack>);
}



