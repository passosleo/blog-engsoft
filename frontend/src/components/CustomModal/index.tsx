import { DialogProps } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export type CustomModalProps = DialogProps & {
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
};

export function CustomModal({
  trigger,
  title,
  description,
  children,
  footer,
  ...props
}: CustomModalProps) {
  return (
    <Dialog {...props}>
      {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
          {children && <div className="pt-5">{children}</div>}
        </DialogHeader>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
