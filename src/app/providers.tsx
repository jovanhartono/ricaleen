"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createContext, useContext, useState, type ReactNode } from "react";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

type ModalContextType = {
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
  modal: ModalOptions | null;
};

const AlertDialogContext = createContext<ModalContextType | undefined>(
  undefined,
);

type ModalOptions = {
  title: string;
  description?: string;
  onConfirm?: () => void | Promise<void>;
};

function AlertDialogProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalOptions | null>(null);
  const [loading, setLoading] = useState(false);

  const openModal = (options: ModalOptions) => {
    setModal(options);
  };

  const closeModal = () => {
    setModal(null);
  };

  return (
    <AlertDialogContext
      value={{
        modal,
        openModal,
        closeModal,
      }}
    >
      {modal && (
        <AlertDialog open>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{modal.title}</AlertDialogTitle>
              <AlertDialogDescription>
                {modal.description}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={closeModal}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  await modal.onConfirm?.();
                  setLoading(false);
                }}
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {children}
    </AlertDialogContext>
  );
}

export const useModal = () => {
  const ctx = useContext(AlertDialogContext);
  if (!ctx) throw new Error("useModal must be used within AlertDialogProvider");
  return ctx;
};

export default function Providers({ children }: { children: ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AlertDialogProvider>{children}</AlertDialogProvider>
    </QueryClientProvider>
  );
}
