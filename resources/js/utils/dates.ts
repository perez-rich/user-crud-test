import dayjs from 'dayjs';

export const shortFormat = (date: string) => {
    if (!date) {
        return null;
    }

    return dayjs(date).format('MMMM DD, YYYY');
};
