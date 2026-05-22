import type {Metadata} from "next";

type ExecutionPhase = {
    title: string;
    objective: string;
    deliverables: string[];
    modules: string[];
};

type ArchitectureCard = {
    title: string;
    description: string;
    items: string[];
};

type DomainModule = {
    name: string;
    responsibility: string;
    dependencies: string;
};

const executionPhases: ExecutionPhase[] = [
    {
        title: "Fase 1 - Fundacao enterprise",
        objective: "Estabelecer a base arquitetural, seguranca, auditoria e infraestrutura minima para evolucao segura.",
        deliverables: [
            "Modular monolith com boundaries por dominio",
            "Modulo root/global no frontend e backend",
            "Autenticacao JWT com refresh token rotativo",
            "RBAC granular e auditoria automatica",
            "PostgreSQL com Flyway e entidades base",
            "Docker, NGINX e health checks",
        ],
        modules: ["root", "auth", "user", "company", "audit", "setting"],
    },
    {
        title: "Fase 2 - Cadastros centrais",
        objective: "Criar a base de dados humanos e organizacionais que sustentara todos os fluxos de DP.",
        deliverables: [
            "Cadastro de empresas e unidades",
            "Pessoas, contatos, enderecos e documentos pessoais",
            "Departamentos, cargos e faixas salariais",
            "Funcionario com matricula, status e historico salarial",
            "Contratos e documentos administrativos",
        ],
        modules: ["company", "person", "employee", "department", "job-position", "contract", "document"],
    },
    {
        title: "Fase 3 - Ciclo trabalhista",
        objective: "Modelar processos de admissao, beneficios, dependentes, ferias, atestados e EPI.",
        deliverables: [
            "Processo de admissao com checklist",
            "Dependentes e elegibilidades",
            "Beneficios, planos e vigencias",
            "Periodos aquisitivos e solicitacoes de ferias",
            "Atestados, afastamentos e dados sensiveis",
            "Entrega, devolucao e validade de EPI",
        ],
        modules: ["admission", "dependent", "benefits", "vacation", "medical-certificate", "epi"],
    },
    {
        title: "Fase 4 - Ponto e banco de horas",
        objective: "Preparar controle de jornada, ajustes auditaveis e reflexos futuros em folha.",
        deliverables: [
            "Escalas e jornadas",
            "Registros de ponto",
            "Ajustes com justificativa e auditoria",
            "Saldo de banco de horas",
            "Transacoes de credito, debito e compensacao",
        ],
        modules: ["timekeeping", "time-bank", "employee", "payroll"],
    },
    {
        title: "Fase 5 - Folha de pagamento",
        objective: "Implementar o dominio mais critico com estrategias de calculo, snapshots e fechamento auditavel.",
        deliverables: [
            "Eventos e rubricas versionadas",
            "Competencias e execucoes de folha",
            "Strategies para calculos por tipo de evento",
            "Snapshots de calculo",
            "Aprovacao, fechamento e bloqueio de alteracoes",
            "Holerites emitidos com trilha historica",
        ],
        modules: ["payroll", "payroll-event", "payslip", "employee", "benefits", "vacation", "union"],
    },
    {
        title: "Fase 6 - Operacao e escala",
        objective: "Ampliar observabilidade, relatorios, notificacoes, backups e preparacao para microservices.",
        deliverables: [
            "Relatorios por permissao",
            "Notificacoes internas",
            "Prometheus, Grafana e Loki em etapa posterior",
            "Outbox pattern e RabbitMQ futuro",
            "Redis futuro para rate limit e revogacao",
            "Contratos preparados para extracao de servicos",
        ],
        modules: ["report", "notification", "audit", "root", "all modules"],
    },
];

