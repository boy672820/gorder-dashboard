import { Grid, Box, Typography, useTheme } from '@mui/material';
// hooks
import useReceipt from '../../hooks/useReceipt';
// utils
import { formatDate, formatTime } from '../../utils/formatTime';
// components
import Image from '../Image';
import Label from '../Label';
// types
import { OrderStatusLabel } from '../../@types/order';
import { Enumerable } from '../../@types';

export default function OrderReceiptHeader() {
  const theme = useTheme();

  const { receiptData } = useReceipt();

  const status = receiptData?.status;
  const createdAt = receiptData?.createdAt;

  return (
    <Grid container>
      <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
        <Image
          disabledEffect
          visibleByDefault
          alt="logo"
          src="/logo/logo_full.svg"
          sx={{ maxWidth: 120 }}
        />
      </Grid>

      <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
        <Box sx={{ textAlign: { sm: 'right' } }}>
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={
              (status === Enumerable.OrderStatus.Pending && 'primary') ||
              (status === Enumerable.OrderStatus.Confirmed && 'warning') ||
              (status === Enumerable.OrderStatus.Delivering && 'warning') ||
              (status === Enumerable.OrderStatus.Completed && 'success') ||
              (status === Enumerable.OrderStatus.Cancelled && 'default') ||
              'default'
            }
          >
            {status ? OrderStatusLabel[status] : '-'}
          </Label>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
        <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
          결제 날짜
        </Typography>
        <Typography variant="body2">{formatDate(createdAt)}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
        <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
          결제 시간
        </Typography>
        <Typography variant="body2">{formatTime(createdAt)}</Typography>
      </Grid>
    </Grid>
  );
}
