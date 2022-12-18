import { Grid, Box, Typography, useTheme } from '@mui/material';
// components
import Image from '../Image';
import Label from '../Label';
// utils
import { formatDate, formatTime } from '../../utils/formatTime';
// types
import { Order, OrderStatusLabel } from '../../@types/order';

type Props = {
  status?: Order['status'];
  createdAt?: Order['createdAt'];
};

export default function OrderReceiptHeader({ status, createdAt }: Props) {
  const theme = useTheme();

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
            color="error"
            sx={{ textTransform: 'uppercase', mb: 1 }}
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
