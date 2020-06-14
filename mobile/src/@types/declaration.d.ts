declare module '*.png' {
  const value: any;
  export default value;
}
declare module 'react-native-dotenv' {
  export const API_URL: string;
  export const ENV: 'dev' | 'prod';
  export const WEB_CLIENT_ID: string;
}
