import { DialogContent } from '@mui/material';
import { ReceiptContextProps } from '../../contexts/ReceiptContext';
import { DialogAnimate } from '../animate';
// components
import OrderReceiptContent from './OrderReceipt';

type Props = Pick<ReceiptContextProps, 'openReceipt' | 'onCloseReceipt'>;

export default function OrderReceipt({ openReceipt, onCloseReceipt }: Props) {
  return (
    <DialogAnimate open={openReceipt} onClose={onCloseReceipt}>
      <DialogContent>
        <OrderReceiptContent onClose={onCloseReceipt} />
      </DialogContent>
    </DialogAnimate>
  );
}
