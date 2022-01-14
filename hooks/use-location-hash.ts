import { useEffect, useState } from "react";
import useEventListener from "./use-event-listener";

const useLocationHash = () => {
  const [locationHash, setLocationHash] = useState(window.location.hash);
  useEventListener("hashchange", () => setLocationHash(window.location.hash));
  return locationHash;
};

export default useLocationHash;
