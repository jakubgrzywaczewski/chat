import App from './app';
import RootRouter from './routes/root';

const PORT = Number(process.env.PORT) || 5000;
const app = new App([RootRouter], PORT);

app.listen();
