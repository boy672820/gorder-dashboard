import { TableContainer, Table, TableBody, Divider, Button, Stack } from '@mui/material';
// hooks
import useReceipt from '../../hooks/useReceipt';
// components
import Scrollbar from '../Scrollbar';
import OrderReceiptHeader from './OrderReceiptHeader';
import {
  OrderReceiptTableHead,
  OrderReceiptTableProductRow,
  OrderReceiptTableTotalRow,
} from './table';

// ----------------------------------------------------------------------

export default function OrderReceiptContent() {
  const { receiptData, onCloseReceipt } = useReceipt();

  const products = receiptData?.orderHasProducts || [];

  return (
    <>
      <OrderReceiptHeader />

      <Scrollbar>
        <TableContainer>
          <Table>
            <OrderReceiptTableHead />

            <TableBody>
              {products.map((product, index) => (
                <OrderReceiptTableProductRow key={index} row={product} />
              ))}

              <OrderReceiptTableTotalRow />
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider sx={{ mt: 1.5 }} />

      <Stack justifyContent="space-between" direction="row" sx={{ mt: 2.5 }}>
        <Button variant="text" color="inherit" onClick={onCloseReceipt}>
          주문 취소
        </Button>

        <Stack direction="row" gap={1}>
          <Button variant="outlined" color="inherit" onClick={onCloseReceipt}>
            닫기
          </Button>
          <Button variant="contained" color="primary">
            접수하기
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
