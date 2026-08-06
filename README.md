# Portal de Apostilas Digitais

Este repositório contém o **Portal de Apostilas Digitais** da ETEC, um conjunto de apostilas interativas para os componentes curriculares do curso técnico em Desenvolvimento de Sistemas. O portal é gerado com o gerador de sites estáticos **Eleventy (11ty)**, com foco em performance, facilidade de manutenção e uma experiência de leitura fluida para os alunos.

Este README é a **fonte única de documentação** do projeto (arquitetura, estrutura, convenções e design system).

## Tecnologias Utilizadas

- **Eleventy (11ty) v3**: Gerador de sites estáticos.
- **Nunjucks**: Motor de templates para reaproveitamento de código (layouts).
- **CSS Vanilla**: Estilização seguindo o design system "Brutalist Academic".
- **Mermaid.js**: Renderização de diagramas diretamente no navegador.
- **Highlight.js**: Realce de sintaxe para exemplos de código (SQL, MySQL, PostgreSQL, Java, PHP, etc.).
- **GitHub Actions**: Deploy automático do site no GitHub Pages.

## Estrutura do Projeto

```text
├── _site/                          # Site estático gerado (pronto para deploy)
├── src/                            # Arquivos fonte
│   ├── _data/                      # Dados globais (bimesters.json)
│   ├── _includes/                  # Layouts e componentes reutilizáveis
│   │   └── layouts/                # base, aula, dashboard, exercicio, questionario
│   ├── componentes/                # Conteúdo das apostilas (um diretório por componente)
│   ├── css/                        # Estilos globais (style.css)
│   ├── js/                         # Lógica do lado do cliente (main.js)
│   ├── imagens/                    # Favicon, infográficos e prints
│   └── index.njk                   # Portal principal (lista de componentes)
├── .eleventy.js                    # Configuração do compilador Eleventy
├── .github/workflows/deploy.yml    # Workflow de deploy no GitHub Pages
└── package.json                    # Dependências e scripts do projeto
```

### Componentes curriculares

Cada componente é uma apostila completa, localizada em `src/componentes/[slug-do-componente]/`. Atualmente existem 10 componentes:

| Slug | Componente |
| :--- | :--- |
| `analise-e-projeto-de-sistemas` | Análise e Projeto de Sistemas |
| `banco-de-dados-i` | Banco de Dados I |
| `banco-de-dados-ii` | Banco de Dados II |
| `desenvolvimento-de-sistemas` | Desenvolvimento de Sistemas |
| `planejamento-e-desenvolvimento-do-tcc` | Planejamento e Desenvolvimento do TCC |
| `programacao-e-algoritmos` | Programação e Algoritmos |
| `programacao-web-ii` | Programação Web II |
| `programacao-web-iii` | Programação Web III |
| `projetos-de-tecnologia-de-informacao-e-comunicacao` | Projetos de TI e Comunicação |
| `qualidade-e-teste-de-software` | Qualidade e Teste de Software |

## Como Executar o Projeto

### Pré-requisitos

- **Node.js** 18 ou superior
- **npm** (instalado junto com o Node.js)

### Instalação

```bash
npm install
```

### Desenvolvimento (Hot Reload)

```bash
npm start
```

O site estará disponível em `http://localhost:8080`.

### Build de Produção

```bash
npm run build
```

Os arquivos gerados estarão na pasta `_site/`.

> O projeto usa `pathPrefix: "/apostilas/"` (definido em `.eleventy.js`), ou seja, todos os links gerados já incluem esse prefixo.

## Deploy no GitHub Pages

O deploy é automático via **GitHub Actions** (`.github/workflows/deploy.yml`):

1. Suba o projeto para um repositório no GitHub.
2. Em **Settings** > **Pages**, em **Build and deployment** > **Source**, selecione **GitHub Actions**.
3. A cada `push` na branch `main`, o workflow instala as dependências, executa `npm run build` e publica o conteúdo de `_site/`.

## Organização e Convenções

### Numeração das aulas (contínua)

As aulas são numeradas de forma **contínua de 01 a 40** ao longo de todo o componente, tratando o curso como uma trilha única:

- **1º Bimestre**: Aulas 01–10
- **2º Bimestre**: Aulas 11–20
- **3º Bimestre**: Aulas 21–30
- **4º Bimestre**: Aulas 31–40

Essa convenção facilita a navegação sequencial, a paginação anterior/próxima e a referência cruzada entre conteúdos relacionados.

### Estrutura de pastas de um componente

