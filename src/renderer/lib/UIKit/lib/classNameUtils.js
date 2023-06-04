export function classNameFromArray(array) {
  return array.filter(item => Boolean(item)).join(' ');
}

export function classNameFromDictionary(dictionary) {
  return Object.entries(dictionary).reduce((result, [className, enabled]) => {
    if (enabled) {
      result.push(className);
    }
    return result;
  }, []).join(' ');
}
