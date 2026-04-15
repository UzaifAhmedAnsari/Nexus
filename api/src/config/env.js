import "dotenv/config";


export const env = {
    nodeEnv: process.env.NODE_ENV || "development",
    apiPort: Number(process.env.API_PORT || 8000),
    databaseUrl: process.env.DATABASE_URL || '',
};