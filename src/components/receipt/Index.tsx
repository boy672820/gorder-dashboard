import { DialogContent } from '@mui/material';
import useReceipt from '../../hooks/useReceipt';
// components
import { DialogAnimate } from '../animate';
// components
import OrderReceiptContent from './OrderReceipt';

type Props = {
  pendingMode?: boolean;
};

export default function OrderReceipt({ pendingMode }: Props) {
  const { openReceipt, onCloseReceipt } = useReceipt();

  return (
    <DialogAnimate open={openReceipt} onClose={onCloseReceipt}>
      <DialogContent>
        <OrderReceiptContent pendingMode={pendingMode} />
      </DialogContent>
    </DialogAnimate>
  );
}
