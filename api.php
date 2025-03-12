<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "escolas"; // Altere para o nome do seu banco de dados

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar a conexão
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Altere o nome da tabela e da coluna de acordo com seu banco de dados
$sql = "SELECT nome, endereco, telefone FROM escolas";  // Ajuste 'escolas' para o nome correto da tabela
$result = $conn->query($sql);

$enderecos = array();

// Verifica se o resultado contém dados e os adiciona ao array
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $enderecos[] = $row;
    }
}

$conn->close();

// Retornar os dados em formato JSON
header('Content-Type: application/json');
echo json_encode($enderecos);
?>
