import {
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  Box,
  Grid,
  useTheme,
  Divider,
  Button,
  Stack,
  Container,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { fCurrency } from '../../utils/formatNumber';
import Image from '../Image';
import Label from '../Label';
import Scrollbar from '../Scrollbar';

// ----------------------------------------------------------------------

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

const OrderReceiptTableHead = () => (
  <TableHead
    sx={{
      borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
      '& th': { backgroundColor: 'transparent' },
    }}
  >
    <TableRow>
      <TableCell align="center" width={40}>
        #
      </TableCell>
      <TableCell align="left">구매상품 정보</TableCell>
      <TableCell align="center" width={80}>
        수량
      </TableCell>
      <TableCell align="right" width={120}>
        원가
      </TableCell>
      <TableCell align="right" width={120}>
        할인 금액
      </TableCell>
      <TableCell align="right" width={120}>
        결제 금액
      </TableCell>
    </TableRow>
  </TableHead>
);

// ----------------------------------------------------------------------

type Props = {
  onClose: VoidFunction;
};

// ----------------------------------------------------------------------

export default function OrderReceiptContent({ onClose }: Props) {
  const theme = useTheme();

  return (
    <Container>
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

      <Scrollbar>
        <TableContainer>
          <Table>
            <OrderReceiptTableHead />

            <TableBody>
              {[...Array(3)].map((_, index) => (
                <TableRow
                  key={index}
                  sx={{
                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  }}
                >
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

                  <TableCell align="right">{fCurrency(3000)}원</TableCell>

                  <TableCell align="right">
                    <Typography variant="body2" component="div">
                      {fCurrency(1500)}원
                      <Typography component={Box} variant="caption" sx={{ color: 'text.disabled' }}>
                        50% 할인
                      </Typography>
                    </Typography>
                  </TableCell>

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
              ))}

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
    </Container>
  );
}
