import OrderWaitingList from './Waiting';
import { ReceiptProvider } from '../../../contexts/ReceiptContext';

export default function ReceiptWrappedWaiting() {
  return (
    <ReceiptProvider pendingMode>
      <OrderWaitingList />
    </ReceiptProvider>
  );
}
