import { Box } from "@chakra-ui/react";
import { useAppSelector } from "../state/store";



export const MessageBar = () => {

  const { message, error } = useAppSelector(state => state.app)


  return <>

    {message && <Box color="black" bg="gray.100" p="3" borderWidth="1px" borderRadius="lg">{message}</Box>}
    {error && <Box bg="tomato" p="3" borderWidth="1px" borderRadius="lg">{error}</Box>}

  </>;
}



