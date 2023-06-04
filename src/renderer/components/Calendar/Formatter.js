export default class Formatter {
  static fixed(format, value) {
    return format.substring(value.toString().length).concat(value.toString());
  }

  static isoDate(date) {
    return [
      date.getFullYear().toString().padStart(4, '0'),
      (date.getMonth() + 1).toString().padStart(2, '0'),
      date.getDate().toString().padStart(2, '0')
    ].join('-');
  }
}
