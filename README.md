# Logcomex Frontend Teste

Teste para vaga de frotend na empresa [Logcomex](https://www.logcomex.com/).

## É recomendado o uso do Docker para rodar o projeto com mais fácilidade. Caso você não tenha instalado, poderá seguir as instruções no site oficial clicando [aqui](https://docs.docker.com/engine/install/).


### Setup com Docker Compose (versão mais atual)

```bash
docker compose up
# ou em background
docker compose up -d
```

### Setup com Docker Compose (versões antigas)

```bash
docker-compose up
# ou em background
docker-compose up -d
```

### Setup com Docker puro

```bash
# compilando a imagem
docker build -t logcomex-frontend .

# rodando o container
docker run logcomex-frontend

# rodando o container em background
docker run -d logcomex-frontend
```

### Para rodar o projeto sem o Docker você deve ter instalado em sua máquina:
- Node.js v18.0.0 ou mais novo
- NPM ou Yarn em suas respectivas versões

### E seguir os comandos abaixo:
```bash
# [UTILIZANDO NPM ]

# instalando as dependências
npm install

# iniciando o projeto
npm run dev

--------------------------------------

# [UTILIZANDO YARN ]

# instalando as dependências
yarn install

# iniciando o projeto
yarn dev

```

#### Para acessar a aplicação basta digitar o endereço [http://localhost:3000](http://localhost:3000) em seu navegador.

---

### OBS: Os comandos de setup são focados em rodar o projeto em modo de desenvolvimento e não contém instruções para build de produção.


