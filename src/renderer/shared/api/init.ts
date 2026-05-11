import i18n from '@shared/translations';

export async function init() {
  const locale = await electronAPI.getSystemLocale();
  await i18n.changeLanguage(locale);
  return electronAPI.dispatch({
    type: 'app:init',
    payload: { locale },
  });
};
