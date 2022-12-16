import { useContext } from 'react';
import { ReceiptContext } from '../contexts/ReceiptContext';

const useReceipt = () => useContext(ReceiptContext);

export default useReceipt;
