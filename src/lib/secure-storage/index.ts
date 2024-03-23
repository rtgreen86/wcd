import keytar from 'keytar';

export const getPassword = (service: string, account: string) => keytar.getPassword(service, account);

export const setPassword = (service: string, account: string, password: string) => keytar.setPassword(service, account, password);
