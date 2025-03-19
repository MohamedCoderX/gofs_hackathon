import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import reportsRoutes from './routes/reports.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/reports', reportsRoutes);

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));