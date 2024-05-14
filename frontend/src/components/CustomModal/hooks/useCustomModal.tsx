import { useState } from "react";

type Props = {
  defaultOpen?: boolean;
};

export function useCustomModal({ defaultOpen = false }: Props = {}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  function toggleModal() {
    setIsOpen((prev) => !prev);
  }

  return {
    isOpen,
    toggleModal,
  };
}
