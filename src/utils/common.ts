export const getPlaceSuffix = (place: number | null | undefined, lang: string): string => {
  if (typeof place !== 'number') {
      return '';
  }
  const langLower = lang.toLowerCase();

  if (langLower.startsWith('en')) {
      const j = place % 10;
      const k = place % 100;
      if (j === 1 && k !== 11) {
          return 'st';
      } else if (j === 2 && k !== 12) {
          return 'nd';
      } else if (j === 3 && k !== 13) {
          return 'rd';
      } else {
          return 'th';
      }
  } else if (langLower.startsWith('ru')) {
      return '-е';
  }

  return '';
};
