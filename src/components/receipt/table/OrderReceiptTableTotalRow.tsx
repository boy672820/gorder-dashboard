import { Box, TableCell, TableRow, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import useReceipt from '../../../hooks/useReceipt';
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
  const { receiptData } = useReceipt();

  const basePrice = receiptData?.basePrice || 0;
  const discountPrice = receiptData?.discountPrice || 0;
  const totalPrice = receiptData?.totalPrice || 0;

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
          <Typography>{fCurrency(basePrice)}원</Typography>
        </TableCell>
      </RowResultStyle>

      <RowResultStyle>
        <TableCell colSpan={4} />
        <TableCell align="right">
          <Typography>할인 금액</Typography>
        </TableCell>
        <TableCell align="right" width={120}>
          <Typography sx={{ color: 'error.main' }}>{fCurrency(discountPrice)}원</Typography>
        </TableCell>
      </RowResultStyle>

      <RowResultStyle>
        <TableCell colSpan={4} />
        <TableCell align="right">
          <Typography variant="h6">총 결제 금액</Typography>
        </TableCell>
        <TableCell align="right" width={140}>
          <Typography variant="h6">{fCurrency(totalPrice)}원</Typography>
        </TableCell>
      </RowResultStyle>
    </>
  );
}
