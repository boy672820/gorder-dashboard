import OrderProcessingList from './Processing';
import { ReceiptProvider } from '../../../contexts/ReceiptContext';

export default function ReceiptWrappedProcessing() {
  return (
    <ReceiptProvider>
      <OrderProcessingList />
    </ReceiptProvider>
  );
}
