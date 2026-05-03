import i18n from '@shared/translations';
import { Command } from '@shared/infra/Command';

export default class InitTranslationsCmd implements Command<Promise<void>> {
  constructor(private locale: string) { }

  async execute() {
    await i18n.changeLanguage(this.locale);
  }
}
