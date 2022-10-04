import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { FileHelper } from './helper/fileHelper';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const fileHelper = new FileHelper('memory.json');

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

app.post('/store', (req, res) => {
	fileHelper.writeFile({ num: req.body.num });
});

app.post('/read', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(fileHelper.readFile());
});
