<?php
// Configurações de conexão com o MySQL
$host = "127.0.0.1";  // Ou o IP do seu servidor MySQL
$username = "root";   // Seu nome de usuário do MySQL
$password = "123456"; // Sua senha do MySQL
$database = "escolas";  // O nome do seu banco de dados

// Conectar ao banco de dados
$conn = new mysqli($host, $username, $password, $database);

// Verificar se houve erro na conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// O ID que você quer buscar
$id = 1;  // Exemplo: estamos buscando a linha com ID = 1

// Consulta SQL usando prepared statement
$stmt = $conn->prepare("SELECT * FROM tabela_nome WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

// Verificar se existe algum resultado
if ($result->num_rows > 0) {
    // Se encontrar uma linha, mostre os dados
    while ($row = $result->fetch_assoc()) {
        echo "ID: " . $row["id"] . "<br>";
        echo "Nome: " . $row["nome"] . "<br>"; // Substitua "nome" pelo nome da coluna que você deseja exibir
        // Exiba outras colunas se necessário
    }
} else {
    echo "Nenhum resultado encontrado.";
}

// Fechar a conexão com o banco de dados
$stmt->close();
$conn->close();
?>
