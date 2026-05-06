export const dateForHuman = (date: string | Date): string => {
  const targetDate = typeof date === 'string' ? new Date(date) : date;

  if (Number.isNaN(targetDate.getTime())) {
    return '';
  }

  const now = new Date();
  const diffSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

  if (diffSeconds < 0) {
    return 'sebentar lagi';
  }

  if (diffSeconds < 60) {
    return 'baru saja';
  }

  const units = [
    { name: 'tahun', seconds: 60 * 60 * 24 * 365 },
    { name: 'bulan', seconds: 60 * 60 * 24 * 30 },
    { name: 'minggu', seconds: 60 * 60 * 24 * 7 },
    { name: 'hari', seconds: 60 * 60 * 24 },
    { name: 'jam', seconds: 60 * 60 },
    { name: 'menit', seconds: 60 },
  ];

  for (const unit of units) {
    const amount = Math.floor(diffSeconds / unit.seconds);
    if (amount >= 1) {
      return `${amount} ${unit.name} yang lalu`;
    }
  }

  return 'baru saja';
};
