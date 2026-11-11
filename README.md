# Prontuário Geriátrico — versão inicial

Baseado nas páginas do projeto privado PSIQUIATRIA do Dr. Regis Braga. Nesta primeira etapa, a navegação e as demais páginas foram preservadas. A anamnese ganhou campos de avaliação geriátrica multidimensional e o exame físico ganhou um roteiro próprio. Os campos são salvos no prontuário, exibidos no resumo e levados à história clínica e ao contexto das etapas de IA.

O roteiro contempla funcionalidade, mobilidade e quedas, cognição, humor, nutrição, continência, medicamentos, capacidades sensoriais, suporte e objetivos de cuidado. O exame físico inclui sinais vitais, antropometria, estado geral, sistemas, força, marcha, neurologia, pele e sentidos. Campo em branco significa **não avaliado**; o resumo não presume normalidade.

As demais páginas e lógicas clínicas ainda refletem a base de Psiquiatria. Esta versão é o início do módulo Geriatria e requer revisão clínica das etapas de diagnóstico, tratamento, escalas e sugestões de IA antes de uso assistencial.

O catálogo de entrevista derivado de obras licenciadas do projeto privado **não foi copiado**. Há um roteiro original e reduzido para manter o refinamento funcional nesta base pública.

## RAG e guidelines de Geriatria

As diretrizes encontradas no computador foram incorporadas em `diretrizes/geriatria/`. O conjunto cobre avaliação geriátrica ampla, fragilidade, sarcopenia, quedas, delirium, demências, nutrição, disfagia, incontinência, polifarmácia e desprescrição, osteoporose, diabetes, hipertensão, Parkinson, infecção urinária e cuidados paliativos.

Também foram localizados acervos RAG de Geriatria em `C:\Users\Regis\Downloads\especialidades\backend\acervo\geriatria\` e as regras de especialidade em `C:\Users\Regis\Desktop\Aplicativos\especialidades\backend\app\especialidades\geriatria.py`. O acervo de livros permanece fora deste repositório; use os arquivos autorizados na ingestão da Vector Store.

Para indexá-las em uma Vector Store separada, configure `OPENAI_API_KEY` e execute:

```bash
python scripts/ingest_guidelines.py diretrizes/geriatria --store-name "Diretrizes de Geriatria - Regis Braga"
```

Copie o `OPENAI_GUIDELINES_VECTOR_STORE_ID` exibido para o `.env`. O Tratamento de uma nova consulta geriátrica passa a abrir por padrão no modo Guidelines. A geração continua exigindo revisão e seleção médica.

Para um acervo bibliográfico autorizado, use uma Vector Store própria do RAG e a etiqueta geriátrica:

```bash
python scripts/ingest_rag.py C:/caminho/para/arquivos.md --escopo geriatria
```

Copie o `OPENAI_RAG_VECTOR_STORE_ID` exibido para o `.env`. Diagnóstico e refinamento passam a procurar os escopos de Geriatria configurados no módulo.

## Executar localmente

```bash
python -m pip install -r requirements.txt
python server.py
```

Abra `http://127.0.0.1:8000/`. Sem chave de API, o aplicativo abre e as funções de IA avisam que estão indisponíveis. O arquivo `.env.example` lista a configuração opcional; não versione `.env` nem dados de pacientes.

## Testes

```bash
node --test 'testes/js/*.test.js'
python -m unittest discover -s testes
```

## Referências para os campos geriátricos

- [OMS — ICOPE, 2ª edição](https://www.who.int/publications/i/item/9789240103726): capacidade intrínseca, suporte social e plano de cuidado centrado na pessoa.
- [Ministério da Saúde — Ações para a pessoa idosa](https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-pessoa-idosa/acoes): avaliação multidimensional e acompanhamento longitudinal.
- [Ministério da Saúde — Caderneta de Saúde da Pessoa Idosa](https://bvsms.saude.gov.br/bvs/publicacoes/caderneta_saude_pessoa_idosa_3edicao.pdf): medicamentos, funcionalidade e quedas.
