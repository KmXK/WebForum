import { format } from 'date-fns';

export function getDateTime(value: Date | string | number): string {
    const date: Date = typeof (value) === 'string' || typeof (value) === 'number' ? new Date(value) : value;

    return format(date, 'yyyy-MM-dd HH:mm:ss', {});
}