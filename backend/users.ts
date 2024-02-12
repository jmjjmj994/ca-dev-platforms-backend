import express, { response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://gnumotcfovtrisrpyswr.supabase.co";
const CLIENTKEY = process.env.CLIENTKEY
const supabase = createClient(supabaseUrl, CLIENTKEY);

const app = express();

app.post('/signup', async (request, response) => {
    const  { email, password } = request.body;
})



