This is a FE-only application in fulfillment of Ingenuity's Trial Project Requirements, developed with [Next.js](https://nextjs.org/), [MUI](https://mui.com/), and [json-server](https://www.npmjs.com/package/json-server).

## Getting Started

First, install the required packages for this project in your terminal:

```bash
npm install
```

Second, run two terminals and run the development server in the first terminal:

```bash
npm run dev
```

Third, run `json-server` in port 4000 in the second terminal with the provided `db.json` file:

```bash
json-server --watch -p 4000 db.json
```

Fourth, open [http://localhost:3000](http://localhost:3000) with your browser to see the development server.

## Application Details

The application currently has the following functions:

- Enter the site as Basic User / Admin
- View Recipes
- View My Recipes
    - Shows recipes created by the user
- Add Recipe
- Update Recipe
    - Only Admin or author of recipe can update recipe
- Delete Recipe
    - Only Admin or author of recipe can delete recipe

## Mock API

[json-server](https://www.npmjs.com/package/json-server) is used for creating the Mock API for adding, viewing, updating, and deleting recipe entries, hosted in port 4000.

Data stored can be checked in `db.json`.
