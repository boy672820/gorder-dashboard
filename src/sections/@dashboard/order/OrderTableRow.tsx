import { TableRow, Checkbox, TableCell, Typography } from '@mui/material';
// components
import { SerializedMenu } from '../../../components/order';
// utils
import { formatTime } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
// @types
import { Order } from '../../../@types/order';

type Props = {
  row: Order;
  selected: boolean;
  onSelectRow: VoidFunction;
  Action: React.ReactNode;
};

export default function ProductTableRow({ row, selected, onSelectRow, Action }: Props) {
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell
        align="center"
        sx={{ fontWeight: 'bold', cursor: 'pointer' }}
        onClick={onSelectRow}
      >
        {formatTime(row.createdAt)}
      </TableCell>

      <TableCell align="left" sx={{ maxWidth: 0, cursor: 'pointer' }} onClick={onSelectRow}>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          [메뉴 {row._count.orderHasProducts}개] {fCurrency(row.totalPrice)}원
        </Typography>
        <Typography
          variant="body2"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <SerializedMenu products={row.orderHasProducts} />
        </Typography>
      </TableCell>

      <TableCell align="right">{Action}</TableCell>
    </TableRow>
  );
}
