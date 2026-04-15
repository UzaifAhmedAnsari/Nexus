import pg from 'pg';
import {env} from '../config/env.js';


const {Pool} = pg;

export const db = new Pool({
    connectionString: env.databaseUrl,
});

export async function getDatabaseTime(){
    const result = await db.query('SELECT NOW() AS now');
    return result.rows[0].now;
}

