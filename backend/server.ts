import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://gnumotcfovtrisrpyswr.supabase.co',
  process.env.CLIENTKEY
);

const app = express();
app.use(cors());
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log('Server running on', PORT);
});

app.get('/api/cars', async (request, response) => {
  const { data, error } = await supabase.from('cars').select('*');
  response.json({ data });
});

app.post('/api/cars/insert', async (request, response) => {
  const { error } = await supabase
    .from('cars')
    .insert({ id: 1, name: 'Denmark' });
  if (error) return response.status(404).json({ error: 'Problems' });
});
