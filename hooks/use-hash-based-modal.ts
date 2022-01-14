import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import useBack from "./use-back";

const useHashBasedModal = (hash: string) => {
  const initialHash = useRef(hash);
  const router = useRouter();
  const [locationHash, setHash] = useState("");
  const back = useBack();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (window.location.hash === initialHash.current || router.asPath.includes(initialHash.current)) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    // setIsOpen(true);
  }, [router]);

  const openModal = () => {
    if (window.location.hash !== hash) {
      router.push(router.asPath + hash);
      // setHash(window.location.hash);
      setIsOpen(true);
    }
  };
  const closeModal = () => {
    if (window.location.hash === initialHash.current) {
      back();
    }
  };

  // return { isOpen: locationHash === initialHash.current, openModal, closeModal };
  return { isOpen, openModal, closeModal };
};

export default useHashBasedModal;
