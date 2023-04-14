export const getPlaceSuffix = (place: number | null | undefined, lang: string): string => {
  if (typeof place !== 'number') {
      return '';
  }
  const langLower = lang.toLowerCase();
  let suffix = '';

  if (langLower.startsWith('en')) {
      const j = place % 10;
      const k = place % 100;
      if (j === 1 && k !== 11) {
          suffix = 'st';
      } else if (j === 2 && k !== 12) {
          suffix = 'nd';
      } else if (j === 3 && k !== 13) {
          suffix = 'rd';
      } else {
          suffix = 'th';
      }
  } else if (langLower.startsWith('ru')) {
      suffix = '-е';
  }

  return suffix;
};
