## Backend for sec3hub.xyz

### Setup

a deno expriment . . .
this will aggregate all the data from the other services and return it to the frontend
a custom api made for sec3hub.xyz


intesting find deno has
    -  STD lib for testing and task runner
    -  no need for package.json
    -  there is watch mode for dev
    -  import from url

## Setup
for local dev can create a .env file in the root directory. for production use process env variables.





install deno
    
```bash
curl -fsSL https://deno.land/x/install/install.sh | sh
```

or via homebrew

```bash
brew install deno
```

there are two tasks for deno test and dev

```bash
deno task dev
```

```bash
deno task test
```


### API

there is insomia file in the root directory

