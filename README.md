# QuickRPC

A Vercel micro style framework for quickly building RPC functions.

It uses JSDoc to create the definitions to make creating definitions easier.

## Installation
Install it globally and use `quickrpc [directory]` to create a server for your requests.

You can then use Postman or similar to make requests.

## Options
- `-p`, `--port` - change the server port from the default `9090`

## Server Endpoints
### `/rpc`
Endpoint for calling the functions.

Make a post request with your function name and the required params
```
{
  "add": {
    "a": 1,
    "b": 2
  }
}
```

### `/describe`
Returns the structure of the available RPC requests

### TODO
- add returns types
- add optional parameters

## Note
This isn't intended for use in production. It was just an idea I had and thought I'd spin up to see if it would work...