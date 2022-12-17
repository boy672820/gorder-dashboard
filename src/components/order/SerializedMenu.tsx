import { Fragment } from 'react';
import { Typography } from '@mui/material';
import { Order } from '../../@types/order';

type Props = {
  products: Order['orderHasProducts'];
};

export default function SerializedMenu({ products }: Props) {
  let key = 0;

  const result = products.reduce((acc, product, index) => {
    acc.push(
      <Fragment key={key}>
        &nbsp;/&nbsp;
        {product.name}
        <Typography variant="body2" sx={{ color: 'text.secondary' }} component="span">
          (+{product.quantity})
        </Typography>
      </Fragment>
    );
    key += 1;

    return acc;
  }, [] as any);

  result[0] = (
    <Fragment key={0}>
      {products[0].name}
      <Typography variant="body2" sx={{ color: 'text.secondary' }} component="span">
        (+{products[0].quantity})
      </Typography>
    </Fragment>
  );

  return result;
}
