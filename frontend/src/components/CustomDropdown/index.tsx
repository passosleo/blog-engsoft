import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export type DropdownProps = React.ComponentProps<"div"> & {
  items: {
    element: React.ReactNode;
    onClick: () => void;
    className?: string;
  }[];
};

export function CustomDropdown({
  items,
  children,
  className,
  ...props
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleIsOpen() {
    setIsOpen((prev) => !prev);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      <div onClick={handleIsOpen}>{children}</div>
      {isOpen && (
        <div
          {...props}
          className={twMerge(
            "absolute bg-black p-2 rounded-md z-40 flex flex-col gap-1 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className
          )}
        >
          {items.map((item, index) => (
            <span
              key={index}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              className={twMerge(
                "cursor-pointer text-sm hover:text-primary transition-colors font-medium",
                item.className
              )}
            >
              {item.element}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