```text
src/componentes/[slug-do-componente]/
├── [slug-do-componente].json   # Metadados do componente (aplicado a todas as páginas dele)
├── index.njk                   # Dashboard do componente
├── bimestre-01/
│   ├── aula-01/
│   │   ├── index.html          # Conteúdo da aula
│   │   ├── exercicio-01.html   # Exercício prático (layout: exercicio)
│   │   └── exercicio-02.html   # Questionário (layout: questionario)
│   └── ...
├── bimestre-02/
│   └── ...
└── ...
```

### Bimestres globais

Os bimestres são definidos globalmente em `src/_data/bimesters.json` (tag, rótulo e descrição). Os dashboards usam esse arquivo para renderizar as seções por bimestre:

```json
[
  { "tag": "bimestre-01", "label": "1º Bimestre", "description": "Implementação Física e Integridade" },
  { "tag": "bimestre-02", "label": "2º Bimestre", "description": "Performance e Extração de Dados" },
  { "tag": "bimestre-03", "label": "3º Bimestre", "description": "Programabilidade e Automação" },
  { "tag": "bimestre-04", "label": "4º Bimestre", "description": "NoSQL e Inteligência de Dados" }
]
```

## Padrões Canônicos por Tipo de Arquivo

> **Importante:** os metadados abaixo são o **padrão canônico** de cada tipo de arquivo. Como o projeto cresceu de forma incremental, alguns arquivos antigos ainda divergem. **Ao editar ou criar qualquer arquivo, siga o padrão correspondente ao tipo dele** — assim a base converge gradualmente para a documentação.

### 1. Arquivo de dados do componente (`[slug-do-componente].json`)

Este arquivo funciona como *directory data file* do Eleventy: os metadados dele são herdados por **todas** as páginas do componente (aulas e exercícios), então não precisam ser repetidos no front matter de cada arquivo.

```json
{
  "subject": "slug-do-componente",
  "subject_title": "Nome Completo do Componente",
  "subject_description": "Descrição longa exibida no portal e no dashboard.",
  "subject_status": "40 Aulas • 4 Bimestres",
  "layout": "aula",
  "tags": ["aula"],
  "nav_text": "⮜ VOLTAR",
  "bimester_titles": {
    "bimestre-01": "Título do 1º Bimestre",
    "bimestre-02": "Título do 2º Bimestre",
    "bimestre-03": "Título do 3º Bimestre",
    "bimestre-04": "Título do 4º Bimestre"
  }
}
```

| Campo | Obrigatório | Descrição |
| :--- | :--- | :--- |
| `subject` | Sim | Slug do componente. Usado nas URLs e na coleção `aulas`. |
| `subject_title` | Sim | Nome exibido no portal e nos dashboards. |
| `subject_description` | Sim | Descrição exibida no portal e no dashboard. |
| `subject_status` | Não | Texto de status exibido no card do portal. |
| `layout` | Sim | Layout herdado por todas as aulas do componente (`aula`). |
| `tags` | Sim | Inclui `aula` para indexar as páginas na coleção de aulas. |
| `nav_text` | Não | Texto de navegação (atualmente não renderizado pelos layouts). |
| `bimester_titles` | Sim | Título de cada bimestre usado no dashboard. |

### 2. Dashboard do componente (`index.njk`)

```njk
---
layout: dashboard
title: "Nome do Componente - Apostila Digital"
---
```

O layout `dashboard` usa os dados do `.json` do componente (`subject_title`, `subject_description`, `bimester_titles`) e a coleção `aulas` para listar as aulas de cada bimestre.

### 3. Aula (`aula-XX/index.html`)

#### Metadados (front matter)

```yaml
---
title: "Nome da Aula"
componente: "Nome do Componente"
aula_numero: "01"
description: "Breve descrição do conteúdo (exibida no card do dashboard)."
tags:
  - aula
  - bimestre-01
---
```

| Campo | Obrigatório | Descrição |
| :--- | :--- | :--- |
| `title` | Sim | Nome da aula. **Não** incluir o prefixo "Aula XX: " (ele é adicionado pelo layout). |
| `componente` | Sim | Nome do componente, usado no `<title>` da página (`{{ title }} \| {{ componente }}`). |
| `aula_numero` | Sim | Número com dois dígitos, entre aspas (ex: `"01"`). Usado no título, na paginação e no dashboard. |
| `description` | Sim | Descrição exibida no card do dashboard e no topo da aula. |
| `tags` | Sim | Sempre incluir `aula` e `bimestre-XX` (o bimestre em que a aula se encontra). |

#### Seções (corpo HTML)

A aula deve seguir esta sequência de seções para garantir a consistência pedagógica:

1. **Teoria & Conceitos** — explicação técnica e teórica:

