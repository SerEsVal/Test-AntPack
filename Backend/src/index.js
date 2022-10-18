import app from './app';
import '@babel/polyfill';

async function main(){
    await app.listen(1907);
    console.log('Server on  port 1907');
}

main();