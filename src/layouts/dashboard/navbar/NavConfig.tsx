// components
import SvgIconStyle from '../../../components/SvgIconStyle';
import { PATH_PAGE } from '../../../routes/router';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  waiting: getIcon('ic_announcement'),
  processing: getIcon('ic_access_time'),
  completed: getIcon('ic_done'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      { title: '주문대기', path: PATH_PAGE.order.waiting, icon: ICONS.waiting },
      { title: '처리중', path: PATH_PAGE.order.processing, icon: ICONS.processing },
      { title: '완료', path: PATH_PAGE.order.completed, icon: ICONS.completed },
    ],
  },
];

export default navConfig;