```html
<section class="section-box">
  <h2>Teoria & Conceitos</h2>
  <p>Explicação do tema...</p>
</section>
```

1. **Exemplo de Código** — demonstração prática de sintaxe ou lógica:

```html
<section class="section-box">
  <h2>Exemplo de Código</h2>
  <div class="code-container">
    <pre><code class="language-sql">-- Código aqui</code></pre>
  </div>
</section>
```

1. **Representação Gráfica** — diagramas Mermaid para visualização:

```html
<section class="section-box">
  <h2>Representação Gráfica</h2>
  <div class="mermaid">
    graph TD
    A --> B
  </div>
</section>
```

1. **Dicas & Lembretes** — destaques e "pulos do gato":

```html
<div class="tip-box">
  <h4>Dicas & Lembretes</h4>
  <ul>
    <li>Dica importante 1</li>
  </ul>
</div>
```

1. **Como aplicar na Prática** — cenários de uso real:

```html
<section class="section-box">
  <h2>Como aplicar na Prática</h2>
  <ul>
    <li>Aplicação A...</li>
  </ul>
</section>
```

1. **Referências** — fontes de estudo e bibliografia:

```html
<section class="section-box">
  <h2>Referências</h2>
  <ul>
    <li>Link ou livro...</li>
  </ul>
</section>
```

1. **Para Praticar** — links para os exercícios da aula:

```html
<section class="section-box">
  <h2>Para Praticar</h2>
  <ul>
    <li><a href="exercicio-01.html">Exercício 1</a></li>
    <li><a href="exercicio-02.html">Exercício 2</a></li>
  </ul>
</section>
```

### 4. Exercício prático (`exercicio-01.html`, layout `exercicio`)

#### Metadados (front matter) - Exercício prático

```yaml
---
layout: exercicio
title: "Título do Exercício"
exercicio_numero: "01"
aula_numero: "01"
description: "Breve resumo da atividade"
---
```

#### Seções obrigatórias

| Seção | Descrição |
| :--- | :--- |
| **Enunciado** | Descrição clara do problema ou objetivo final da atividade. |
| **Preparação** | Requisitos técnicos, configuração de ambiente ou arquivos necessários. |
| **Código Base** | Snippets de referência ou código inicial que o aluno deve utilizar. |
| **O Desafio** | Lista de tarefas específicas (Tarefa A, B, C...) a serem realizadas. |
| **Orientações Finais** | Dicas de depuração, links úteis e orientações de entrega/teste. |

#### Exemplo de estrutura

```html
<section class="section-box">
  <h2>Enunciado</h2>
  <p>Descrição...</p>
</section>

<section class="section-box">
  <h2>Preparação</h2>
  <ul>
    <li>Configuração 1...</li>
  </ul>
</section>

<section class="section-box">
  <h2>1. Código Base: [Nome do Arquivo]</h2>
  <div class="code-container">
    <pre><code class="language-sql">...</code></pre>
  </div>
</section>

<section class="section-box">
  <h2>O Desafio (Atividades)</h2>
  <h4>Tarefa A: ...</h4>
  <ul>
    <li>Passo 1</li>
  </ul>
</section>

<div class="tip-box">
  <h4>Orientações Finais</h4>
  <ul>
    <li>Lembrete importante...</li>
  </ul>
</div>
```

### 5. Questionário (`exercicio-02.html`, layout `questionario`)

O questionário é renderizado pelo layout `questionario`, que já fornece o formulário interativo, a correção automática e o **código de autenticidade** (gerado a partir do nome do aluno, da sigla do componente e de um timestamp).

#### Metadados (front matter) - Questionário

```yaml
---
layout: questionario
title: "Título Relacionado à Aula"
exercicio_numero: "02"
aula_numero: "01"
subject: "slug-do-componente"
sigla_componente: "BDII"
description: "Breve resumo da atividade."
perguntas:
  - texto: "Enunciado da pergunta"
    resposta_correta: "b"
    alternativas:
      - letra: "a"
        texto: "Alternativa 1"
      - letra: "b"
        texto: "Alternativa 2"
      - letra: "c"
        texto: "Alternativa 3"
      - letra: "d"
        texto: "Alternativa 4"
---
```

| Campo | Obrigatório | Descrição |
| :--- | :--- | :--- |
| `layout` | Sim | `questionario`. |
| `title` | Sim | Título do questionário. |
| `exercicio_numero` | Sim | Número do exercício (em geral `"02"`). |
| `aula_numero` | Sim | Número da aula relacionada, usado no link "voltar". |
| `subject` | Sim | Slug do componente (herdado do `.json`, pode ser omitido no arquivo). |
| `sigla_componente` | Sim | Sigla usada no código de autenticidade (ex: `BDII`, `QTS`). Padrão: `XX`. |
| `description` | Não | Breve resumo da atividade. |
| `perguntas` | Sim | Lista de perguntas com `texto`, `resposta_correta` (letra) e `alternativas`. |

