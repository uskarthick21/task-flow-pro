const getEnv = (key: string, defaultValue?: string): string => {
    const value = process.env[key] || defaultValue;
    if(value === undefined){
        throw Error (`Missing string enviroment variable for ${key}`)
    }
    return value;
}

export const NODE_ENV = getEnv("NODE_ENV");
export const PORT = getEnv("PORT", "4004");
export const MONGO_URL = getEnv("MONGO_URL");
export const APP_ORIGIN = getEnv("APP_ORIGIN");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");