import keytar from 'keytar';
const applicationName = 'su.malokhatko.wcalendar';
const account = 'pin';
const password1 = await keytar.getPassword(applicationName, account);
console.log('password1', password1);
await keytar.setPassword(applicationName, account, '0000');
const password2 = await keytar.getPassword(applicationName, account);
console.log('password2', password2);

// await keytar.deletePassword('my-service', 'my-account');
// const password3 = await keytar.getPassword('my-service', 'my-account');
// console.log('password3', password3);

console.log('OK');