const architectureCards: ArchitectureCard[] = [
    {
        title: "Frontend",
        description: "NextJS com App Router, TypeScript, TailwindCSS, DaisyUI, NextAuth, Zod, React Hook Form, Zustand e TanStack Query.",
        items: [
            "Arquitetura feature-first por modulo de dominio",
            "Modulo root para providers, tema, HTTP, erros e design system",
            "App Router fino: rotas, layouts, loading e error boundaries",
            "DTOs, schemas Zod e services separados por modulo",
        ],
    },
    {
        title: "Backend",
        description: "Java 21, Spring Boot, Spring Security, Spring Data JPA, PostgreSQL, Flyway, JWT e Spring Audit.",
        items: [
            "Modular monolith com os mesmos modulos do frontend",
            "Use cases orquestram regras; controllers nao acessam repositories",
            "Facades e eventos protegem fronteiras entre modulos",
            "Strategy Pattern para folha, beneficios, ferias e regras sindicais",
        ],
    },
    {
        title: "Banco de dados",
        description: "PostgreSQL normalizado, UUID, timestamptz, constraints nomeadas, indices estrategicos e Flyway.",
        items: [
            "company_id desde o inicio para multiempresa futura",
            "Auditoria, versionamento otimista e soft delete seletivo",
            "Snapshots para calculos financeiros",
            "JSONB apenas para auditoria, eventos e metadados flexiveis",
        ],
    },
    {
        title: "Infraestrutura",
        description: "Docker, NGINX, PostgreSQL containerizado e deploy otimizado para VPS gratuita Oracle Cloud.",
        items: [
            "Stack inicial enxuta para baixo consumo de RAM",
            "NGINX com TLS, headers, compressao e rate limit basico",
            "JVM tuning, pool Hikari pequeno e logs em stdout",
            "Redis e RabbitMQ preparados, mas opcionais no inicio",
        ],
    },
];

const domainModules: DomainModule[] = [
    {name: "person", responsibility: "Pessoa fisica, contatos, enderecos e documentos pessoais.", dependencies: "company, document, audit"},
    {name: "employee", responsibility: "Vinculo empregaticio, matricula, status e historicos.", dependencies: "person, department, job-position"},
    {name: "payroll", responsibility: "Competencias, execucoes, itens, snapshots, aprovacao e fechamento.", dependencies: "employee, payroll-event, benefits, vacation"},
    {name: "vacation", responsibility: "Periodos aquisitivos, solicitacoes, aprovacoes e reflexos em folha.", dependencies: "employee, payroll, timekeeping"},
    {name: "timekeeping", responsibility: "Jornadas, registros de ponto e ajustes auditaveis.", dependencies: "employee, time-bank"},
    {name: "document", responsibility: "Documentos anexados, gerados, versionados e classificados por sensibilidade.", dependencies: "person, employee, contract, audit"},
    {name: "audit", responsibility: "Trilha imutavel de operacoes criticas e rastreabilidade corporativa.", dependencies: "todos os modulos"},
    {name: "notification", responsibility: "Notificacoes internas e canais futuros.", dependencies: "user, audit"},
];

const securityItems = [
    "Access token curto e refresh token rotativo",
    "Cookies httpOnly, secure e SameSite para sessoes sensiveis",
    "RBAC granular validado obrigatoriamente no backend",
    "company_id e claims preparados para multiempresa",
    "Rate limiting, protecao contra brute force e replay attacks",
    "Headers de seguranca via NGINX e backend",
    "Logs sem CPF, salario, CID ou tokens em texto claro",
    "Auditoria para login, permissoes, salario, documentos, ferias e folha",
];

const namingRules = [
    "Arquivos frontend em kebab-case",
    "Componentes, DTOs, enums e strategies em PascalCase",
    "Hooks com prefixo use e camelCase",
    "Constantes em UPPER_CASE",
    "Rotas web em kebab-case plural",
    "APIs versionadas em /api/v1",
    "Tabelas e colunas em snake_case",
    "Constraints e indices sempre nomeados",
];

const riskItems = [
    "Monolito acoplado: mitigar com boundaries, facades e eventos",
    "Services gigantes: mitigar com use cases, validators e strategies",
    "Folha complexa: mitigar com snapshots, versionamento e auditoria",
    "VPS limitada: mitigar com stack enxuta e JVM tuning",
    "Multiempresa tardio: mitigar com company_id desde o inicio",
    "Dados sensiveis em logs: mitigar com mascaramento e politicas de logging",
];

export const metadata: Metadata = {
    title: "Gommo | Plano de Execucao Enterprise",
    description: "Landing page tecnica com o plano de execucao arquitetural do sistema Gommo.",
};

