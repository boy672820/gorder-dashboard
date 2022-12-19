import { Box, TableCell, TableRow, Typography } from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Image from '../../Image';
// types
import { OrderProduct } from '../../../@types/order';

type Props = {
  row: OrderProduct;
};

export default function OrderReceiptTableProductRow({ row }: Props) {
  return (
    <TableRow
      sx={{
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    >
      <TableCell align="center">1</TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Image
          disabledEffect
          alt="아메리카노 ICE"
          src="https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg"
          sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }}
        />
        <Typography variant="subtitle2" noWrap>
          {row.name}
        </Typography>
      </TableCell>

      <TableCell align="center">{row.quantity}개</TableCell>

      <TableCell align="right">{fCurrency(row.basePrice)}원</TableCell>

      <TableCell align="right">
        <Typography variant="body2" component="div">
          {fCurrency(row.discountPrice)}원
          <Typography component={Box} variant="caption" sx={{ color: 'text.disabled' }}>
            {row.discountPercent} 할인
          </Typography>
        </Typography>
      </TableCell>

      <TableCell align="right">
        <Typography variant="subtitle2" component="div">
          {fCurrency(row.totalPrice)}원
          <Typography
            component={Box}
            variant="caption"
            sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
          >
            {fCurrency(row.basePrice)}원
          </Typography>
        </Typography>
      </TableCell>
    </TableRow>
  );
}
