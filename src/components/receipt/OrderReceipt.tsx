import { TableContainer, Table, TableBody, Divider, Button, Stack } from '@mui/material';
// hooks
import useReceipt from '../../hooks/useReceipt';
// redux
import {
  cancelOrderByConfirmed,
  cancelOrderByPending,
  completeOrder,
  confirmOrder,
} from '../../redux/slices/order';
import { useDispatch } from '../../redux/store';
// components
import Scrollbar from '../Scrollbar';
import OrderReceiptHeader from './OrderReceiptHeader';
import {
  OrderReceiptTableHead,
  OrderReceiptTableProductRow,
  OrderReceiptTableTotalRow,
} from './table';
// types
import { Enumerable } from '../../@types';

// ----------------------------------------------------------------------

type Props = {
  pendingMode?: boolean;
};

// ----------------------------------------------------------------------

export default function OrderReceiptContent({ pendingMode }: Props) {
  // hooks
  const { stateIndex, receiptData, onCloseReceipt } = useReceipt();

  const dispatch = useDispatch();

  // -----------------------------------------------------------------------------------------------

  const handleConfirm = () => {
    if (receiptData !== null && stateIndex !== null) {
      dispatch(confirmOrder(receiptData.orderId, stateIndex));
      onCloseReceipt();
    }
  };

  const handleComplete = () => {
    if (receiptData !== null && stateIndex !== null) {
      dispatch(completeOrder(receiptData.orderId, stateIndex));
      onCloseReceipt();
    }
  };

  const handleCancel = async () => {
    if (receiptData !== null && stateIndex !== null) {
      onCloseReceipt();

      dispatch(
        (pendingMode ? cancelOrderByPending : cancelOrderByConfirmed)(
          receiptData.orderId,
          stateIndex
        )
      );
    }
  };

  // -----------------------------------------------------------------------------------------------

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
        {receiptData?.status !== Enumerable.OrderStatus.Cancelled && (
          <Button
            variant="text"
            color="inherit"
            onClick={handleCancel}
            disabled={receiptData?.status === Enumerable.OrderStatus.Completed}
          >
            주문 취소
          </Button>
        )}

        <Stack direction="row" gap={1}>
          <Button variant="outlined" color="inherit" onClick={onCloseReceipt}>
            닫기
          </Button>

          {receiptData?.status !== Enumerable.OrderStatus.Cancelled && (
            <Button
              variant="contained"
              color={receiptData?.status === Enumerable.OrderStatus.Pending ? 'primary' : 'warning'}
              onClick={
                (receiptData?.status === Enumerable.OrderStatus.Pending && handleConfirm) ||
                (receiptData?.status === Enumerable.OrderStatus.Confirmed && handleComplete) ||
                (() => {})
              }
              disabled={
                pendingMode
                  ? receiptData?.status !== Enumerable.OrderStatus.Pending
                  : receiptData?.status !== Enumerable.OrderStatus.Pending &&
                    receiptData?.status !== Enumerable.OrderStatus.Confirmed
              }
            >
              {pendingMode
                ? receiptData?.status === Enumerable.OrderStatus.Pending
                  ? '접수하기'
                  : '조리 중'
                : (receiptData?.status === Enumerable.OrderStatus.Pending && '접수하기') ||
                  (receiptData?.status === Enumerable.OrderStatus.Confirmed && '완료하기') ||
                  (receiptData?.status === Enumerable.OrderStatus.Delivering && '배달 중') ||
                  (receiptData?.status === Enumerable.OrderStatus.Completed && '조리 완료')}
            </Button>
          )}
        </Stack>
      </Stack>
    </>
  );
}
