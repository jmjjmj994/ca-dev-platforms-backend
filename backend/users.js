import express from 'express';
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = "https://gnumotcfovtrisrpyswr.supabase.co";
const CLIENTKEY = process.env.CLIENTKEY;
const supabase = createClient(supabaseUrl, CLIENTKEY);
const router = express.Router();
console.log("hei");
router.post('/signup', async (request, response) => {
    const { email, password } = request.body;
    console.log("hei");
    try {
        const { user, session, error } = await supabase.auth.signUp({
            email: email,
            password: password
        });
        if (error) {
            return response.status(400).json({ error: error.message });
        }
        else {
            response.status(201).json({ message: "User created", user });
        }
    }
    catch (error) {
        response.status(500).json({ error: "Server error" });
    }
});
