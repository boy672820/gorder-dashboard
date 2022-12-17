import { DialogContent } from '@mui/material';
// components
import { DialogAnimate } from '../animate';
// types
import { ReceiptContextProps } from '../../contexts/ReceiptContext';
// components
import OrderReceiptContent from './OrderReceipt';

// -----------------------------------------------------------------

type Props = {
  open: ReceiptContextProps['openReceipt'];
  onClose: ReceiptContextProps['onCloseReceipt'];
  data: ReceiptContextProps['receiptData'];
};

// -----------------------------------------------------------------

export default function OrderReceipt({ open, onClose, data }: Props) {
  return (
    <DialogAnimate open={open} onClose={onClose}>
      <DialogContent>
        <OrderReceiptContent onClose={onClose} data={data} />
      </DialogContent>
    </DialogAnimate>
  );
}
