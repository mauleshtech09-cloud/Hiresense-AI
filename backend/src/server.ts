import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import resumeRoutes from './routes/resumeRoutes';
import reportRoutes from './routes/reportRoutes';
import profileRoutes from './routes/profileRoutes';
import planRoutes from './routes/planRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/plan', planRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`HireSense AI Backend running on port ${PORT}`);
});
