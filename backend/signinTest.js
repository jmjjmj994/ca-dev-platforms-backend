import fetch from 'node-fetch';
import 'dotenv/config';

const supabaseUrl = "https://gnumotcfovtrisrpyswr.supabase.co";
const signInUrl = `${supabaseUrl}/auth/v1/token?grant_type=password`;
const CLIENTKEY = process.env.CLIENTKEY;

const testSignIn = async (email, password) => {
    try {
        const response = await fetch(signInUrl, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "apikey": CLIENTKEY
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error", error);
    }
};

testSignIn("messi@hotmail.com","messi123");