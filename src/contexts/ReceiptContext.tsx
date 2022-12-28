import { createContext, ReactNode, useCallback, useState } from 'react';
// components
import OrderReceipt from '../components/receipt/Index';
// types
import { Order } from '../@types/order';

// ----------------------------------------------------------------------

type ReceiptStateArgs = { data: Order; index: number };

export type ReceiptContextProps = {
  openReceipt: boolean;
  stateIndex: number | null;
  receiptData: Order | null;
  onOpenReceipt: (args: ReceiptStateArgs) => void;
  onCloseReceipt: VoidFunction;
};

// ----------------------------------------------------------------------

const initialState: ReceiptContextProps = {
  openReceipt: false,
  receiptData: null,
  stateIndex: null,
  onCloseReceipt: () => {},
  onOpenReceipt: () => {},
};

const ReceiptContext = createContext(initialState);

type ReceiptProviderProps = {
  pendingMode?: boolean;
  children: ReactNode;
};

function ReceiptProvider({ children, pendingMode }: ReceiptProviderProps) {
  // states
  const [openReceipt, setOpenReceipt] = useState<boolean>(false);
  const [receiptData, setReceiptData] = useState<Order | null>(null);
  const [stateIndex, setStateIndex] = useState<number | null>(null);

  console.log(openReceipt);

  // ----------------------------------------------------------------------

  /**
   * Close Receipt Dialog
   */
  const onCloseReceipt = useCallback(() => {
    setOpenReceipt(false);
    setReceiptData(null);
    setStateIndex(null);
    console.log('Close Receipt Dialog');
  }, []);

  /**
   * Open Receipt Dialog
   *
   * @params {Order} Order
   */
  const onOpenReceipt = useCallback(({ data, index }: { data: Order; index: number }) => {
    setReceiptData(data);
    setStateIndex(index);
    setOpenReceipt(true);
    console.log('Open Receipt Dialog');
  }, []);

  // ----------------------------------------------------------------------

  return (
    <ReceiptContext.Provider
      value={{
        openReceipt,
        stateIndex,
        receiptData,
        onOpenReceipt,
        onCloseReceipt,
      }}
    >
      {children}

      <OrderReceipt pendingMode={pendingMode} />
    </ReceiptContext.Provider>
  );
}

export { ReceiptProvider, ReceiptContext };
