import { TableContainer, Table, TableBody, Divider, Button, Stack, Grid } from '@mui/material';
// components
import Scrollbar from '../Scrollbar';
import OrderReceiptHeader from './OrderReceiptHeader';
import {
  OrderReceiptTableHead,
  OrderReceiptTableProductRow,
  OrderReceiptTableTotalRow,
} from './table';
// types
import { ReceiptContextProps } from '../../contexts/ReceiptContext';

// ----------------------------------------------------------------------

type Props = {
  data: ReceiptContextProps['receiptData'];
  onClose: ReceiptContextProps['onCloseReceipt'];
};

// ----------------------------------------------------------------------

export default function OrderReceiptContent({ data, onClose }: Props) {
  return (
    <>
      <OrderReceiptHeader createdAt={data?.createdAt} status={data?.status} />

      <Scrollbar>
        <TableContainer>
          <Table>
            <OrderReceiptTableHead />

            <TableBody>
              {[...Array(3)].map((_, index) => (
                <OrderReceiptTableProductRow key={index} />
              ))}
              <OrderReceiptTableTotalRow />
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider sx={{ mt: 1.5 }} />

      <Stack justifyContent="space-between" direction="row" sx={{ mt: 2.5 }}>
        <Button variant="outlined" color="error" onClick={onClose}>
          주문 취소
        </Button>

        <Stack direction="row" gap={1}>
          <Button variant="outlined" color="inherit" onClick={onClose}>
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
