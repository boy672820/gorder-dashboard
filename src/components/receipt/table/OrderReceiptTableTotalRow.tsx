import { Box, TableCell, TableRow, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';

// ------------------------------------------------------------------------------

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ------------------------------------------------------------------------------

export default function OrderReceiptTableTotalRow() {
  return (
    <>
      <RowResultStyle>
        <TableCell colSpan={4} />
        <TableCell align="right">
          <Box sx={{ mt: 2 }} />
          <Typography>합계 금액</Typography>
        </TableCell>
        <TableCell align="right" width={120}>
          <Box sx={{ mt: 2 }} />
          <Typography>{fCurrency(3000)}원</Typography>
        </TableCell>
      </RowResultStyle>

      <RowResultStyle>
        <TableCell colSpan={4} />
        <TableCell align="right">
          <Typography>할인 금액</Typography>
        </TableCell>
        <TableCell align="right" width={120}>
          <Typography sx={{ color: 'error.main' }}>{fCurrency(-1500)}원</Typography>
        </TableCell>
      </RowResultStyle>

      <RowResultStyle>
        <TableCell colSpan={4} />
        <TableCell align="right">
          <Typography variant="h6">총 결제 금액</Typography>
        </TableCell>
        <TableCell align="right" width={140}>
          <Typography variant="h6">{fCurrency(1500)}원</Typography>
        </TableCell>
      </RowResultStyle>
    </>
  );
}
