import i18n from '@shared/translations';

export async function initLocale() {
  const locale = await electronAPI.getSystemLocale();
  await i18n.changeLanguage(locale);
  return locale;
}

export function initApp({ locale }: { locale: string }) {
  return electronAPI.dispatch({
    type: 'app:init',
    payload: { locale },
  });
};
