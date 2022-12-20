import { Grid, Button } from '@mui/material';
import { useCallback } from 'react';
import { Order, OrderStatus } from '../../../@types/order';
// hooks
import useReceipt from '../../../hooks/useReceipt';

type Props = {
  row: Order;
  index: number;
  onConfirm: (args: { order: Order; index: number }) => void;
};

export default function WaitingOrderAction({ row, index, onConfirm }: Props) {
  // Receipt hook
  const { onOpenReceipt } = useReceipt();

  /**
   * Open Receipt Dialog
   */
  const handleOpenReceipt = useCallback(() => {
    onOpenReceipt({ data: row, index });
  }, [onOpenReceipt, row, index]);

  /**
   * Confirm Order
   */
  const handleConfirm = () => {
    onConfirm({ order: row, index });
  };

  // ---------------------------------------------------------------------------------------------

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <Button
          type="button"
          variant="outlined"
          color="inherit"
          size="large"
          fullWidth
          onClick={handleOpenReceipt}
        >
          주문표
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          type="button"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={row.status !== OrderStatus.Pending}
          onClick={handleConfirm}
        >
          {row.status === OrderStatus.Pending ? '접수하기' : '조리 중'}
        </Button>
      </Grid>
    </Grid>
  );
}
