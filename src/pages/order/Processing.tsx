import { useState, useEffect } from 'react';
// @mui
import {
  Box,
  Card,
  Table,
  Switch,
  TableBody,
  Container,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { completeOrder, getOrders } from '../../redux/slices/order';
// hooks
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
// @types
import { Order } from '../../@types/order';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from '../../components/table';
// sections
import { OrderTableRow, ProcessingOrderAction } from '../../sections/@dashboard/order';
import { ReceiptProvider } from '../../contexts/ReceiptContext';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'createdAt', label: '주문시간', align: 'center', width: 110 },
  { id: 'description', label: '주문내역', align: 'center' },
  { id: '', width: 250 },
];

// ----------------------------------------------------------------------

export default function OrderProcessingList() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    // setPage,
    //
    selected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultOrderBy: 'createdAt',
  });

  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const {
    confirmedOrders: orders,
    confirmedOrderTotalCount: orderTotalCount,
    isLoading,
  } = useSelector((state) => state.order);

  const [tableData, setTableData] = useState<Order[]>([]);

  // const [filterName, setFilterName] = useState('');

  useEffect(() => {
    if (!orders.length) {
      dispatch(getOrders());
    }
  }, [orders, dispatch]);

  useEffect(() => {
    if (orders.length) {
      setTableData(orders);
    }
  }, [orders]);

  const handleComplete = ({ order, index }: { order: Order; index: number }) => {
    dispatch(completeOrder(order.orderId, index));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
  });

  // const handleFilterName = (filterName: string) => {
  //   setFilterName(filterName);
  //   setPage(0);
  // };

  // const dataFiltered = applySortFilter({
  //   tableData,
  //   comparator: getComparator(order, orderBy),
  //   filterName,
  // });

  const denseHeight = dense ? 60 : 80;

  // const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);
  const isNotFound = !isLoading && !dataFiltered.length;

  const heading = `조리 중${orderTotalCount ? `(${orderTotalCount})` : ''}`;

  return (
    <ReceiptProvider>
      <Page title={heading}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading={heading}
            links={[
              { name: '대시보드', href: '/' },
              {
                name: '주문관리',
                href: '/',
              },
              { name: heading },
            ]}
          />

          <Card>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 760, position: 'relative' }}>
                {selected.length > 0 && (
                  <TableSelectedActions
                    dense={dense}
                    numSelected={selected.length}
                    rowCount={tableData.length}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        tableData.map((row) => row.orderId)
                      )
                    }
                  />
                )}

                <Table size={dense ? 'small' : 'medium'}>
                  <TableHeadCustom
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={tableData.length}
                    numSelected={selected.length}
                    onSort={onSort}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        tableData.map((row) => row.orderId)
                      )
                    }
                  />

                  <TableBody>
                    {(isLoading ? [...(Array(rowsPerPage) as Order[])] : dataFiltered)
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) =>
                        row ? (
                          <OrderTableRow
                            key={index}
                            row={row}
                            selected={selected.includes(row.orderId)}
                            onSelectRow={() => onSelectRow(row.orderId)}
                            Action={
                              <ProcessingOrderAction
                                row={row}
                                index={index}
                                onComplete={handleComplete}
                              />
                            }
                          />
                        ) : (
                          !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                        )
                      )}

                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                    />

                    <TableNoData isNotFound={isNotFound} />
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <Box sx={{ position: 'relative' }}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={dataFiltered.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
                labelRowsPerPage="페이지당 표시 수"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
              />

              <FormControlLabel
                control={<Switch checked={dense} onChange={onChangeDense} />}
                label="작은 사이즈"
                sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
              />
            </Box>
          </Card>
        </Container>
      </Page>
    </ReceiptProvider>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
}: {
  tableData: Order[];
  comparator: (a: any, b: any) => number;
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  // if (filterName) {
  //   tableData = tableData.filter(
  //     (item: Record<string, any>) =>
  //       item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
  //   );
  // }

  return tableData;
}