export default function GommoExecutionPlanPage() {
    return (
        <main className="min-h-screen bg-base-100 text-base-content">
            <section className="bg-gradient-to-br from-primary via-secondary to-accent text-primary-content">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-16 lg:px-10 xl:px-0">
                    <div className="badge badge-neutral badge-lg">Blueprint enterprise</div>
                    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                        <div className="space-y-6">
                            <p className="text-sm font-semibold uppercase tracking-[0.35em] opacity-80">
                                Gommo - Departamento Pessoal SaaS
                            </p>
                            <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
                                Plano de execucao arquitetural para um ERP de DP escalavel.
                            </h1>
                            <p className="max-w-3xl text-lg leading-8 opacity-90">
                                Landing page tecnica para guiar a implementacao futura do Gommo: modular monolith,
                                DDD, Clean Architecture, seguranca corporativa, observabilidade, Docker, PostgreSQL
                                e preparacao real para microservices.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {["NextJS", "Spring Boot", "PostgreSQL", "Docker", "DDD", "RBAC", "Event-driven ready"].map((item) => (
                                    <span key={item} className="badge badge-lg border-white/30 bg-white/15 text-white">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-white/20 bg-white/15 p-6 shadow-2xl backdrop-blur">
                            <p className="mb-4 text-sm uppercase tracking-[0.3em] opacity-80">Diretriz central</p>
                            <div className="space-y-4">
                                {[
                                    "Baixo consumo para VPS Oracle gratuita",
                                    "Mesmos modulos no frontend e backend",
                                    "Fronteiras prontas para microservices",
                                    "Auditoria e seguranca desde a fundacao",
                                ].map((item) => (
                                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-black/10 p-4">
                                        <span className="mt-1 h-3 w-3 rounded-full bg-white"/>
                                        <span className="font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto grid w-full max-w-7xl gap-4 px-6 py-10 md:grid-cols-4 lg:px-10 xl:px-0">
                {[
                    ["27+", "modulos de dominio mapeados"],
                    ["6", "fases principais de execucao"],
                    ["100%", "multiempresa-ready desde o schema"],
                    ["0", "microservices prematuros no primeiro deploy"],
                ].map(([value, label]) => (
                    <div key={label} className="stats rounded-3xl border border-base-300 bg-base-200 shadow">
                        <div className="stat">
                            <div className="stat-value text-primary">{value}</div>
                            <div className="stat-desc text-base-content/70">{label}</div>
                        </div>
                    </div>
                ))}
            </section>

            <section className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-10 xl:px-0">
                <div className="mb-8 flex flex-col gap-3">
                    <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Arquitetura alvo</span>
                    <h2 className="text-3xl font-black md:text-4xl">Blocos tecnicos do Gommo</h2>
                    <p className="max-w-3xl text-base-content/70">
                        A solucao comeca simples para operar barato, mas com contratos, boundaries e padroes que evitam
                        reescrita quando os dominios forem extraidos para servicos independentes.
                    </p>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                    {architectureCards.map((card) => (
                        <article key={card.title} className="card border border-base-300 bg-base-200 shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title text-2xl">{card.title}</h3>
                                <p className="text-base-content/70">{card.description}</p>
                                <ul className="mt-4 space-y-3">
                                    {card.items.map((item) => (
                                        <li key={item} className="flex gap-3">
                                            <span className="mt-2 h-2 w-2 rounded-full bg-primary"/>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="bg-base-200">
                <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10 xl:px-0">
                    <div className="mb-10 flex flex-col gap-3">
                        <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Plano de execucao</span>
                        <h2 className="text-3xl font-black md:text-4xl">Fases para sair do blueprint ate a operacao</h2>
                        <p className="max-w-3xl text-base-content/70">
                            Cada fase tem objetivo, entregaveis claros e modulos envolvidos. A ordem reduz risco tecnico
                            e mantem a base pronta para crescimento gradual.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {executionPhases.map((phase, index) => (
                            <article key={phase.title} className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-lg">
                                <div className="grid gap-6 lg:grid-cols-[0.22fr_0.78fr]">
                                    <div>
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-black text-primary-content">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <div className="space-y-5">
                                        <div>
                                            <h3 className="text-2xl font-black">{phase.title}</h3>
                                            <p className="mt-2 text-base-content/70">{phase.objective}</p>
                                        </div>
                                        <div className="grid gap-5 lg:grid-cols-2">
                                            <div>
                                                <p className="mb-3 font-bold">Entregaveis</p>
                                                <ul className="space-y-2">
                                                    {phase.deliverables.map((deliverable) => (
                                                        <li key={deliverable} className="flex gap-3">
                                                            <span className="mt-2 h-2 w-2 rounded-full bg-secondary"/>
                                                            <span>{deliverable}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <p className="mb-3 font-bold">Modulos envolvidos</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {phase.modules.map((moduleName) => (
                                                        <span key={moduleName} className="badge badge-outline badge-lg">
                                                            {moduleName}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 xl:px-0">
                <div className="space-y-4">
                    <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Dominio</span>
                    <h2 className="text-3xl font-black md:text-4xl">Mapa dos principais modulos</h2>
                    <p className="text-base-content/70">
                        O mesmo mapa deve existir no frontend e no backend para facilitar manutencao, onboarding,
                        rastreabilidade e extracao futura para microservices.
                    </p>
                    <div className="alert border border-primary/20 bg-primary/10">
                        <span>
                            Regra: um modulo nunca acessa repositories, stores ou entidades internas de outro modulo.
                            A comunicacao acontece por facade, contrato publico ou evento.
                        </span>
                    </div>
                </div>
                <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-200 shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Modulo</th>
                                <th>Responsabilidade</th>
                                <th>Dependencias</th>
                            </tr>
                            </thead>
                            <tbody>
                            {domainModules.map((moduleItem) => (
                                <tr key={moduleItem.name}>
                                    <td className="font-bold text-primary">{moduleItem.name}</td>
                                    <td>{moduleItem.responsibility}</td>
                                    <td className="text-base-content/70">{moduleItem.dependencies}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section className="bg-base-200">
                <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-14 lg:grid-cols-3 lg:px-10 xl:px-0">
                    <article className="card border border-base-300 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-2xl">Seguranca</h2>
                            <ul className="space-y-3">
                                {securityItems.map((item) => (
                                    <li key={item} className="flex gap-3">
                                        <span className="mt-2 h-2 w-2 rounded-full bg-primary"/>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>

                    <article className="card border border-base-300 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-2xl">Convencoes</h2>
                            <ul className="space-y-3">
                                {namingRules.map((item) => (
                                    <li key={item} className="flex gap-3">
                                        <span className="mt-2 h-2 w-2 rounded-full bg-secondary"/>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>

                    <article className="card border border-base-300 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-2xl">Riscos e mitigacoes</h2>
                            <ul className="space-y-3">
                                {riskItems.map((item) => (
                                    <li key={item} className="flex gap-3">
                                        <span className="mt-2 h-2 w-2 rounded-full bg-accent"/>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>
                </div>
            </section>

            <section className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10 xl:px-0">
                <div className="rounded-[2rem] border border-base-300 bg-base-200 p-8 shadow-xl">
                    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                        <div>
                            <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Execucao tecnica</span>
                            <h2 className="mt-3 text-3xl font-black md:text-4xl">Checklist para a proxima IA implementar</h2>
                            <p className="mt-4 text-base-content/70">
                                A implementacao futura deve seguir este contrato para manter o sistema enterprise,
                                rastreavel e pronto para evolucao.
                            </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {[
                                "Criar estrutura modular antes dos CRUDs",
                                "Implementar auth/RBAC antes dos dominios sensiveis",
                                "Aplicar company_id nas entidades de negocio",
                                "Criar response envelope e error pattern globais",
                                "Usar use cases para fluxos de aplicacao",
                                "Isolar acesso entre modulos via facades",
                                "Adicionar auditoria em operacoes criticas",
                                "Manter Redis/RabbitMQ opcionais no primeiro deploy",
                            ].map((item) => (
                                <div key={item} className="rounded-2xl border border-base-300 bg-base-100 p-4 font-medium">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
