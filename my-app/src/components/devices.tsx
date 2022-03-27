import { Box } from "@chakra-ui/react";
import { useActiveDevices } from "../hooks/useActiveDevices";


export const Devices = () => {

  const devices = useActiveDevices()


  return (<Box borderWidth='1px' p="40">
    {devices.map(device => <Box key={device.id}>{device.name}</Box>)}
  </Box>)
}

