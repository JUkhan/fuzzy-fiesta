import { Box, Flex, } from "@chakra-ui/react";

import { NavBar } from "./navBar";
import { useWindowResize } from "../hooks/useWindowResize";
import { Orbit } from './orbit'
export const Devices = () => {
  const { height, width } = useWindowResize();

  return (<Box bgColor="tomato" h="100vh">

    <Flex align="center" justify="center" h="100vh">

      <Orbit />

    </Flex>


    <Box pos="absolute" w={width} top={height - 48}>
      <NavBar />
    </Box>

  </Box>)
}

