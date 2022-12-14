import {
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from '../../../../components/Image';
import Scrollbar from '../../../../components/Scrollbar';
import { fCurrency } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

const OrderReceiptTableHead = () => (
  <TableHead>
    <TableRow>
      <TableCell align="center" width={40}>
        #
      </TableCell>
      <TableCell align="center">상품</TableCell>
      <TableCell align="center">수량</TableCell>
      <TableCell align="right">할인</TableCell>
      <TableCell align="right">금액</TableCell>
    </TableRow>
  </TableHead>
);

// ----------------------------------------------------------------------

export default function OrderReceiptContent() {
  return (
    <Scrollbar>
      <TableContainer>
        <Table>
          <OrderReceiptTableHead />

          <TableBody>
            <TableRow>
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

              <TableCell align="right">50%</TableCell>

              <TableCell align="right">
                <Typography variant="subtitle2">
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

            <RowResultStyle>
              <TableCell colSpan={3} />
              <TableCell align="right">
                <Box sx={{ mt: 2 }} />
                <Typography>Subtotal</Typography>
              </TableCell>
              <TableCell align="right" width={120}>
                <Box sx={{ mt: 2 }} />
                <Typography>{fCurrency(3000)}</Typography>
              </TableCell>
            </RowResultStyle>

            <RowResultStyle>
              <TableCell colSpan={3} />
              <TableCell align="right">
                <Typography>Discount</Typography>
              </TableCell>
              <TableCell align="right" width={120}>
                <Typography sx={{ color: 'error.main' }}>{fCurrency(-1500)}</Typography>
              </TableCell>
            </RowResultStyle>

            <RowResultStyle>
              <TableCell colSpan={3} />
              <TableCell align="right">
                <Typography variant="h6">Total</Typography>
              </TableCell>
              <TableCell align="right" width={140}>
                <Typography variant="h6">{fCurrency(1500)}</Typography>
              </TableCell>
            </RowResultStyle>
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
}
