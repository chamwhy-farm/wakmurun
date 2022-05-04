import express, { Request, Response, NextFunction } from 'express';

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Test hello');
});

app.listen(port, () => {
    console.log(`server is opened at ${port}`);
});