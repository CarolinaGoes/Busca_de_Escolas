import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function criarTabela() {
    const db = await open({
        filename: './escolas.db',
        driver: sqlite3.Database,
    });

    await db.run(`
        CREATE TABLE IF NOT EXISTS listaDeEscolas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            DRE TEXT,
            ESCOLA TEXT,
            ENDERECO TEXT,
            CEP TEXT,
            FONE TEXT
        )
    `);

    console.log("Tabela criada com sucesso!");

    await db.close();
}

async function inserirEscolas(listaDeEscolas) {
    const db = await open({
        filename: './escolas.db',
        driver: sqlite3.Database,
    });

    // Iniciar transação para melhor performance
    await db.run("BEGIN TRANSACTION");

    const stmt = await db.prepare(`INSERT INTO listaDeEscolas (DRE, ESCOLA, ENDERECO, CEP, FONE) VALUES (?, ?, ?, ?, ?)`);

    for (const escola of listaDeEscolas) {
        // Verificar se todas as propriedades estão definidas
        if (escola.dre && escola.nome && escola.endereco && escola.cep && escola.telefone) {
            await stmt.run(escola.dre, escola.nome, escola.endereco, escola.cep, escola.telefone);
        } else {
            console.error("Escola com dados incompletos:", escola);
        }
    }

    await stmt.finalize();
    await db.run("COMMIT");

    console.log(`${listaDeEscolas.length} escolas inseridas com sucesso!`);

    await db.close();
}

await criarTabela();

