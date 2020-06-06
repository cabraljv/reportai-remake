declare module '*.png' {
  const value: any;
  export default value;
}
declare module 'react-native-dotenv' {
  export const API_URL: string;
  export const ENV: 'dev' | 'prod';
}
