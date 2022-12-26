import { useCallback } from 'react';
import { Grid, Button } from '@mui/material';
// hooks
import useReceipt from '../../../hooks/useReceipt';
// types
import { Enumerable } from '../../../@types';
import { Order } from '../../../@types/order';

type Props = {
  row: Order;
  index: number;
  onComplete: (args: { order: Order; index: number }) => void;
};

export default function ProcessingOrderAction({ row, index, onComplete }: Props) {
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
  const handleComplete = () => {
    onComplete({ order: row, index });
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
          color="warning"
          size="large"
          fullWidth
          disabled={row.status !== Enumerable.OrderStatus.Confirmed}
          onClick={handleComplete}
        >
          {(row.status === Enumerable.OrderStatus.Confirmed && '완료하기') ||
            (row.status === Enumerable.OrderStatus.Cancelled && '취소됨') ||
            '조리 완료'}
        </Button>
      </Grid>
    </Grid>
  );
}
