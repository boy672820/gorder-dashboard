import { TableRow, Checkbox, TableCell, Typography, Button } from '@mui/material';
// utils
import { formatTime } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
// @types
import { Order } from '../../../../@types/order';
import React from 'react';

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
  row: Order;
  selected: boolean;
  onSelectRow: VoidFunction;
};

export default function ProductTableRow({ row, selected, onSelectRow }: Props) {
  const handleConfirm = (orderId: Order['orderId']) => {};
  
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell align="center" sx={{ fontWeight: 'bold' }}>
        {formatTime(row.createdAt)}
      </TableCell>

      <TableCell align="left" sx={{ maxWidth: 0 }}>
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
        <Button type="button" variant="outlined" color="secondary" size="large" sx={{ mr: 1 }}>
          주문표 확인
        </Button>
        <Button type="button" variant="contained" color="primary" size="large" onClick={() => handleConfirm(row.orderId)}>
          접수하기
        </Button>
      </TableCell>
    </TableRow>
  );
}
