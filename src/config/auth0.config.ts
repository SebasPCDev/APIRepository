import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env.development' });

export const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'EKNmANh3Vlv2KUR8rThRImeBvzMDZnV2',
  issuerBaseURL: 'https://dev-2djackszkopupib7.us.auth0.com',
};