> **Regra do `resposta_correta`:** o valor deve ser a **letra** da alternativa correta (ex: `"b"`), não o texto.

## Coleções e Filtros (Eleventy)

Configurados em `.eleventy.js`:

- **Coleção `aulas`**: páginas com a tag `aula` e campo `aula_numero`, ordenadas por componente (`subject`) e número de aula.
- **Coleção `subjects`**: dashboards encontrados em `src/componentes/*/index.njk`, ordenados por `subject_title`.
- **Filtro `filterBySubjectBimester`**: retorna as aulas de um `subject` + tag de bimestre, ordenadas por `aula_numero` (usado pelos dashboards).

Layouts registrados (aliases): `base`, `aula`, `dashboard`, `exercicio` e `questionario`.

## Design System: Brutalist Academic

Este projeto segue um estilo visual específico apelidado de **"Brutalist Academic"**. É fundamental que qualquer alteração futura respeite estas diretrizes.

### Princípios básicos

- **Cores**: estritamente preto e branco. Use `#000000` para texto e bordas e `#FFFFFF` para fundos.
- **Tipografia**: use a fonte **Inter** para todo o corpo de texto e títulos. Títulos devem estar em **CAIXA ALTA (uppercase)**.
- **Bordas**: use bordas sólidas e grossas (geralmente `2px` ou `4px`). Títulos de seção (`h2`) possuem uma borda lateral de `8px`.
- **Minimalismo**: evite gradientes, sombras suaves, arredondamentos excessivos e cores vibrantes (como azul real ou verde).

### Componentes

- **Cards**: bordas pretas sólidas. No hover, o card deve inverter as cores (fundo preto, texto branco).
- **Badges**: retângulos pretos com texto branco em caixa alta.
- **Código**: fundo cinza muito claro (`var(--accent)`) com borda preta sólida. Use as classes `.code-container` e `.one-line-code`.
- **Inputs**: borda preta `2px solid`, sem arredondamento. No foco, sombra `4px 4px 0px` preta. Use a classe `.quiz-name-input` como referência.
- **Sinalização de erro**: use `#c00` (vermelho escuro) para bordas e texto de erro. Nunca use vermelho vibrante puro (`red`).

### Regras obrigatórias

**Nunca use atributo `style=""` inline.** Todo estilo deve ser declarado em `src/css/style.css` como uma classe semântica.

**ERRADO:**

```html
<p style="font-size: 0.85rem; color: #555;">Texto</p>
<div style="border-radius: 6px; background: #f4f4f4;">...</div>
```

**CORRETO:**

```html
<p class="quiz-auth-code-label">Texto</p>
<div class="quiz-auth-code-box">...</div>
```

**Nunca use emojis.** Emojis não fazem parte da estética do projeto. Substitua a sinalização por classes CSS adequadas.

**ERRADO:**

```html
<p>⚠️ Por favor, informe seu nome.</p>
<p>✅ Correto!</p>
```

**CORRETO:**

```html
<p class="quiz-name-error">Por favor, informe seu nome.</p>
```

**Nunca use cores fora do sistema.** As cores devem se limitar às variáveis CSS definidas em `:root` ou ao vermelho de erro (`#c00`).

**ERRADO:**

```css
border-left: 4px solid #3b82f6;  /* azul vibrante */
background: #f4f4f4;              /* cinza ad-hoc */
```

**CORRETO:**

```css
border-left: 8px solid var(--fg);
background: var(--accent);
```

### Por que seguir isto?

O objetivo é manter uma estética de "apostila impressa" ou "documento técnico", direta ao ponto e sem distrações visuais modernas desnecessárias.

## Manutenção e Padronização Progressiva

O projeto cresceu de forma incremental e parte do código ainda diverge da documentação acima (ex.: campos de front matter ausentes ou com nomes diferentes, numeração antiga, estilos inline). Para convergir sem quebrar o trabalho em andamento:

1. **Sempre** que editar um arquivo, aproveite para padronizá-lo de acordo com esta documentação (metadados canônicos do tipo de arquivo, seções obrigatórias e design system).
2. Ao criar um arquivo novo, siga o padrão canônico desde o início.
3. Alterações de padronização podem ser feitas aos poucos, em commits isolados, sem pressa de migrar tudo de uma vez.

## Licença

Este material foi desenvolvido para fins educacionais.
Copyright © 2026 - Professor Salomão.

DEPLOY