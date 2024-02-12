import express from 'express';
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://gnumotcfovtrisrpyswr.supabase.co', process.env.CLIENTKEY);
const app = express();
app.post('/signup', async (request, response) => {
});
