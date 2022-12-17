import { createContext, ReactNode, useCallback, useState } from 'react';
// components
import OrderReceipt from '../components/receipt/Index';
// types
import { Order } from '../@types/order';

// ----------------------------------------------------------------------

export type ReceiptContextProps = {
  openReceipt: boolean;
  onCloseReceipt: VoidFunction;
  onOpenReceipt: (data: Order) => void;
  receiptData: Order | null;
};

// ----------------------------------------------------------------------

const initialState: ReceiptContextProps = {
  openReceipt: false,
  onCloseReceipt: () => {},
  onOpenReceipt: () => {},
  receiptData: null,
};

const ReceiptContext = createContext(initialState);

type ReceiptProviderProps = {
  children: ReactNode;
};

function ReceiptProvider({ children }: ReceiptProviderProps) {
  // states
  const [openReceipt, setOpenReceipt] = useState<boolean>(false);
  const [receiptData, setReceiptData] = useState<Order | null>(null);

  // ----------------------------------------------------------------------

  /**
   * Close Receipt Dialog
   */
  const onCloseReceipt = useCallback(() => {
    setOpenReceipt(false);
    setReceiptData(null);
  }, []);

  /**
   * Open Receipt Dialog
   *
   * @params {Order} Order
   */
  const onOpenReceipt = useCallback((data: Order) => {
    setReceiptData(data);
    setOpenReceipt(true);
  }, []);

  // ----------------------------------------------------------------------

  return (
    <ReceiptContext.Provider
      value={{
        openReceipt,
        onCloseReceipt,
        onOpenReceipt,
        receiptData,
      }}
    >
      {children}

      <OrderReceipt open={openReceipt} onClose={onCloseReceipt} data={receiptData} />
    </ReceiptContext.Provider>
  );
}

export { ReceiptProvider, ReceiptContext };
