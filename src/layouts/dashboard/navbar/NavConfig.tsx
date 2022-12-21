// components
import { PATH_PAGE } from '../../../routes/router';

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      { id: 'waiting', title: '주문대기', path: PATH_PAGE.order.waiting },
      { id: 'processing', title: '조리 중', path: PATH_PAGE.order.processing },
      { id: 'completed', title: '조리 완료', path: PATH_PAGE.order.completed },
    ],
  },
];

export default navConfig;
