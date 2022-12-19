import { format, formatDistanceToNow } from 'date-fns';

export function formatTime(date?: Date | string | number) {
  if (!date) {
    return '-- 00:00';
  }

  const d = new Date(date);
  const hm = format(d, 'hh:mm');
  const a = format(d, 'a') === 'AM' ? '오전' : '오후';

  return `${a} ${hm}`;
}

export function formatDate(date?: Date | string | number) {
  return date ? format(new Date(date), 'yyyy년 MM월 d일') : '0000년 00월 00일';
}

export function fToNow(date: Date | string | number) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
