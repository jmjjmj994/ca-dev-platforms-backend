import express from 'express';
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://gnumotcfovtrisrpyswr.supabase.co',
  process.env.CLIENTKEY
);

const app = express();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log('Server running on', PORT);
});

app.get('/api/cars', async (request, response) => {
  const { data, error } = await supabase.from('cars').select('*');
  response.json({ data });
});
