import express from 'express';
import router from './routes/apiRouter.js';
import connectDB from './config/db/dbConnect.js';
import 'dotenv/config';

const app = express();
const port = 9000;

// DB
connectDB();

// JSON Parser
app.use(express.json());

app.use('/api/v1', router);

app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
})