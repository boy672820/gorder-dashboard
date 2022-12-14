import { useCallback, useState } from 'react';
import { DialogContent } from '@mui/material';
import { DialogAnimate } from '../../../../components/animate';
import OrderReceiptContent from './OrderReceipt';

export default function OrderReceipt() {
  const [open, setOpen] = useState<boolean>(true);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <DialogAnimate open={open} onClose={handleClose}>
      <DialogContent>
        <OrderReceiptContent />
      </DialogContent>
    </DialogAnimate>
  );
}
