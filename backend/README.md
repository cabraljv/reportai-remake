<img alt="Screenshot" title="Screenshot" src="../docs/logo.png" width="100px" />

# ReportAí

Remake da aplicação [ReportAí](http://reportai.com.br) completa em TypeScript

## Tools
 - TypeScript
 - Express
 - Docker
 - Postgres
 - TypeOrm
 - OAuth2

## To Do
 - Notificações
 
## Requests

#### Session
`/session/mobile` - start a session in mobile app
`/session/analyse` - start a session in analyse

Request:
```typescript
  {
    idToken: string;
    oauth_provider: 'google' | 'facebook';
  }
```
Response:
```typescript
  {
    user: {
      name:string;
      email:string;
      city_analyser?: {
        id: string;
        name:string;
      }
    };
    token: string;
  }
```

 ---
Licença

MIT

