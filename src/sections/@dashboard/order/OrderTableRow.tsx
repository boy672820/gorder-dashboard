import { useState, useCallback } from 'react';
import { TableRow, Checkbox, TableCell, Typography, Button, Grid } from '@mui/material';
// components
import { SerializedMenu } from '../../../components/order';
// hooks
import useReceipt from '../../../hooks/useReceipt';
// utils
import { formatTime } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
// @types
import { Order } from '../../../@types/order';

type Props = {
  index: number;
  row: Order;
  selected: boolean;
  onSelectRow: VoidFunction;
  onConfirm: (orderId: Order['orderId'], index: number) => Promise<void> | void;
};

export default function ProductTableRow({ index, row, selected, onSelectRow, onConfirm }: Props) {
  // Receipt hook
  const { onOpenReceipt } = useReceipt();

  /**
   * Open Receipt Dialog
   */
  const handleOpenReceipt = useCallback(() => {
    onOpenReceipt(row);
  }, [onOpenReceipt, row]);

  // ---------------------------------------------------------------------------------------------

  const [confirmed, setConfirmed] = useState<boolean>(false);

  /**
   * Change order status to Confirm
   */
  const handleConfirm = useCallback(
    async (orderId: Order['orderId'], index: number) => {
      await onConfirm(orderId, index);

      setConfirmed(true);
    },
    [onConfirm]
  );

  // ---------------------------------------------------------------------------------------------

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell
        align="center"
        sx={{ fontWeight: 'bold', cursor: 'pointer' }}
        onClick={onSelectRow}
      >
        {formatTime(row.createdAt)}
      </TableCell>

      <TableCell align="left" sx={{ maxWidth: 0, cursor: 'pointer' }} onClick={onSelectRow}>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          [메뉴 {row._count.orderHasProducts}개] {fCurrency(row.amount)}원
        </Typography>
        <Typography
          variant="body2"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <SerializedMenu products={row.orderHasProducts} />
        </Typography>
      </TableCell>

      <TableCell align="right">
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
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
              disabled={confirmed}
              onClick={() => handleConfirm(row.orderId, index)}
              fullWidth
            >
              {confirmed ? '조리 중' : '접수하기'}
            </Button>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
}
