import { Grid, Box, Typography, useTheme } from '@mui/material';
import Image from '../Image';
import Label from '../Label';

export default function OrderReceiptHeader() {
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
            주문 대기 중
          </Label>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
        <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
          결제 날짜
        </Typography>
        <Typography variant="body2">2022년 12월 15일</Typography>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
        <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
          결제 시간
        </Typography>
        <Typography variant="body2">오후 15:41</Typography>
      </Grid>
    </Grid>
  );
}
