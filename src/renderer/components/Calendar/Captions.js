export function getDaysOfWeekCaptions(locale) {
  const date = new Date();
  const intl = new Intl.DateTimeFormat(locale, {
    weekday: 'short'
  });
  const weekdays = [];
  for (let i = 1; i <= 7; i++) {
    date.setDate(i);
    const day = date.getDay();
    weekdays[day] = capitalizeFirstLetter(intl.format(date));
  }
  return weekdays;
}

export function getMonthesCaptions(locale) {
  const date = new Date();
  date.setDate(1);
  date.setMonth(1);
  const intl = new Intl.DateTimeFormat(locale, {
    month: 'long'
  });
  const monthes = [];
  for (let i = 0; i < 12; i++) {
    date.setMonth(i)
    monthes[i] = capitalizeFirstLetter(intl.format(date));
  }
  return monthes;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// new Intl.Locale(navigator.language).weekInfo
// Intl.getCanonicalLocales('EN-US')