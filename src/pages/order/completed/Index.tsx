import OrderCompletedList from './Completed';
import { ReceiptProvider } from '../../../contexts/ReceiptContext';

export default function ReceiptWrappedCompleted() {
  return (
    <ReceiptProvider>
      <OrderCompletedList />
    </ReceiptProvider>
  );
}
