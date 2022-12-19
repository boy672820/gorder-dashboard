import { DialogContent } from '@mui/material';
import useReceipt from '../../hooks/useReceipt';
// components
import { DialogAnimate } from '../animate';
// components
import OrderReceiptContent from './OrderReceipt';

export default function OrderReceipt() {
  const { openReceipt, onCloseReceipt } = useReceipt();

  return (
    <DialogAnimate open={openReceipt} onClose={onCloseReceipt}>
      <DialogContent>
        <OrderReceiptContent />
      </DialogContent>
    </DialogAnimate>
  );
}
