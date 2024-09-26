# urlshortener_api
URL Shortener Service
Este projeto é um serviço de encurtamento de URLs construído com Node.js, Express, e MySQL. Ele permite criar URLs curtas, redirecionar para URLs originais, atualizar URLs existentes, excluir URLs, e visualizar estatísticas sobre quantas vezes uma URL curta foi acessada.

Funcionalidades
Criar uma URL encurtada: Encurta URLs longas gerando um código único.
Redirecionar URLs curtas: Redireciona usuários para a URL original quando a URL curta é acessada.
Atualizar URLs: Permite atualizar a URL original associada ao código encurtado.
Excluir URLs: Remove uma URL encurtada do banco de dados.
Estatísticas de URL: Retorna a contagem de quantas vezes a URL encurtada foi acessada.
Stack Tecnológica
Backend: Node.js, Express.js
Banco de Dados: MySQL
Bibliotecas: nanoid (para geração de códigos curtos), body-parser (para parsing de requisições JSON)
Pré-requisitos
Antes de rodar este projeto localmente, você precisará ter instalado:

Node.js (versão 12.x ou superior)
MySQL (versão 5.x ou superior)

Configuração do Banco de Dados
Você precisa criar uma base de dados MySQL e configurar a tabela para armazenar as URLs. Use o seguinte script SQL:
CREATE DATABASE IF NOT EXISTS url_shortener;
<code>
USE url_shortener;

CREATE TABLE IF NOT EXISTS urls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    original_url TEXT NOT NULL,
    short_code VARCHAR(10) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    access_count INT DEFAULT 0
);

<code/>
