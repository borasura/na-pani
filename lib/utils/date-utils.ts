
export function formatDateWithMonthName(date : Date) {
    if (!date) return '';
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).replace(',', '');
}
