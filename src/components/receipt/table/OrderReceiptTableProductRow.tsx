import { Box, TableCell, TableRow, Typography } from '@mui/material';
import { fCurrency } from '../../../utils/formatNumber';
import Image from '../../Image';

export default function OrderReceiptTableProductRow() {
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
          아메리카노 ICE
        </Typography>
      </TableCell>

      <TableCell align="center">1개</TableCell>

      <TableCell align="right">{fCurrency(3000)}원</TableCell>

      <TableCell align="right">
        <Typography variant="body2" component="div">
          {fCurrency(1500)}원
          <Typography component={Box} variant="caption" sx={{ color: 'text.disabled' }}>
            50% 할인
          </Typography>
        </Typography>
      </TableCell>

      <TableCell align="right">
        <Typography variant="subtitle2" component="div">
          {fCurrency(1500)}원
          <Typography
            component={Box}
            variant="caption"
            sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
          >
            {fCurrency(3000)}원
          </Typography>
        </Typography>
      </TableCell>
    </TableRow>
  );
}
