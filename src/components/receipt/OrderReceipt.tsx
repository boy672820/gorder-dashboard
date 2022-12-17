import { TableContainer, Table, TableBody, Divider, Button, Stack } from '@mui/material';
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
  onClose: VoidFunction;
  data: ReceiptContextProps['receiptData'];
};

// ----------------------------------------------------------------------

export default function OrderReceiptContent({ onClose }: Props) {
  return (
    <>
      <OrderReceiptHeader />

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

      <Divider />

      <Stack justifyContent="flex-end" direction="row" sx={{ mt: 3 }}>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          닫기
        </Button>
      </Stack>
    </>
  );
}
