import React from "react";
import { createRoot } from "react-dom/client";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { CustomModal } from "@/components/CustomModal";

type ShowModalOptions = {
  title?: string;
  description?: string;
  alignButtons?: "left" | "right" | "center";
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

function confirm({
  title,
  description,
  alignButtons = "right",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}: ShowModalOptions = {}) {
  let modalRoot = document.getElementById("modal-root")!;

  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.id = "modal-root";
    document.body.appendChild(modalRoot);
  }
  const root = createRoot(modalRoot);

  function closeConfirmModal() {
    setTimeout(() => {
      root.unmount();
    }, 300);
  }

  const modal = (
    <CustomModal
      defaultOpen
      title={title}
      description={description}
      onOpenChange={() => closeConfirmModal()}
      footer={
        <div
          className={`flex gap-2 w-full justify-center sm:${
            alignButtons === "left"
              ? "justify-start"
              : alignButtons === "center"
              ? "justify-center"
              : "justify-end"
          }`}
        >
          <DialogTrigger
            className="transition-all inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-transparent border border-primary text-primary bg-background hover:bg-accent h-10 px-4 py-2"
            onClick={() => {
              if (onCancel) onCancel();
              closeConfirmModal();
            }}
          >
            {cancelText}
          </DialogTrigger>
          <DialogTrigger
            className="transition-all inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-transparent bg-primary text-primary-foreground hover:bg-primary/90 text-white h-10 px-4 py-2"
            onClick={() => {
              if (onConfirm) onConfirm();
              closeConfirmModal();
            }}
          >
            {confirmText}
          </DialogTrigger>
        </div>
      }
    />
  );

  root.render(modal);

  return { close: closeConfirmModal };
}

function ConfirmModalProvider({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <div id="modal-root" />
      {children}
    </>
  );
}

export { confirm, ConfirmModalProvider };
