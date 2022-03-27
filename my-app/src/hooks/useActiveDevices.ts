import { useEffect } from "react";
import { deviceEffect } from "../state/appSlice";
import { useAppDispatch, useAppSelector } from "../state/store";

export const useActiveDevices = () => {
  const dispatch = useAppDispatch();
  const deviceData  = useAppSelector((state) => state.app.devices);
  
  useEffect(() => {
    dispatch(deviceEffect());
    const tid = setInterval(() => {
      dispatch(deviceEffect());
    }, 5000);
    return () => {
      clearInterval(tid);
      console.log('cleared interval');
    }
  }, [dispatch]);

  return deviceData;
}