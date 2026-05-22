# Gommo — Landing Page Tecnica e Blueprint Arquitetural Enterprise

> Sistema SaaS de Departamento Pessoal para empresas privadas.
>
> Este documento e uma RFC arquitetural para orientar a implementacao futura do Gommo. Ele nao contem implementacao real, scaffold, endpoints, migrations, componentes React ou classes Java. O objetivo e estabelecer decisoes, convencoes, modelagem macro, limites de dominio e estrategia enterprise.

---

## Sumario

1. [Visao geral](#1-visao-geral)
2. [Objetivos arquiteturais](#2-objetivos-arquiteturais)
3. [Stack tecnologica](#3-stack-tecnologica)
4. [Principios arquiteturais](#4-principios-arquiteturais)
5. [Arquitetura frontend](#5-arquitetura-frontend)
6. [Estrutura frontend](#6-estrutura-frontend)
7. [Convencoes de nomenclatura](#7-convencoes-de-nomenclatura)
8. [Estrategias frontend](#8-estrategias-frontend)
9. [Bases genericas frontend](#9-bases-genericas-frontend)
10. [Arquitetura backend](#10-arquitetura-backend)
11. [Estrutura backend](#11-estrutura-backend)
12. [Bases genericas backend](#12-bases-genericas-backend)
13. [Entidades globais](#13-entidades-globais)
14. [Lombok](#14-lombok)
15. [Seguranca](#15-seguranca)
16. [Observabilidade](#16-observabilidade)
17. [Docker e infraestrutura](#17-docker-e-infraestrutura)
18. [Banco de dados](#18-banco-de-dados)
19. [Mapeamento de dominio](#19-mapeamento-de-dominio)
20. [Mapeamento inicial de entidades](#20-mapeamento-inicial-de-entidades)
21. [DDL inicial conceitual](#21-ddl-inicial-conceitual)
22. [Estrategia futura para microservices](#22-estrategia-futura-para-microservices)
23. [Roadmap de implementacao](#23-roadmap-de-implementacao)
24. [Riscos arquiteturais](#24-riscos-arquiteturais)
25. [Sugestoes enterprise-grade](#25-sugestoes-enterprise-grade)
26. [Pontos de atencao](#26-pontos-de-atencao)
27. [Melhorias futuras](#27-melhorias-futuras)

---

## 1. Visao geral

**Gommo** sera um sistema completo de Departamento Pessoal para empresas privadas, inicialmente construido como **monolito modularizado** e arquitetado para futura migracao para microservices sem refatoracao estrutural pesada.

O sistema deve suportar cadastros, admissao, funcionarios, contratos, beneficios, ferias, ponto, banco de horas, folha de pagamento, holerites, documentos, atestados, EPI, sindicatos, auditoria, notificacoes e relatorios.

### Diretriz principal

O Gommo nao deve nascer como um CRUD dividido por tecnologia. Ele deve nascer como um produto orientado por dominio:

```text
dominio claro
+ fronteiras modulares
+ seguranca corporativa
+ rastreabilidade
+ baixo custo operacional
+ evolucao gradual
```

### Modelo operacional inicial

- Deploy em VPS gratuita Oracle Cloud.
- Docker como padrao operacional.
- PostgreSQL como banco transacional.
- NGINX como reverse proxy.
- Observabilidade leve no inicio.
- Redis e RabbitMQ preparados arquiteturalmente, mas nao obrigatorios no primeiro deploy.

---

## 2. Objetivos arquiteturais

### Objetivos de produto

- Atender processos de Departamento Pessoal de empresas privadas.
- Padronizar dados de pessoas, funcionarios, contratos e folha.
- Garantir trilha de auditoria para operacoes sensiveis.
- Permitir evolucao para SaaS multiempresa.
- Reduzir ambiguidade para implementacao futura por humanos ou IA.

### Objetivos tecnicos

- Baixo consumo de memoria e CPU.
- Deploy simplificado.
- Alta manutencao.
- Baixo acoplamento entre modulos.
- Preparacao para microservices.
- Padrao consistente entre frontend, backend e banco.
- Forte separacao de responsabilidades.
- Seguranca desde a fundacao.

### Decisao macro

**Adotar Modular Monolith com DDD, Clean Architecture, SOLID e arquitetura event-driven ready.**

Justificativa:

- Microservices no inicio aumentariam custo operacional, deploy, observabilidade e consistencia distribuida.
- Um monolito modular disciplinado entrega simplicidade operacional sem sacrificar evolucao.
- A separacao por dominio permite extrair modulos futuramente para servicos independentes.

---

## 3. Stack tecnologica

### Frontend

| Tecnologia | Papel |
|---|---|
| NextJS | Framework React para App Router, SSR, rotas e composicao |
| App Router | Organizacao moderna de rotas, layouts e boundaries |
| TypeScript | Tipagem estatica e contratos mais seguros |
| TailwindCSS | Estilizacao utilitaria performatica e padronizavel |
| DaisyUI | Camada leve de componentes e temas sobre Tailwind |
| NextAuth | Sessao no frontend/BFF, integrando com backend |
| NextThemes | Tema claro/escuro |
| React Hook Form | Formularios performaticos |
| Zod | Validacao e inferencia de tipos |
| Axios | Cliente HTTP padronizado |
| Zustand | Estado local de UI e fluxos client-side |
| TanStack Query | Cache, sincronizacao e mutations para dados remotos |

### Backend

| Tecnologia | Papel |
|---|---|
| Java 21 | Plataforma robusta, moderna e LTS |
| Spring Boot | Base enterprise para APIs e configuracao |
| Spring Security | Autenticacao, autorizacao e protecoes |
| Spring Data JPA | Persistencia relacional |
| PostgreSQL | Banco transacional principal |
| Flyway | Versionamento de schema |
| Docker | Empacotamento e deploy |
| JWT | Access tokens stateless |
| Spring Audit | Auditoria tecnica automatica |
| Redis | Opcional futuro para cache, rate limit e tokens |
| RabbitMQ | Opcional futuro para eventos assicronos |

### Infraestrutura

| Tecnologia | Papel |
|---|---|
| Oracle Cloud VPS | Hospedagem inicial de baixo custo |
| NGINX | TLS, reverse proxy, compressao e headers |
| Docker Compose futuro | Orquestracao local/simples |
| PostgreSQL containerizado | Banco inicial com volume persistente |

---

## 4. Principios arquiteturais

### Aplicar

- SOLID.
- DDD.
- Clean Architecture.
- Repository Pattern.
- Strategy Pattern.
- Factory Pattern.
- Separation of Concerns.
- Feature-first architecture.
- Modular Monolith.
- Event-driven ready architecture.

### Evitar

- God Classes.
- Services gigantes.
- DTOs sem proposito.
- Entidades anemicas.
- Dependencias circulares.
- Diretórios genericos sem ownership.
- Repositorios acessados por outros modulos.
- Componentes frontend com regras de negocio complexas.
- Estado global duplicando cache de API.

### Regra de ouro

Frontend e backend devem usar os **mesmos nomes de modulos**. Isso garante rastreabilidade, onboarding mais rapido e futura extracao por bounded context.

---

## 5. Arquitetura frontend

### Decisao

Adotar arquitetura **feature-first por modulo de dominio**, com um modulo global chamado `root`.

Estrutura macro desejada:

```text
src/
  app/
  modules/
    root/
    auth/
    company/
    user/
    person/
    employee/
    department/
    job-position/
    admission/
    termination/
    payroll/
    payroll-event/
    payslip/
    benefits/
    vacation/
    timekeeping/
    time-bank/
    dependent/
    medical-certificate/
    epi/
    document/
    contract/
    union/
    notification/
    audit/
    report/
    setting/
```

### Papel do `root`

O modulo `root` concentra recursos compartilhados globalmente:

- design system interno;
- providers globais;
- tema;
- HTTP client base;
- response/error patterns;
- guards;
- helpers transversais;
- tipos genericos;
- constantes globais;
- error boundaries globais;
- componentes base;
- feature flags;
- logging frontend.

### Regra de dependencia frontend

Um modulo pode depender de:

- `root`;
- seus proprios arquivos internos;
- contratos publicos explicitamente exportados por outro modulo.

Permitido:

```text
payroll -> root
payroll -> employee/public
vacation -> employee/public
```

Nao permitido:

```text
payroll -> employee/components/internal-form
vacation -> payroll/services/private-service
benefits -> employee/stores/internal-store
```

---

## 6. Estrutura frontend

Cada modulo de dominio deve seguir estrutura equivalente:

```text
modules/
  employee/
    components/
    services/
    hooks/
    dto/
    types/
    interfaces/
    schemas/
    strategies/
    stores/
    utils/
    constants/
    templates/
    pages/
    validators/
    public/
```

### Responsabilidades por pasta

| Pasta | Responsabilidade | Regra principal |
|---|---|---|
| `components` | Componentes visuais do modulo | Sem regra de negocio complexa |
| `services` | Integracao com API/BFF | Nao conter regra visual |
| `hooks` | Orquestracao de queries, mutations, forms e estados | Encapsular complexidade de UI |
| `dto` | Contratos de entrada/saida da API | Separar request e response |
| `types` | Tipos internos de tela e dominio frontend | Nao representar API externa quando houver DTO |
| `interfaces` | Contratos estaveis e strategies | Usar para abstracoes reais |
| `schemas` | Schemas Zod | Validar formularios e payloads |
| `strategies` | Strategy Pattern no frontend | Selecionar comportamento por contexto |
| `stores` | Zustand para estado local compartilhado | Nao duplicar TanStack Query |
| `utils` | Funcoes puras locais | Evitar pasta generica sem criterio |
| `constants` | Constantes locais | Query keys, labels e limites |
| `templates` | Composicoes grandes de tela | Montar secoes e layouts de modulo |
| `pages` | Composicao reutilizada pelas rotas do App Router | Manter `src/app` fino |
| `validators` | Validacoes especificas alem de Zod | Regras cross-field ou de negocio |
| `public` | Contratos exportaveis para outros modulos | Unico ponto de acoplamento externo |

### App Router

O `src/app` deve ser fino e focado em:

- rotas;
- layouts;
- loading states;
- error boundaries;
- route handlers BFF quando necessario;
- composicao inicial de paginas.

Regra:

```text
app = roteamento e composicao
modules = dominio e comportamento
```

---

## 7. Convencoes de nomenclatura

### Frontend

| Item | Padrao | Exemplo |
|---|---|---|
| Arquivos | kebab-case | `employee-form.tsx` |
| Componentes | PascalCase | `EmployeeForm` |
| Hooks | camelCase com prefixo `use` | `useEmployeeList` |
| DTOs | PascalCase com sufixo | `CreateEmployeeRequestDto` |
| Interfaces | PascalCase sem prefixo `I` | `EmployeeStatusStrategy` |
| Types | PascalCase | `EmployeeStatusView` |
| Enums | PascalCase | `EmployeeStatus` |
| Valores de enum | UPPER_CASE | `ACTIVE` |
| Stores | camelCase com `Store` | `useEmployeeFilterStore` |
| Constants | UPPER_CASE | `EMPLOYEE_QUERY_KEYS` |
| Strategies | PascalCase com `Strategy` | `EmployeeStatusStrategy` |
| Funcoes | camelCase | `formatEmployeeName` |
| Variaveis | camelCase | `employeeId` |
| Rotas web | kebab-case plural | `/employees` |
| Rotas API | kebab-case plural versionada | `/api/v1/employees` |

### Backend

| Item | Padrao | Exemplo |
|---|---|---|
| Pacotes | lowercase sem underscore | `employee` |
| Classes | PascalCase | `EmployeeUseCase` |
| Interfaces | PascalCase sem `I` | `EmployeeFacade` |
| DTOs | PascalCase com sufixo | `EmployeeResponseDto` |
| Records | PascalCase com sufixo claro | `CreateEmployeeCommand` |
| Enums | PascalCase | `EmployeeStatus` |
| Valores de enum | UPPER_CASE | `ACTIVE` |
| Metodos | camelCase | `calculatePayroll` |
| Variaveis | camelCase | `employeeId` |
| Constantes | UPPER_CASE | `DEFAULT_PAGE_SIZE` |
| Tabelas | snake_case plural | `employees` |
| Colunas | snake_case | `created_at` |
| Constraints | snake_case nomeada | `uk_employees_company_registration` |

---

## 8. Estrategias frontend

### TailwindCSS + DaisyUI

**Decisao:** usar TailwindCSS + DaisyUI como base visual oficial.

#### Justificativa

Tailwind entrega controle fino, baixo overhead e excelente compatibilidade com componentes proprios. DaisyUI acelera a criacao de interfaces com uma camada leve de componentes e temas, sem impor um design system pesado como Material UI, Ant Design, Chakra, Mantine ou PrimeReact.

#### Vantagens

- Boa produtividade.
- Baixo custo de runtime.
- Customizacao elevada.
- Facil criacao de identidade visual propria.
- Temas claros/escuros com baixo esforco.
- Boa compatibilidade com App Router.
- Menor dependencia de componentes fechados.

#### Desvantagens

- Exige disciplina visual.
- Pode gerar excesso de classes no markup.
- DaisyUI nao cobre todos os componentes enterprise complexos.
- Sem design system interno, a UI pode ficar inconsistente.

#### Performance

Impacto positivo quando:

- Tailwind content scanning estiver correto;
- classes dinamicas forem controladas;
- client components forem reduzidos;
- telas internas usarem lazy loading quando fizer sentido.

Riscos:

- excesso de client-side JavaScript;
- componentes visuais duplicados;
- estado global causando re-render;
- ausencia de tokens centralizados.

### Autenticacao

Usar NextAuth como camada de sessao/BFF, delegando credenciais ao backend.

Responsabilidades do frontend:

- manter sessao segura;
- esconder menus sem permissao;
- proteger UX de rotas;
- gerenciar refresh via fluxo seguro;
- nunca armazenar JWT sensivel em `localStorage`.

Responsabilidades do backend:

- autenticar;
- autorizar;
- emitir tokens;
- revogar refresh tokens;
- auditar operacoes;
- aplicar RBAC real.

### Guards e RBAC

Frontend pode bloquear visualmente, mas nunca decidir autorizacao final.

Padrao:

- route guard para paginas privadas;
- permission guard para acoes;
- feature flag guard para funcionalidades;
- backend como fonte final de autorizacao.

### Feature flags

Usar desde o inicio como conceito, mesmo que a primeira implementacao seja simples.

Tipos:

- flags globais;
- flags por empresa;
- flags por role;
- flags experimentais.

### HTTP interceptors

Interceptadores devem:

- anexar correlation ID;
- aplicar headers padrao;
- mapear erros;
- lidar com expiracao de sessao;
- padronizar timeouts;
- evitar logging de dados sensiveis.

### Cache

Usar TanStack Query para dados remotos:

- query keys padronizadas;
- stale time por modulo;
- retry controlado;
- invalidacao apos mutation;
- paginacao e filtros.

Usar Zustand apenas para:

- estado de UI;
- filtros temporarios;
- drawers/modais;
- wizard de formulario;
- preferencias locais nao sensiveis.

### Loading states e error boundaries

Padroes obrigatorios:

- loading global para autenticacao inicial;
- loading por pagina;
- skeletons para listas e formularios;
- error boundary global;
- error boundary por modulo;
- tela de fallback com traceId quando aplicavel.

### Dark mode

Usar NextThemes + DaisyUI themes.

Regras:

- tema claro como default;
- tema escuro suportado desde o inicio;
- tokens centralizados;
- evitar cores hardcoded fora do design system.

### Internacionalizacao futura

Preparar arquitetura para i18n:

- labels centralizados;
- mensagens de erro por chave;
- formato de data/moeda desacoplado;
- pt-BR como idioma inicial.

### Monitoramento frontend

Preparar para:

- captura de erros;
- metricas de Web Vitals;
- correlation ID com backend;
- logs sem dados sensiveis;
- futura integracao com Sentry, OpenTelemetry ou equivalente.

### Acessibilidade

Obrigatorio:

- navegacao por teclado;
- contraste adequado;
- labels em formularios;
- aria quando necessario;
- foco visivel;
- mensagens de erro associadas aos campos.

---

## 9. Bases genericas frontend

### BaseService

Responsavel por:

- configurar Axios;
- base URL;
- headers padrao;
- timeout;
- response envelope;
- correlation ID;
- tratamento global de erro.

Limites:

- nao deve conter regra de dominio;
- nao deve conhecer UI;
- nao deve decidir autorizacao.

### BaseCrudService

Responsavel por CRUD padrao:

- listar;
- buscar por id;
- criar;
- atualizar;
- ativar/inativar quando aplicavel.

Limite:

- usar apenas em cadastros simples;
- fluxos ricos exigem services especializados.

### BaseQuery

Padroniza TanStack Query:

- query key;
- stale time;
- retry;
- enabled;
- tratamento de erro;
- integracao com feedback quando necessario.

### BaseMutation

Padroniza mutations:

- invalidacao de cache;
- callbacks de sucesso;
- callbacks de erro;
- optimistic update apenas em casos seguros.

### Response pattern

Envelope esperado:

```text
data
meta
errors
traceId
timestamp
```

### Error pattern

Campos:

- codigo tecnico;
- mensagem amigavel;
- campo afetado;
- traceId;
- categoria;
- severidade.

Categorias:

- `VALIDATION_ERROR`
- `AUTHENTICATION_ERROR`
- `AUTHORIZATION_ERROR`
- `BUSINESS_RULE_ERROR`
- `RESOURCE_NOT_FOUND`
- `CONFLICT`
- `RATE_LIMIT`
- `INTERNAL_ERROR`

### Heranca vs composicao

Preferir composicao.

Heranca fica restrita a bases previsiveis como `BaseCrudService`. Fluxos de dominio devem compor clientes HTTP, validators, strategies e mappers.

---

## 10. Arquitetura backend

### Decisao

Adotar modular monolith com modulos alinhados ao frontend:

```text
modules/
  root/
  auth/
  company/
  user/
  person/
  employee/
  department/
  jobposition/
  admission/
  termination/
  payroll/
  payrollevent/
  payslip/
  benefits/
  vacation/
  timekeeping/
  timebank/
  dependent/
  medicalcertificate/
  epi/
  document/
  contract/
  union/
  notification/
  audit/
  report/
  setting/
```

### Regra central

Um modulo nao deve acessar diretamente repositories, entities ou detalhes internos de outro modulo.

Comunicacao permitida:

- facade publica;
- eventos de dominio;
- contratos de aplicacao;
- read models controlados;
- integracoes assicronas futuras.

### Fluxo padrao

```text
Controller
  -> UseCase
    -> Validator
    -> Domain Service / Strategy
    -> Repository
    -> Mapper
    -> Event Producer
  -> Response
```

Regras:

- Controller nunca chama repository.
- Controller nao contem regra de negocio.
- Repository nao conhece DTO HTTP.
- Entity nao conhece controller.
- UseCase orquestra.
- Service nao vira orquestrador universal.
- Facade protege fronteiras entre modulos.

---

## 11. Estrutura backend

Cada modulo deve seguir estrutura equivalente:

```text
module/
  employee/
    controller/
    service/
    repository/
    usecase/
    entity/
    dto/
    mapper/
    strategy/
    validator/
    specification/
    facade/
    configuration/
    event/
    consumer/
    producer/
```

### Responsabilidades

| Pasta | Responsabilidade | Regra principal |
|---|---|---|
| `controller` | Adapter HTTP | Sem regra de negocio |
| `usecase` | Orquestracao de casos de uso | Representa intencao de negocio |
| `service` | Regra reutilizavel ou servico de dominio | Nao virar God Service |
| `repository` | Persistencia | Nao expor para outros modulos |
| `entity` | Entidades e agregados | Conter invariantes quando aplicavel |
| `dto` | Contratos de entrada/saida | Nao expor entidade diretamente |
| `mapper` | Conversoes | Preferir mapeamento explicito |
| `strategy` | Variacoes de regra | Contratos claros |
| `validator` | Validacoes de negocio | Regras compostas e cross-field |
| `specification` | Filtros e queries dinamicas | Ordenacao por whitelist |
| `facade` | API publica interna do modulo | Unico caminho para outros modulos |
| `configuration` | Beans e configs locais | Escopo do modulo |
| `event` | Eventos de dominio/aplicacao | Contrato estavel |
| `producer` | Publicacao de eventos | Interno agora, RabbitMQ futuro |
| `consumer` | Consumo de eventos | Listener interno agora, consumer futuro |

---

## 12. Bases genericas backend

### BaseController

Responsavel por:

- response envelope;
- padronizacao de retorno;
- paginacao;
- traceId;
- headers comuns.

Limite:

- nao implementar regra de dominio;
- nao forcar todos os controllers a serem CRUD.

### BaseService

Responsavel por:

- comportamentos auxiliares simples;
- validacao de existencia;
- validacao de status;
- operacoes transversais pequenas.

Limite:

- nao concentrar logica de varios modulos.

### BaseRepository

Base para persistencia:

- UUID;
- paginacao;
- busca por status;
- soft delete quando aplicavel.

### BaseUseCase

Contrato para execucao:

- input;
- output;
- validacao;
- autorizacao;
- execucao transacional.

### BaseMapper

Contrato de mapeamento:

- request para command;
- entity para response;
- entity para summary;
- nunca expor entity diretamente na API.

### BaseSpecification

Base para filtros:

- company/tenant;
- status;
- soft delete;
- datas;
- ordenacao segura.

---

## 13. Entidades globais

### BaseEntity

Campos:

| Campo | Tipo | Regra |
|---|---|---|
| `id` | UUID | Chave primaria |
| `status` | Enum controlado | Estado operacional |

### AuditEntity

Extende `BaseEntity`.

Campos:

| Campo | Tipo | Regra |
|---|---|---|
| `created_by` | UUID/string | Usuario criador |
| `created_at` | timestamptz | Criacao |
| `updated_by` | UUID/string | Ultima alteracao |
| `updated_at` | timestamptz | Atualizacao |

### Campos recomendados

| Campo | Tipo | Regra |
|---|---|---|
| `version` | bigint | Optimistic locking |
| `deleted_at` | timestamptz nullable | Soft delete |
| `deleted_by` | UUID/string nullable | Usuario que removeu |

### Auditoria automatica

Usar Spring Audit para:

- preencher criacao;
- preencher atualizacao;
- associar usuario autenticado;
- registrar company/tenant futuramente.

### Versionamento otimista

Obrigatorio para entidades criticas:

- `employee`;
- `employment_contract`;
- `payroll_period`;
- `payroll_run`;
- `vacation_request`;
- `employee_benefit`;
- `document`.

### Soft delete

Usar para cadastros administrativos e documentos. Nao usar para eventos financeiros fechados. Para folha fechada, usar cancelamento ou reversao auditavel.

---

## 14. Lombok

### Recomendacao definitiva

**Nao usar Lombok como padrao arquitetural do Gommo.**

### Politica recomendada

- Entidades: Java explicito.
- Services: Java explicito.
- Use cases: Java explicito.
- Strategies: Java explicito.
- DTOs imutaveis: preferir `record` do Java 21.
- DTOs mutaveis: classes explicitas quando necessario.

### Justificativa

Departamento Pessoal envolve dados sensiveis, regras trabalhistas, folha, auditoria e historicos. Nesse contexto, clareza e rastreabilidade sao mais importantes que reducao de boilerplate.

Sem Lombok:

- debug fica mais previsivel;
- comportamento de `equals` e `hashCode` fica explicito;
- upgrades de Java e Spring ficam menos dependentes de annotation processing;
- entidades ricas ficam mais legiveis;
- onboarding em ambientes enterprise tende a ser mais conservador.

Lombok nao gera custo relevante de runtime, mas aumenta magia de compilacao. Com Java 21 e records, o ganho de produtividade nao compensa o custo de previsibilidade no dominio principal.

---

## 15. Seguranca

### Autenticacao JWT

Modelo:

- backend autentica credenciais;
- backend emite access token curto;
- backend emite refresh token rotativo;
- frontend usa NextAuth como sessao/BFF;
- refresh token fica protegido;
- access token tem expiracao curta.

### Access token

Claims recomendadas:

- `sub`;
- `companyId` futuro;
- `roles`;
- `permissions` resumidas ou versao de permissao;
- `jti`;
- `iat`;
- `exp`.

### Refresh token

Regras:

- rotacao obrigatoria;
- persistencia hashada;
- revogacao por sessao;
- deteccao de reutilizacao;
- associacao com dispositivo/IP aproximado;
- expiracao maior que access token.

### RBAC

Modelo:

- User;
- Role;
- Permission;
- UserRole;
- RolePermission.

Exemplos de permissoes:

```text
employee.read
employee.create
employee.update
employee.terminate
payroll.calculate
payroll.approve
payroll.close
vacation.approve
document.read_sensitive
audit.read
```

### Multiempresa futura

Preparar desde o inicio:

- `company_id` em entidades de negocio;
- filtros obrigatorios por empresa;
- claims de empresa no token;
- unique constraints compostas por empresa;
- auditoria por empresa.

### Protecoes

| Ameaca | Medidas |
|---|---|
| CSRF | SameSite, CSRF token em operacoes mutaveis quando necessario, origins restritas |
| XSS | CSP, cookies httpOnly, sanitizacao, evitar HTML bruto |
| SQL Injection | JPA parametrizado, specifications seguras, whitelist de ordenacao |
| Brute force | Rate limiting, lock progressivo, alerta |
| Replay attacks | JTI, token curto, refresh rotation, TLS, revogacao |

### Password policy

Minimo:

- 12 caracteres;
- letras maiusculas e minusculas;
- numeros;
- simbolos;
- bloqueio de senhas comuns;
- historico de senhas;
- MFA preparado para futuro.

### Secrets management

Inicial:

- variaveis de ambiente;
- `.env` fora do Git;
- permissoes restritas;
- rotacao manual documentada.

Futuro:

- Vault;
- SOPS;
- cloud secret manager;
- rotacao automatizada.

### Headers de seguranca

Via NGINX/backend:

- `Content-Security-Policy`;
- `X-Frame-Options`;
- `X-Content-Type-Options`;
- `Referrer-Policy`;
- `Strict-Transport-Security`;
- `Permissions-Policy`.

---

## 16. Observabilidade

### Objetivos

- Rastrear requests.
- Correlacionar frontend/backend.
- Auditar acoes criticas.
- Medir saude da aplicacao.
- Detectar erros.
- Apoiar investigacao em folha, funcionarios e documentos.

### Logs estruturados

Formato JSON recomendado.

Campos minimos:

- timestamp;
- level;
- service;
- module;
- traceId;
- userId;
- companyId;
- requestId;
- action;
- entityId;
- message;
- errorCode.

### Tracing

Preparar para OpenTelemetry.

Propagar:

- `X-Request-ID`;
- `traceparent`;
- correlation ID.

### Metricas

Expor via Spring Actuator:

- health;
- readiness;
- liveness;
- JVM memory;
- DB pool;
- HTTP latency;
- error rate;
- requests por endpoint;
- filas futuras.

### Auditoria de negocio

Auditar:

- login;
- alteracao de senha;
- criacao/alteracao de funcionario;
- alteracoes salariais;
- fechamento de folha;
- aprovacao de ferias;
- upload/download de documentos;
- exclusoes;
- alteracoes de permissoes.

### Stack recomendada para VPS gratuita Oracle

#### Inicial

- Docker logs.
- Spring Actuator.
- Logs JSON.
- Rotacao de logs.
- Health checks.
- Uptime externo simples.
- Backup PostgreSQL.

Justificativa:

- menor consumo de RAM;
- menor operacao;
- compativel com VPS gratuita.

#### Segunda etapa

- Prometheus.
- Grafana.
- Loki ou Promtail.

#### Futuro

- OpenTelemetry Collector.
- Zipkin ou Tempo.
- Alertmanager.
- Dashboards por modulo.

#### Evitar no inicio

ELK completo, por ser pesado para VPS gratuita.

---

## 17. Docker e infraestrutura

### Estrategia inicial

Containers separados:

- frontend NextJS;
- backend Spring Boot;
- PostgreSQL;
- NGINX;
- Redis futuro opcional;
- RabbitMQ futuro opcional.

### Redes Docker

- rede publica: NGINX;
- rede interna: frontend/backend/database;
- PostgreSQL sem exposicao publica.

### NGINX

Responsavel por:

- TLS;
- reverse proxy;
- compressao;
- headers de seguranca;
- rate limiting basico;
- proxy para frontend;
- proxy para backend quando exposto.

### PostgreSQL

Regras:

- volume persistente;
- backup automatizado;
- usuario limitado;
- senha via env;
- porta nao exposta publicamente;
- health check;
- tuning leve.

### JVM tuning

Para VPS pequena:

- heap limitado;
- container awareness;
- `MaxRAMPercentage` controlado;
- pool Hikari pequeno;
- logs moderados;
- graceful shutdown.

### NextJS

Otimizar com:

- build standalone;
- reducao de client components;
- compressao;
- cache de assets;
- lazy loading de telas grandes.

### Startup order

Ordem logica:

1. PostgreSQL saudavel.
2. Backend executa migrations.
3. Backend fica ready.
4. Frontend sobe.
5. NGINX roteia trafego.

### Preparacao para Kubernetes

Desde o inicio:

- health checks;
- readiness/liveness;
- configuracao por env;
- containers stateless;
- logs em stdout;
- secrets externos;
- graceful shutdown.

---

## 18. Banco de dados

### Padroes

| Item | Padrao |
|---|---|
| Tabelas | snake_case plural |
| Colunas | snake_case |
| PK | `id uuid` |
| FK | `{entidade}_id` |
| Timestamps | `timestamptz` |
| Status | varchar controlado |
| Dinheiro | numeric com escala definida |
| Datas civis | date |
| Data/hora | timestamptz |
| Constraints | nomeadas |
| Indices | nomeados |

### UUID

Usar UUID como identificador publico e interno.

Preferencia:

- UUIDv7 gerado pela aplicacao.

Alternativa inicial:

- UUIDv4 mantendo contrato UUID.

### Flyway

Regras:

- toda mudanca de banco via migration;
- migrations pequenas;
- nunca editar migration aplicada;
- separar DDL estrutural de seed;
- revisar indices e constraints.

### Indices

Criar indices para:

- FKs;
- `company_id`;
- status;
- datas de competencia;
- documentos unicos;
- campos de busca frequente;
- combinacoes de negocio.

### Normalizacao

Manter modelo relacional normalizado. Usar JSONB apenas para:

- snapshots;
- auditoria;
- outbox;
- integracoes;
- metadados flexiveis.

---

## 19. Mapeamento de dominio

### `company`

Responsabilidade:

- representar empresas clientes;
- preparar multiempresa;
- controlar dados fiscais e unidades.

Entidades:

- Company;
- CompanyUnit;
- CompanySetting.

Regras:

- CNPJ unico;
- isolamento por empresa;
- status operacional.

Dependencias:

- audit;
- setting.

### `auth`

Responsabilidade:

- autenticacao;
- tokens;
- sessoes;
- politicas de senha.

Entidades:

- AuthSession;
- RefreshToken;
- PasswordResetToken.

Regras:

- refresh token rotativo;
- revogacao;
- bloqueio por tentativa.

Dependencias:

- user;
- audit;
- notification futura.

### `user`

Responsabilidade:

- usuarios do sistema;
- roles;
- permissions.

Entidades:

- User;
- Role;
- Permission;
- UserRole;
- RolePermission.

Regras:

- permissao sempre validada no backend;
- e-mail unico conforme politica;
- auditoria em alteracoes de acesso.

Dependencias:

- company;
- auth;
- audit.

### `person`

Responsabilidade:

- cadastro base de pessoa fisica;
- documentos pessoais;
- contatos e enderecos.

Entidades:

- Person;
- PersonAddress;
- PersonContact;
- PersonDocument.

Regras:

- CPF unico por empresa;
- dados sensiveis protegidos;
- validacao de documentos.

Dependencias:

- company;
- document;
- audit.

### `employee`

Responsabilidade:

- vinculo empregaticio;
- historicos funcionais e salariais.

Entidades:

- Employee;
- EmployeeStatusHistory;
- EmployeeSalaryHistory.

Regras:

- funcionario deriva de pessoa;
- matricula unica por empresa;
- historico salarial imutavel;
- status controlado.

Dependencias:

- person;
- department;
- job-position;
- company.

### `department`

Responsabilidade:

- estrutura organizacional.

Entidades:

- Department.

Regras:

- pode ter hierarquia;
- nome/codigo unico por empresa;
- nao excluir departamento com funcionarios ativos.

Dependencias:

- company.

### `job-position`

Responsabilidade:

- cargos e funcoes.

Entidades:

- JobPosition;
- JobPositionSalaryRange.

Regras:

- cargo pertence a empresa;
- pode conter CBO;
- pode ter faixa salarial.

Dependencias:

- company;
- union opcional.

### `admission`

Responsabilidade:

- processo de admissao.

Entidades:

- AdmissionProcess;
- AdmissionChecklist;
- AdmissionDocument.

Regras:

- checklist obrigatorio;
- validacoes antes de ativar funcionario;
- gera Employee ao concluir.

Dependencias:

- person;
- employee;
- document;
- contract.

### `termination`

Responsabilidade:

- processo de desligamento.

Entidades:

- TerminationProcess;
- TerminationReason;
- TerminationSettlement.

Regras:

- desligamento gera eventos rescisorios;
- funcionario desligado nao recebe folha comum futura;
- auditoria forte obrigatoria.

Dependencias:

- employee;
- payroll;
- document.

### `payroll`

Responsabilidade:

- processamento de folha.

Entidades:

- PayrollPeriod;
- PayrollRun;
- PayrollItem;
- PayrollCalculationSnapshot.

Regras:

- competencia unica por empresa;
- fechamento bloqueia alteracoes;
- recalculo gera nova versao;
- calculos devem ser auditaveis.

Dependencias:

- employee;
- payroll-event;
- benefits;
- vacation;
- timekeeping;
- union.

### `payroll-event`

Responsabilidade:

- rubricas e eventos da folha.

Entidades:

- PayrollEvent;
- PayrollEventRule;
- PayrollEventType.

Regras:

- evento pode ser provento, desconto, informativo ou base;
- incidencias versionadas;
- regras auditaveis.

Dependencias:

- payroll;
- union.

### `payslip`

Responsabilidade:

- holerite.

Entidades:

- Payslip;
- PayslipLine.

Regras:

- gerado de folha fechada;
- imutavel apos emissao;
- reemissao versionada.

Dependencias:

- payroll;
- employee;
- document.

### `benefits`

Responsabilidade:

- beneficios corporativos.

Entidades:

- Benefit;
- BenefitPlan;
- EmployeeBenefit.

Regras:

- elegibilidade por cargo/departamento;
- coparticipacao;
- vigencia por periodo;
- reflexo em folha.

Dependencias:

- employee;
- payroll.

### `vacation`

Responsabilidade:

- ferias.

Entidades:

- VacationPeriod;
- VacationRequest;
- VacationSchedule.

Regras:

- periodo aquisitivo;
- periodo concessivo;
- aprovacao obrigatoria;
- conflito com afastamentos;
- reflexo na folha.

Dependencias:

- employee;
- payroll;
- timekeeping.

### `timekeeping`

Responsabilidade:

- controle de ponto.

Entidades:

- TimeEntry;
- WorkSchedule;
- TimekeepingAdjustment.

Regras:

- batidas por funcionario;
- ajustes auditaveis;
- divergencias exigem justificativa;
- integracao futura com relogio de ponto.

Dependencias:

- employee;
- time-bank.

### `time-bank`

Responsabilidade:

- banco de horas.

Entidades:

- TimeBankBalance;
- TimeBankTransaction.

Regras:

- saldo acumulado;
- expiracao configuravel;
- compensacoes auditaveis;
- integracao com folha.

Dependencias:

- timekeeping;
- employee;
- payroll.

### `dependent`

Responsabilidade:

- dependentes de funcionario.

Entidades:

- Dependent.

Regras:

- elegibilidade para IR, beneficios e salario familia;
- vigencia;
- validacao documental.

Dependencias:

- employee;
- benefits;
- payroll.

### `medical-certificate`

Responsabilidade:

- atestados e afastamentos.

Entidades:

- MedicalCertificate;
- LeavePeriod.

Regras:

- CID e dado sensivel;
- impacto em ponto e folha;
- anexos protegidos.

Dependencias:

- employee;
- document;
- timekeeping;
- payroll.

### `epi`

Responsabilidade:

- Equipamentos de Protecao Individual.

Entidades:

- EpiItem;
- EpiDelivery;
- EpiReturn.

Regras:

- entrega com aceite;
- validade;
- devolucao;
- historico por funcionario.

Dependencias:

- employee;
- document.

### `document`

Responsabilidade:

- documentos anexados e gerados.

Entidades:

- Document;
- DocumentType;
- DocumentVersion.

Regras:

- controle de acesso;
- versionamento;
- classificacao sensivel;
- storage externo futuro.

Dependencias:

- person;
- employee;
- contract;
- audit.

### `contract`

Responsabilidade:

- contratos de trabalho.

Entidades:

- EmploymentContract;
- ContractAmendment.

Regras:

- contrato vinculado ao funcionario;
- alteracoes por aditivo;
- historico imutavel.

Dependencias:

- employee;
- document;
- union.

### `union`

Responsabilidade:

- sindicatos e convencoes coletivas.

Entidades:

- Union;
- CollectiveAgreement.

Regras:

- vigencia;
- regras salariais;
- beneficios;
- incidencia por empresa/cargo.

Dependencias:

- company;
- payroll;
- job-position.

### `notification`

Responsabilidade:

- notificacoes internas.

Entidades:

- Notification;
- NotificationPreference.

Regras:

- eventos criticos geram notificacoes;
- leitura por usuario;
- canais futuros.

Dependencias:

- user;
- audit.

### `audit`

Responsabilidade:

- trilha de auditoria de negocio.

Entidades:

- AuditLog;
- AuditEvent.

Regras:

- imutabilidade logica;
- rastreabilidade por usuario;
- rastreabilidade por empresa;
- payload controlado.

Dependencias:

- todos os modulos.

### `report`

Responsabilidade:

- relatorios administrativos.

Entidades:

- ReportDefinition;
- ReportExecution.

Regras:

- exportacoes auditadas;
- filtros por permissao;
- execucao assincrona futura.

Dependencias:

- payroll;
- employee;
- benefits;
- vacation;
- audit.

### `setting`

Responsabilidade:

- configuracoes globais e por empresa.

Entidades:

- Setting;
- CompanySetting.

Regras:

- chaves controladas;
- alteracoes auditadas;
- valores versionaveis quando criticos.

Dependencias:

- company;
- audit.

---

## 20. Mapeamento inicial de entidades

Entidades principais:

- Company.
- CompanyUnit.
- CompanySetting.
- User.
- Role.
- Permission.
- AuthSession.
- RefreshToken.
- Person.
- PersonAddress.
- PersonContact.
- PersonDocument.
- Department.
- JobPosition.
- JobPositionSalaryRange.
- Employee.
- EmployeeStatusHistory.
- EmployeeSalaryHistory.
- AdmissionProcess.
- AdmissionChecklist.
- TerminationProcess.
- TerminationSettlement.
- EmploymentContract.
- ContractAmendment.
- Dependent.
- Benefit.
- BenefitPlan.
- EmployeeBenefit.
- VacationPeriod.
- VacationRequest.
- WorkSchedule.
- TimeEntry.
- TimekeepingAdjustment.
- TimeBankBalance.
- TimeBankTransaction.
- PayrollPeriod.
- PayrollEvent.
- PayrollEventRule.
- PayrollRun.
- PayrollItem.
- PayrollCalculationSnapshot.
- Payslip.
- PayslipLine.
- MedicalCertificate.
- LeavePeriod.
- EpiItem.
- EpiDelivery.
- Document.
- DocumentType.
- DocumentVersion.
- Union.
- CollectiveAgreement.
- Notification.
- AuditLog.
- ReportDefinition.
- ReportExecution.

---

## 21. DDL inicial conceitual

> Esta secao nao e migration real. E uma modelagem arquitetural inicial para orientar futuras migrations Flyway.

### Enums conceituais

Status globais:

- `ACTIVE`;
- `INACTIVE`;
- `PENDING`;
- `BLOCKED`;
- `ARCHIVED`;
- `DELETED`.

Status de funcionario:

- `ADMISSION_IN_PROGRESS`;
- `ACTIVE`;
- `ON_LEAVE`;
- `VACATION`;
- `TERMINATED`.

Status de folha:

- `OPEN`;
- `CALCULATING`;
- `CALCULATED`;
- `APPROVED`;
- `CLOSED`;
- `CANCELLED`.

Status de ferias:

- `REQUESTED`;
- `APPROVED`;
- `REJECTED`;
- `SCHEDULED`;
- `IN_PROGRESS`;
- `COMPLETED`;
- `CANCELLED`.

Tipo de evento de folha:

- `EARNING`;
- `DEDUCTION`;
- `INFORMATIONAL`;
- `BASE`.

### Tabelas globais

#### `companies`

Campos:

- `id uuid primary key`;
- `status`;
- `legal_name`;
- `trade_name`;
- `document_number`;
- auditoria;
- `version`;
- `deleted_at`.

Constraints:

- CNPJ unico.
- status obrigatorio.

Indices:

- `document_number`;
- `status`.

#### `users`

Campos:

- `id`;
- `company_id`;
- `status`;
- `name`;
- `email`;
- `password_hash`;
- `last_login_at`;
- auditoria;
- `version`.

Constraints:

- e-mail unico por empresa.
- FK para `companies`.

Indices:

- `company_id`;
- `email`;
- `status`.

#### `roles`

Campos:

- `id`;
- `company_id`;
- `status`;
- `name`;
- `description`;
- auditoria.

Constraints:

- nome unico por empresa.

#### `permissions`

Campos:

- `id`;
- `status`;
- `code`;
- `description`.

Constraints:

- codigo unico.

#### `user_roles`

Campos:

- `user_id`;
- `role_id`.

Constraints:

- PK composta.
- FK para `users`.
- FK para `roles`.

#### `role_permissions`

Campos:

- `role_id`;
- `permission_id`.

Constraints:

- PK composta.
- FK para `roles`.
- FK para `permissions`.

### Pessoas e funcionarios

#### `persons`

Campos:

- `id`;
- `company_id`;
- `status`;
- `full_name`;
- `cpf`;
- `birth_date`;
- `gender`;
- `marital_status`;
- auditoria;
- `version`.

Constraints:

- CPF unico por empresa.
- FK para `companies`.

Indices:

- `company_id`;
- `cpf`;
- `full_name`.

#### `person_addresses`

Campos:

- `id`;
- `person_id`;
- `status`;
- `street`;
- `number`;
- `complement`;
- `district`;
- `city`;
- `state`;
- `zip_code`;
- `country`;
- auditoria.

Constraints:

- FK para `persons`.

#### `person_contacts`

Campos:

- `id`;
- `person_id`;
- `type`;
- `value`;
- `is_primary`;
- auditoria.

Constraints:

- FK para `persons`.

#### `departments`

Campos:

- `id`;
- `company_id`;
- `parent_department_id`;
- `status`;
- `name`;
- `code`;
- auditoria.

Constraints:

- nome/codigo unico por empresa.
- FK parent opcional.

#### `job_positions`

Campos:

- `id`;
- `company_id`;
- `status`;
- `name`;
- `cbo_code`;
- `description`;
- auditoria.

Constraints:

- nome unico por empresa.

#### `employees`

Campos:

- `id`;
- `company_id`;
- `person_id`;
- `department_id`;
- `job_position_id`;
- `status`;
- `registration_number`;
- `admission_date`;
- `termination_date`;
- `employment_type`;
- `current_salary`;
- auditoria;
- `version`.

Constraints:

- matricula unica por empresa.
- FK para `persons`.
- FK para `departments`.
- FK para `job_positions`.
- FK para `companies`.

Indices:

- `company_id`;
- `person_id`;
- `department_id`;
- `job_position_id`;
- `status`;
- `registration_number`.

#### `employee_salary_histories`

Campos:

- `id`;
- `employee_id`;
- `salary`;
- `effective_from`;
- `effective_to`;
- `reason`;
- auditoria.

Constraints:

- FK para `employees`.
- nao sobrepor vigencias por funcionario.

### Contratos, documentos e dependentes

#### `employment_contracts`

Campos:

- `id`;
- `employee_id`;
- `status`;
- `contract_type`;
- `start_date`;
- `end_date`;
- `working_hours_weekly`;
- auditoria;
- `version`.

Constraints:

- FK para `employees`.

#### `dependents`

Campos:

- `id`;
- `employee_id`;
- `status`;
- `full_name`;
- `cpf`;
- `birth_date`;
- `relationship`;
- `income_tax_dependent`;
- `benefit_dependent`;
- auditoria.

Constraints:

- FK para `employees`.

#### `documents`

Campos:

- `id`;
- `company_id`;
- `person_id`;
- `employee_id`;
- `status`;
- `document_type`;
- `file_name`;
- `storage_key`;
- `mime_type`;
- `sensitive`;
- auditoria;
- `version`.

Constraints:

- FK para `companies`.
- FK opcional para `persons`.
- FK opcional para `employees`.

Indices:

- `company_id`;
- `employee_id`;
- `document_type`.

### Beneficios

#### `benefits`

Campos:

- `id`;
- `company_id`;
- `status`;
- `name`;
- `type`;
- `description`;
- auditoria.

Constraints:

- nome unico por empresa.

#### `benefit_plans`

Campos:

- `id`;
- `benefit_id`;
- `status`;
- `name`;
- `employee_cost`;
- `company_cost`;
- auditoria.

Constraints:

- FK para `benefits`.

#### `employee_benefits`

Campos:

- `id`;
- `employee_id`;
- `benefit_plan_id`;
- `status`;
- `start_date`;
- `end_date`;
- auditoria;
- `version`.

Constraints:

- FK para `employees`.
- FK para `benefit_plans`.
- evitar duplicidade ativa para mesmo beneficio.

### Ferias

#### `vacation_periods`

Campos:

- `id`;
- `employee_id`;
- `status`;
- `acquisition_start_date`;
- `acquisition_end_date`;
- `concession_deadline`;
- `days_acquired`;
- `days_used`;
- auditoria.

Constraints:

- FK para `employees`.
- periodo unico por funcionario.

#### `vacation_requests`

Campos:

- `id`;
- `vacation_period_id`;
- `employee_id`;
- `status`;
- `start_date`;
- `end_date`;
- `days_requested`;
- `approved_by`;
- `approved_at`;
- auditoria;
- `version`.

Constraints:

- FK para `vacation_periods`.
- FK para `employees`.
- datas coerentes.

### Ponto e banco de horas

#### `work_schedules`

Campos:

- `id`;
- `company_id`;
- `status`;
- `name`;
- `weekly_hours`;
- auditoria.

Constraints:

- nome unico por empresa.

#### `time_entries`

Campos:

- `id`;
- `employee_id`;
- `status`;
- `entry_timestamp`;
- `entry_type`;
- `source`;
- `adjusted`;
- auditoria.

Constraints:

- FK para `employees`.

Indices:

- `employee_id`;
- `entry_timestamp`.

#### `time_bank_balances`

Campos:

- `id`;
- `employee_id`;
- `status`;
- `balance_minutes`;
- `reference_date`;
- auditoria;
- `version`.

Constraints:

- FK para `employees`.
- saldo unico por funcionario/data referencia.

#### `time_bank_transactions`

Campos:

- `id`;
- `employee_id`;
- `type`;
- `minutes`;
- `reason`;
- `transaction_date`;
- auditoria.

Constraints:

- FK para `employees`.

### Folha

#### `payroll_periods`

Campos:

- `id`;
- `company_id`;
- `status`;
- `reference_month`;
- `reference_year`;
- `start_date`;
- `end_date`;
- auditoria;
- `version`.

Constraints:

- competencia unica por empresa.

Indices:

- `company_id`;
- `reference_year`;
- `reference_month`;
- `status`.

#### `payroll_events`

Campos:

- `id`;
- `company_id`;
- `status`;
- `code`;
- `name`;
- `type`;
- `taxable`;
- `inss_base`;
- `fgts_base`;
- `irrf_base`;
- auditoria;
- `version`.

Constraints:

- codigo unico por empresa.

#### `payroll_runs`

Campos:

- `id`;
- `payroll_period_id`;
- `company_id`;
- `status`;
- `calculated_at`;
- `approved_by`;
- `approved_at`;
- `closed_at`;
- auditoria;
- `version`.

Constraints:

- FK para `payroll_periods`.
- FK para `companies`.

#### `payroll_items`

Campos:

- `id`;
- `payroll_run_id`;
- `employee_id`;
- `payroll_event_id`;
- `amount`;
- `quantity`;
- `reference`;
- auditoria.

Constraints:

- FK para `payroll_runs`.
- FK para `employees`.
- FK para `payroll_events`.

Indices:

- `payroll_run_id`;
- `employee_id`;
- `payroll_event_id`.

#### `payslips`

Campos:

- `id`;
- `payroll_run_id`;
- `employee_id`;
- `status`;
- `gross_amount`;
- `deduction_amount`;
- `net_amount`;
- `issued_at`;
- auditoria;
- `version`.

Constraints:

- FK para `payroll_runs`.
- FK para `employees`.
- unico por `payroll_run_id` e `employee_id`.

#### `payslip_lines`

Campos:

- `id`;
- `payslip_id`;
- `payroll_event_id`;
- `description`;
- `amount`;
- `quantity`.

Constraints:

- FK para `payslips`.
- FK para `payroll_events`.

### Atestados e EPI

#### `medical_certificates`

Campos:

- `id`;
- `employee_id`;
- `status`;
- `start_date`;
- `end_date`;
- `days`;
- `cid_code`;
- `doctor_name`;
- `document_id`;
- auditoria;
- `version`.

Constraints:

- FK para `employees`.
- FK opcional para `documents`.

#### `epi_items`

Campos:

- `id`;
- `company_id`;
- `status`;
- `name`;
- `ca_number`;
- `validity_months`;
- auditoria.

Constraints:

- CA controlado quando aplicavel.

#### `epi_deliveries`

Campos:

- `id`;
- `employee_id`;
- `epi_item_id`;
- `delivery_date`;
- `return_date`;
- `status`;
- `document_id`;
- auditoria.

Constraints:

- FK para `employees`.
- FK para `epi_items`.
- FK opcional para `documents`.

### Auditoria e notificacoes

#### `audit_logs`

Campos:

- `id`;
- `company_id`;
- `user_id`;
- `module`;
- `action`;
- `entity_name`;
- `entity_id`;
- `before_payload`;
- `after_payload`;
- `ip_address`;
- `user_agent`;
- `created_at`.

Indices:

- `company_id`;
- `user_id`;
- `module`;
- `entity_name`;
- `entity_id`;
- `created_at`.

#### `notifications`

Campos:

- `id`;
- `company_id`;
- `user_id`;
- `status`;
- `title`;
- `message`;
- `type`;
- `read_at`;
- `created_at`.

Constraints:

- FK para `companies`.
- FK para `users`.

---

## 22. Estrategia futura para microservices

### Candidatos naturais de extracao

- `auth` / `user`;
- `employee`;
- `payroll`;
- `timekeeping`;
- `document`;
- `notification`;
- `report`.

### Regras desde o monolito

- Nao acessar repository de outro modulo.
- Nao compartilhar entidades internas.
- Usar facades.
- Usar eventos.
- Separar DTO publico de entity.
- Evitar joins complexos entre dominios distantes.
- Documentar contratos.

### Event-driven ready

Inicialmente:

- eventos internos de dominio;
- listeners transacionais;
- auditoria;
- notificacoes.

Futuro:

- RabbitMQ;
- outbox pattern;
- consumers idempotentes;
- correlation ID;
- retry e dead-letter.

### Outbox futura

Tabela conceitual:

- `outbox_events`;
- `id`;
- `aggregate_type`;
- `aggregate_id`;
- `event_type`;
- `payload`;
- `status`;
- `created_at`;
- `published_at`;
- `retry_count`.

### Redis

Nao obrigatorio no primeiro deploy.

Usar futuramente para:

- rate limiting distribuido;
- revogacao de tokens;
- cache de permissoes;
- cache de configuracoes;
- locks distribuidos.

### RabbitMQ

Nao obrigatorio no primeiro deploy.

Usar futuramente para:

- eventos entre modulos extraidos;
- processamento assicrono;
- notificacoes;
- relatorios;
- integracoes externas.

---

## 23. Roadmap de implementacao

### Fase 1 — Fundacao

- Estrutura modular frontend/backend.
- Modulo `root`.
- Autenticacao.
- RBAC.
- Base entities.
- Auditoria.
- Flyway.
- Docker base.
- NGINX.
- PostgreSQL.
- Health checks.

### Fase 2 — Cadastros centrais

- company;
- user;
- person;
- department;
- job-position;
- employee;
- document basico.

### Fase 3 — Ciclo trabalhista

- admission;
- contract;
- dependent;
- benefits;
- vacation;
- medical-certificate;
- epi.

### Fase 4 — Ponto e banco de horas

- work schedule;
- time entries;
- adjustments;
- time bank;
- regras de compensacao.

### Fase 5 — Folha

- payroll events;
- payroll period;
- payroll calculation;
- payslip;
- approval;
- closing;
- audit trail forte.

### Fase 6 — Operacao enterprise

- relatorios;
- notificacoes;
- dashboards;
- observabilidade ampliada;
- backups automatizados;
- politicas avancadas de seguranca.

### Fase 7 — Preparacao microservices

- outbox;
- RabbitMQ;
- read models;
- separacao de schemas;
- contratos assincronos;
- extracao gradual.

---

## 24. Riscos arquiteturais

| Risco | Impacto | Mitigacao |
|---|---|---|
| Monolito acoplado | Extracao futura dificil | Boundaries, facades e eventos |
| Services gigantes | Baixa manutencao | Use cases pequenos, strategies e validators |
| Folha complexa | Erros financeiros | Snapshots, versionamento de regras e auditoria |
| VPS insuficiente | Instabilidade | Stack enxuta e tuning |
| Seguranca fragil | Risco corporativo | RBAC, JWT seguro, auditoria e headers |
| Multiempresa tardio | Refatoracao pesada | `company_id` desde o inicio |
| Observabilidade excessiva | Custo operacional | Evolucao gradual |
| Dados sensiveis em logs | Violacao LGPD | Mascaramento e politicas de logging |

---

## 25. Sugestoes enterprise-grade

- Criar design system interno sobre DaisyUI.
- Tratar folha como dominio critico, nao CRUD simples.
- Versionar regras trabalhistas e de folha.
- Usar snapshots para calculos financeiros.
- Separar auditoria tecnica de auditoria de negocio.
- Implementar permissionamento granular desde o inicio.
- Preparar outbox antes de RabbitMQ.
- Manter DTOs explicitos.
- Usar records Java para DTOs imutaveis.
- Evitar Lombok no dominio principal.
- Nao armazenar tokens em `localStorage`.
- Padronizar traceId em toda request.
- Implementar backup antes de producao real.
- Criar documentacao por modulo.

---

## 26. Pontos de atencao

- LGPD para dados pessoais e sensiveis.
- Controle de acesso a documentos.
- Protecao de dados medicos.
- Logs nao devem conter CPF, salario ou CID sem mascaramento.
- Folha fechada deve ser imutavel ou reversivel, nunca editada silenciosamente.
- Alteracoes salariais exigem historico.
- Permissoes administrativas precisam de auditoria forte.
- Documentos devem ter storage seguro.
- Relatorios devem respeitar RBAC.
- Exportacoes devem ser auditadas.
- Integracoes futuras devem ser idempotentes.

---

## 27. Melhorias futuras

- MFA.
- SSO corporativo.
- Integracao com eSocial.
- Integracao bancaria.
- Assinatura digital.
- Storage S3-compatible.
- OCR de documentos.
- Redis para cache e rate limit.
- RabbitMQ para eventos assicronos.
- OpenTelemetry completo.
- Grafana Tempo.
- Feature flags por empresa.
- Workflow engine para admissoes e aprovacoes.
- Motor de regras para folha.
- App mobile.
- White-label.
- Multi-tenant avancado.
- Kubernetes.
- Blue/green deployment.

---

## Diretriz final

O Gommo deve nascer como um **monolito modular disciplinado**, preparado para crescer com seguranca, baixo custo operacional e clareza de dominio.

Toda implementacao futura deve respeitar:

- mesmos nomes de modulos no frontend e backend;
- DTOs explicitos;
- boundaries fortes;
- auditoria;
- multiempresa-ready;
- event-driven ready;
- infraestrutura simples no inicio;
- evolucao gradual para microservices.
