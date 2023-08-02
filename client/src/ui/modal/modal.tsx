import { ComponentProps, ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import * as styles from "./modal.css";

type Props = ComponentProps<typeof Dialog.Root> & {
  children: ReactNode;
};

const _Modal = ({ children, ...props }: Props) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Trigger asChild>
        <button>open Modal</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.modalOverlay}>
          <Dialog.Content className={styles.modalContent}>
            {children}
            <Dialog.Close asChild>
              <button className={styles.modalClose} aria-label="Close">
                <Cross2Icon width={16.85} height={16.85} />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

_Modal.displayName = "Modal";

export const Modal = _Modal;
