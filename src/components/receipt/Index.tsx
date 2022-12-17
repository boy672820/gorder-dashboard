import { DialogContent } from '@mui/material';
// components
import { DialogAnimate } from '../animate';
// types
import { ReceiptContextProps } from '../../contexts/ReceiptContext';
import { Order } from '../../@types/order';
// components
import OrderReceiptContent from './OrderReceipt';

// -----------------------------------------------------------------

type Props = {
  open: ReceiptContextProps['openReceipt'];
  onClose: ReceiptContextProps['onCloseReceipt'];
  data: Order | null;
};

// -----------------------------------------------------------------

export default function OrderReceipt({ open, onClose }: Props) {
  return (
    <DialogAnimate open={open} onClose={onClose}>
      <DialogContent>
        <OrderReceiptContent onClose={onClose} />
      </DialogContent>
    </DialogAnimate>
  );
}
