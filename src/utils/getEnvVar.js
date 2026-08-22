import dotenv from 'dotenv';
dotenv.config();

export const getEnvVar = (name, defaultValue) => {
  const value = process.env[name];
  //   console.log(process.env[name]);
  //   console.log(process.env.PORT);

  if (value) return value;
  if (defaultValue) return defaultValue;
  throw new Error(`Missing: process.env['${name}'].`);
};
