import sqlite3 from "sqlite3";
import { join } from "path";
import express from "express";
import fetch from "node-fetch"; // Certifique-se de instalar com `npm install node-fetch`

const app = express();
const port = 3000;

// Caminho do banco de dados
const dbPath = join("C:\\Users\\CAROL\\Documents\\GitHub\\Busca_de_Escolas\\escolas.db");

// Servir arquivos estáticos
app.use(express.static(join(__dirname, "../public")));

const OPEN_CAGE_API_KEY = "SUA_CHAVE_API"; // Substitua pela sua chave da API OpenCage

// Verifica e adiciona as colunas LATITUDE e LONGITUDE, se não existirem
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
    return;
  }

  db.run("ALTER TABLE ListaDeEscolas ADD COLUMN LATITUDE REAL", (err) => {
    if (err && !err.message.includes("duplicate column name")) {
      console.error("Erro ao adicionar coluna LATITUDE:", err.message);
    } else if (!err) {
      console.log("Coluna LATITUDE adicionada com sucesso.");
    }
  });

  db.run("ALTER TABLE ListaDeEscolas ADD COLUMN LONGITUDE REAL", (err) => {
    if (err && !err.message.includes("duplicate column name")) {
      console.error("Erro ao adicionar coluna LONGITUDE:", err.message);
    } else if (!err) {
      console.log("Coluna LONGITUDE adicionada com sucesso.");
    }
  });

  db.close((closeErr) => {
    if (closeErr) {
      console.error("Erro ao fechar a conexão:", closeErr.message);
    }
  });
});

// Rota para obter as escolas com localização
app.get("/escolas", (req, res) => {
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error("Erro ao conectar ao banco de dados:", err.message);
      res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
      return;
    }
  });

  db.all("SELECT ESCOLA, LATITUDE, LONGITUDE FROM ListaDeEscolas", (err, rows) => {
    if (err) {
      console.error("Erro ao buscar dados:", err.message);
      res.status(500).json({ error: "Erro ao buscar dados" });
    } else {
      res.json(rows);
    }

    db.close((closeErr) => {
      if (closeErr) {
        console.error("Erro ao fechar a conexão:", closeErr.message);
      }
    });
  });
});

// Rota para calcular e atualizar as coordenadas
app.get("/calcular-coordenadas", (req, res) => {
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error("Erro ao conectar ao banco de dados:", err.message);
      res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
      return;
    }
  });

  db.all("SELECT ID, ENDERECO FROM ListaDeEscolas WHERE LATITUDE IS NULL OR LONGITUDE IS NULL", async (err, rows) => {
    if (err) {
      console.error("Erro ao buscar endereços:", err.message);
      res.status(500).json({ error: "Erro ao buscar endereços" });
      db.close();
      return;
    }

    for (const escola of rows) {
      try {
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(escola.ENDERECO)}&key=${OPEN_CAGE_API_KEY}`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry;

          db.run(
            "UPDATE ListaDeEscolas SET LATITUDE = ?, LONGITUDE = ? WHERE ID = ?",
            [lat, lng, escola.ID],
            (updateErr) => {
              if (updateErr) {
                console.error(`Erro ao atualizar coordenadas para ${escola.ENDERECO}:`, updateErr.message);
              } else {
                console.log(`Coordenadas atualizadas para ${escola.ENDERECO}: LAT=${lat}, LNG=${lng}`);
              }
            }
          );
        } else {
          console.warn(`Nenhuma coordenada encontrada para ${escola.ENDERECO}`);
        }
      } catch (apiErr) {
        console.error(`Erro ao consultar API para ${escola.ENDERECO}:`, apiErr.message);
      }
    }

    db.close((closeErr) => {
      if (closeErr) {
        console.error("Erro ao fechar a conexão:", closeErr.message);
      }
    });

    res.json({ message: "Processo de cálculo de coordenadas iniciado. Verifique os logs para detalhes." });
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
