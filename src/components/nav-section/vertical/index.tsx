// @mui
import { styled } from '@mui/material/styles';
import { List, Box, ListSubheader } from '@mui/material';
// type
import { NavSectionProps } from '../type';
//
import { NavListRoot } from './NavList';
import { useSelector } from '../../../redux/store';

// ----------------------------------------------------------------------

export const ListSubheaderStyle = styled((props) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.primary,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

export default function NavSectionVertical({
  navConfig,
  isCollapse = false,
  ...other
}: NavSectionProps) {
  const { pendingOrderTotalCount, confirmedOrderTotalCount, completedOrderTotalCount } =
    useSelector((state) => state.order);

  const navItemMeta = {
    waiting: { count: pendingOrderTotalCount },
    processing: { count: confirmedOrderTotalCount },
    completed: { count: completedOrderTotalCount },
  };

  return (
    <Box {...other}>
      {navConfig.map((group) => (
        <List key={group.subheader} disablePadding sx={{ px: 2 }}>
          <ListSubheaderStyle
            sx={{
              ...(isCollapse && {
                opacity: 0,
              }),
            }}
          >
            {group.subheader}
          </ListSubheaderStyle>

          {group.items.map((list) => (
            <NavListRoot
              key={list.title + list.path}
              list={list}
              isCollapse={isCollapse}
              navItemMeta={navItemMeta}
            />
          ))}
        </List>
      ))}
    </Box>
  );
}
