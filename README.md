# Prontuário Geriátrico — versão inicial

Baseado nas páginas do projeto privado PSIQUIATRIA do Dr. Regis Braga. Nesta primeira etapa, a navegação e as demais páginas foram preservadas. A anamnese ganhou campos de avaliação geriátrica multidimensional e o exame físico ganhou um roteiro próprio. Os campos são salvos no prontuário, exibidos no resumo e levados à história clínica e ao contexto das etapas de IA.

O roteiro contempla funcionalidade, mobilidade e quedas, cognição, humor, nutrição, continência, medicamentos, capacidades sensoriais, suporte e objetivos de cuidado. O exame físico inclui sinais vitais, antropometria, estado geral, sistemas, força, marcha, neurologia, pele e sentidos. Campo em branco significa **não avaliado**; o resumo não presume normalidade.

As demais páginas e lógicas clínicas ainda refletem a base de Psiquiatria. Esta versão é o início do módulo Geriatria e requer revisão clínica das etapas de diagnóstico, tratamento, escalas e sugestões de IA antes de uso assistencial.

O catálogo de entrevista derivado de obras licenciadas do projeto privado **não foi copiado**. Há um roteiro original e reduzido para manter o refinamento funcional nesta base pública.

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
