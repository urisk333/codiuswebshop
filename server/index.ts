import express, { Application } from 'express';
import cors from 'cors';
import router from './router';
import path from 'path';

const app: Application = express();
const SERVER_PORT = 3001;

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());
app.use(router);
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

(async function (): Promise<void> {
  try {
    app.listen(process.env.PORT || SERVER_PORT, (): void => {
      console.log(`Server is UP at http://localhost:${SERVER_PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
