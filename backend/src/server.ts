import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());


app.post("/products", async (req: Request, res: Response) => {
  const { name, price, description } = req.body;
  try {
    const product = await prisma.product.create({
      data: { name, price, description },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o produto" });
  }
});


app.get("/products", async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar os produtos" });
  }
});


app.put("/products/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  try {
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, price, description },
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o produto" });
  }
});


app.delete("/products/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id: Number(id) } });
    res.json({ message: "Produto deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o produto" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
