import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello TypeScript!");
});

app.listen(3000, () => console.log("Server running on port 3000\nhttp://localhost:3000/"));
// npx ts-node index.ts