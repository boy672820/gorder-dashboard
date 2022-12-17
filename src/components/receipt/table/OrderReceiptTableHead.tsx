import { TableCell, TableHead, TableRow } from '@mui/material';

export default function OrderReceiptTableHead() {
  return (
    <TableHead
      sx={{
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        '& th': { backgroundColor: 'transparent' },
      }}
    >
      <TableRow>
        <TableCell align="center" width={40}>
          #
        </TableCell>
        <TableCell align="left">구매상품 정보</TableCell>
        <TableCell align="center" width={80}>
          수량
        </TableCell>
        <TableCell align="right" width={120}>
          원가
        </TableCell>
        <TableCell align="right" width={120}>
          할인 금액
        </TableCell>
        <TableCell align="right" width={120}>
          결제 금액
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
