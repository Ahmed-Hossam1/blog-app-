"use client";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ReactNode } from "react";

interface Props {
  title?: string;
  children: ReactNode;
  isOpen: boolean;
  close: () => void;
}
export default function MyModal({ title, isOpen, close, children }: Props) {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={close}
      >
        {/* Backdrop Overlay */}
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
            >
              <DialogTitle
                as="h3"
                className="text-lg font-bold text-gray-900 dark:text-white"
              >
                {title}
              </DialogTitle>
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