const escolas = [
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI AIRTON PEREIRA DA SILVA, FREI",
        "endereco": "RUA DA SAFRA COM TREVO DO CHEIRO, S/Nº - CAPÃO REDONDO",
        "cep": "05868-040",
        "telefone": "5824-1089"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI BRYAN BIGUINATI JARDIM",
        "endereco": "RUA FRANCISCO SOARES, 27 - JARDIM INGA",
        "cep": "05774-300",
        "telefone": "5819-1571"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI CID FRANCO, VEREADOR",
        "endereco": "RUA AURELIO BELOTTI JUNIOR, 80 - JARDIM SAMARA",
        "cep": "05759-210",
        "telefone": "5842-3100"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI GUMERCINDO DE PADUA FLEURY, VEREADOR",
        "endereco": "RUA RAIMUNDA FRANKLIN DE MELO, 300 - PQ. SANTO ANTONIO",
        "cep": "05850-270",
        "telefone": "5816-0589"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI JARDIM CAPELA",
        "endereco": "RUA JOSÉ ROBERTO SALES, 100 - JARDIM CAPELA",
        "cep": "04960-100",
        "telefone": "5517-0192"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI JARDIM CATANDUVA",
        "endereco": "RUA DR. RENATO BUENO NETO, S/Nº - JARDIM CATANDUVA",
        "cep": "05767-350",
        "telefone": "5841-1870"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI JARDIM COPACABANA",
        "endereco": "RUA SANTA RITA DO SAPUCAI, 215 - JARDIM COPACABANA",
        "cep": "04939-170",
        "telefone": "5832-6872"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI JARDIM DIONISIO",
        "endereco": "RUA WILLIAM CREMER, 2 - JARDIM DIONISIO",
        "cep": "04935-120",
        "telefone": "5832-6628"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI JARDIM DOM JOSÉ",
        "endereco": "RUA ANUM DOURADO, 225 - JARDIM DOM JOSÉ",
        "cep": "05887-310",
        "telefone": "5821-2180"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI JARDIM ELFRIDA ZUKOWSKI",
        "endereco": "RUA JOÃO ANDRÉ LEYSER, 99 - VILA FAZZEONI",
        "cep": "05884-100",
        "telefone": "5873-5385"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI JARDIM GUARUJÁ",
        "endereco": "AV. GUARUJÁ, S/Nº - JARDIM GUARUJÁ",
        "cep": "05877-350",
        "telefone": "5873-3210"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI JARDIM KAGOHARA",
        "endereco": "RUA DAS FERMATAS X R. COMPASSOS, 120 - JARDIM KAGOHARA",
        "cep": "04938-030",
        "telefone": "5831-0147"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI JARDIM KLEIN",
        "endereco": "RUA BONIFÁCIO DE MONTEFERRAT, 143 - JARDIM KLEIN",
        "cep": "05831-040",
        "telefone": "5514-5060"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI JARDIM MACEDONIA",
        "endereco": "RUA SORIANO DE ALBUQUERQUE, 77 - JARDIM MACEDONIA",
        "cep": "05894-440",
        "telefone": "5821-7979"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI JARDIM MARIA ALICE",
        "endereco": "RUA FELICE GIARDINI, 350 - PQ. AMÉLIA",
        "cep": "04932-390",
        "telefone": "5514-3501"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI JARDIM MITSUTANI",
        "endereco": "RUA MARCO DE CANAVESES, 35 - JARDIM MITSUTANI",
        "cep": "05791-190",
        "telefone": "5825-2321"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI JARDIM NAKAMURA",
        "endereco": "RUA MIGUEL DIONISIO VALE, 68 - JARDIM NAKAMURA",
        "cep": "04942-040",
        "telefone": "5832-7213"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI JARDIM REBOUÇAS",
        "endereco": "RUA CAWIMA, S/Nº - JARDIM REBOUÇAS",
        "cep": "05734-050",
        "telefone": "5844-3760"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI JARDIM ROSA MARIA",
        "endereco": "RUA ADELINO BRANCO DE ANDRADE, 37 - JARDIM ROSA MARIA",
        "cep": "04930-070",
        "telefone": "5893-0232"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI JARDIM SÃO BENTO VELHO",
        "endereco": "RUA BATALHA REIS, 35 - JARDIM SÃO BENTO VELHO",
        "cep": "05882-360",
        "telefone": "5873-4105"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI JARDIM SÃO LUIZ I",
        "endereco": "RUA ARQUITETO ROBERTO PATRÃO ASSIS, 141 - JARDIM SÃO LUIZ",
        "cep": "05846-100",
        "telefone": "5511-7298"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI JARDIM SÃO LUIZ II",
        "endereco": "RUA COLOMBO LEONI, 23 - JARDIM SÃO LUIZ",
        "cep": "05846-210",
        "telefone": "5816-5196"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI JARDIM SÃO JOAQUIM",
        "endereco": "RUA BACABINHA, 1.100 - JARDIM SÃO JOAQUIM",
        "cep": "04917-030",
        "telefone": "5514-6403"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI JARDIM SÃO MANOEL",
        "endereco": "RUA PEDRO ROLDAN, S/Nº - JARDIM SÃO MANOEL",
        "cep": "05871-340",
        "telefone": "5831-3844"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI JARDIM SOUZA",
        "endereco": "RUA FRANCISCO SOBREIRA DA SILVA, S/Nº - JARDIM SOUZA",
        "cep": "04917-120",
        "telefone": "5514-6407"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI JARDIM TRÊS ESTRELAS",
        "endereco": "RUA ROSALBA CARRIERA, 174 - JARDIM IMBE",
        "cep": "05863-250",
        "telefone": "5514-3315"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI JARDIM UMARIZAL",
        "endereco": "RUA ECAUNA, 139 - JARDIM UMARIZAL",
        "cep": "05754-040",
        "telefone": "5844-8884"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI JOSÉ OLIVEIRA ALMEIDA DINIZ, VEREADOR",
        "endereco": "RUA PAULINO VITAL DE MORAES, 180 - PARQUE MARIA HELENA",
        "cep": "05855-000",
        "telefone": "5816-3965"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI NATHÁLIA PEDROSO ROSEMBURG, DOUTORA",
        "endereco": "RUA AROLDO DE AZEVEDO, 50 - JARDIM BOM REFÚGIO",
        "cep": "05788-230",
        "telefone": "5841-4010"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI OLGA BENARIO PRESTES",
        "endereco": "RUA AROLDO DE AZEVEDO, 60 - JARDIM BOM REFÚGIO",
        "cep": "05788-230",
        "telefone": "5841-2434"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI PARQUE FERNANDA",
        "endereco": "RUA ANTONIO FORLENZA, 127 - PARQUE FERNANDA",
        "cep": "05888-010",
        "telefone": "5821-4351"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI PARQUE FIGUEIRA GRANDE",
        "endereco": "RUA PEDRO DA COSTA FALEIROS, 111 - PQ. FIGUEIRA GRANDE",
        "cep": "04915-020",
        "telefone": "5514-6599"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI PARQUE NOVA SANTO AMARO",
        "endereco": "RUA PADRE MARCELINO DUARTE, 249 - PQ. NOVA SANTO AMARO",
        "cep": "05874-120",
        "telefone": "5831-0382"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI PARQUE REGINA",
        "endereco": "RUA INÁCIO MANOEL TOURINHO, 101 - PARQUE REGINA",
        "cep": "05773-070",
        "telefone": "5816-3680"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI PARQUE SANTA MARGARIDA",
        "endereco": "RUA CAPÃO REDONDO, 80 - JARDIM SANTA MARGARIDA",
        "cep": "04931-100",
        "telefone": "5832-6446"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI PARQUE SANTO ANTONIO",
        "endereco": "RUA RINALDO DE HANDEL X FAUSTO GOUNOD - PQ. S. ANTONIO",
        "cep": "05821-070",
        "telefone": "5514-6453"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI PAULO COCHRANE SUPLICY",
        "endereco": "RUA ARROIO BUTIÁ, 383 - CAPÃO REDONDO - COHAB ADVENTISTA",
        "cep": "05868-880",
        "telefone": "5513-7203"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI PAULO E ADMAR",
        "endereco": "RUA REVERENDO PEIXOTO DA SILVA, 155 - JARDIM ROSANA",
        "cep": "05795-010",
        "telefone": "5841-7432"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI TANCREDO DE A. NEVES, PRESIDENTE",
        "endereco": "RUA JACQUES LE MERCIER, S/Nº - JARDIM MARIANE",
        "cep": "05866-050",
        "telefone": "5833-0002"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI VILA CALU",
        "endereco": "RUA HUMBERTO MARCAL, S/Nº - JARDIM ANGELA",
        "cep": "04061-240",
        "telefone": "5896-5340"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEI VILA PRAIA",
        "endereco": "RUA ANTONIA GARCIA MOYA, 179 - VILA PRAIA",
        "cep": "05749-250",
        "telefone": "5845-2113"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEU CAMPO LIMPO - CARDEAL DOM ANGELO AGNELO ROSSI",
        "endereco": "AV. CARLOS LACERDA, 678 - CAPÃO REDONDO",
        "cep": "05789-000",
        "telefone": "5843-4801"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEU CANTOS DO AMANHECER",
        "endereco": "AV. CANTOS DO AMANHECER, 51 - CAMPO LIMPO",
        "cep": "05856-020",
        "telefone": "3397-9720"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEU CAPÃO REDONDO PROFº E DR. CELSO SEIXAS RIBEIRO BASTOS",
        "endereco": "RUA DANIEL GRAN, 01 - CAPÃO REDONDO",
        "cep": "05867-380",
        "telefone": "5873-8067"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEU CASA BLANCA - PROFº SÓLON BORGES DOS REIS",
        "endereco": "RUA JOÃO DAMASCENO, 85 - JARDIM SÃO LUIZ",
        "cep": "05841-160",
        "telefone": "5519-5201"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEU CEI CAMPO LIMPO",
        "endereco": "AV. CARLOS LACERDA, 678 - CHÁCARA SÃO PEDRO",
        "cep": "05789-000",
        "telefone": "5843-4823"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEU CEI CANTOS DO AMANHECER",
        "endereco": "AV. CANTOS DO AMANHECER, 51 - CAMPO LIMPO",
        "cep": "05856-020",
        "telefone": "3397-9742"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEU CEI CAPÃO REDONDO",
        "endereco": "RUA DANIEL GRAN, 01 - CAPÃO REDONDO",
        "cep": "05867-380",
        "telefone": "5873-8079"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEU CEI CASA BLANCA",
        "endereco": "RUA JOÃO DAMASCENO, 85 - JARDIM SÃO LUIZ",
        "cep": "05841-160",
        "telefone": "5519-5246"
    },
    {
        "dre": "CAMPO LIMPO",
        "nome": "CEU CEI GUARAPIRANGA",
        "endereco": "ESTRADA DA BARONESA, 1.120 - JARDIM ÂNGELA",
        "cep": "04919-000",
        "telefone": "3397-9670"
    },
];

await inserirEscolas(escolas);
