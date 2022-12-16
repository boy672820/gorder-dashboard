import { createContext, ReactNode, useCallback, useState } from 'react';
import OrderReceipt from '../components/receipt/Index';

export type ReceiptContextProps = {
  openReceipt: boolean;
  onCloseReceipt: VoidFunction;
  onOpenReceipt: VoidFunction;
};

const initialState: ReceiptContextProps = {
  openReceipt: false,
  onCloseReceipt: () => {},
  onOpenReceipt: () => {},
};

const ReceiptContext = createContext(initialState);

type ReceiptProviderProps = {
  children: ReactNode;
};

function ReceiptProvider({ children }: ReceiptProviderProps) {
  // Receipt Dialog
  const [openReceipt, setOpenReceipt] = useState<boolean>(false);

  /**
   * Close Receipt Dialog
   */
  const onCloseReceipt = useCallback(() => {
    setOpenReceipt(false);
  }, []);

  const onOpenReceipt = useCallback(() => {
    setOpenReceipt(true);
  }, []);

  return (
    <ReceiptContext.Provider
      value={{
        openReceipt,
        onCloseReceipt,
        onOpenReceipt,
      }}
    >
      {children}

      <OrderReceipt openReceipt={openReceipt} onCloseReceipt={onCloseReceipt} />
    </ReceiptContext.Provider>
  );
}

export { ReceiptProvider, ReceiptContext };
