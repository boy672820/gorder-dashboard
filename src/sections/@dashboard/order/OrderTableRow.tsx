import { TableRow, Checkbox, TableCell, Typography, Button, Grid } from '@mui/material';
// utils
import { formatTime } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
// @types
import { Order } from '../../../@types/order';
import React, { useCallback } from 'react';
import useReceipt from '../../../hooks/useReceipt';

// ----------------------------------------------------------------------

const serializeMenu = (products: Order['orderHasProducts']) => {
  let key = 0;

  const result = products.reduce((acc, product, index) => {
    acc.push(
      <React.Fragment key={key}>
        &nbsp;/&nbsp;
        {product.name}
        <Typography variant="body2" sx={{ color: 'text.secondary' }} component="span">
          (+{product.quantity})
        </Typography>
      </React.Fragment>
    );
    key += 1;

    return acc;
  }, [] as any);

  result[0] = (
    <React.Fragment key={0}>
      {products[0].name}
      <Typography variant="body2" sx={{ color: 'text.secondary' }} component="span">
        (+{products[0].quantity})
      </Typography>
    </React.Fragment>
  );

  return result;
};

// ----------------------------------------------------------------------

type Props = {
  index: number;
  row: Order;
  selected: boolean;
  onSelectRow: VoidFunction;
  onConfirm: (orderId: Order['orderId'], index: number) => Promise<void> | void;
};

export default function ProductTableRow({ index, row, selected, onSelectRow, onConfirm }: Props) {
  const [confirmed, setConfirmed] = React.useState<boolean>(false);

  const handleConfirm = useCallback(
    async (orderId: Order['orderId'], index: number) => {
      await onConfirm(orderId, index);

      setConfirmed(true);
    },
    [onConfirm]
  );

  const { onOpenReceipt } = useReceipt();

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
          {serializeMenu(row.orderHasProducts)}
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
              onClick={onOpenReceipt}
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
