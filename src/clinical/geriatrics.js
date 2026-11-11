// Campos próprios da avaliação geriátrica. Campo vazio significa não avaliado.
export const geriatricHistoryFields = [
  ["geriatriaFuncionalidade", "Funcionalidade: atividades básicas e instrumentais"],
  ["geriatriaMobilidadeQuedas", "Mobilidade, equilíbrio e quedas"],
  ["geriatriaCognicao", "Cognição e mudança aguda do estado mental"],
  ["geriatriaHumorSono", "Humor e sono"],
  ["geriatriaNutricao", "Alimentação, perda de peso e deglutição"],
  ["geriatriaContinencia", "Continência urinária e intestinal"],
  ["geriatriaMedicamentos", "Medicamentos em uso, adesão e eventos adversos"],
  ["geriatriaSensorial", "Visão, audição e comunicação"],
  ["geriatriaSuporte", "Rede de apoio, cuidador e ambiente domiciliar"],
  ["geriatriaObjetivos", "Prioridades e objetivos de cuidado da pessoa idosa"]
];

export const geriatricPhysicalFields = [
  ["geriatriaSinaisVitais", "Sinais vitais e pressão em ortostatismo, quando indicada"],
  ["geriatriaAntropometria", "Peso, altura e evolução ponderal"],
  ["geriatriaEstadoGeral", "Estado geral, hidratação e mucosas"],
  ["geriatriaCardiopulmonar", "Ausculta cardíaca e pulmonar"],
  ["geriatriaAbdome", "Abdome"],
  ["geriatriaForca", "Força, amplitude de movimento e desempenho funcional"],
  ["geriatriaMarcha", "Marcha, equilíbrio e transferências"],
  ["geriatriaNeurologico", "Exame neurológico focal"],
  ["geriatriaPele", "Pele, pés e lesões por pressão"],
  ["geriatriaSensorialExame", "Visão, audição e cavidade oral"]
];

export function geriatricFieldText(form = {}, fields = []) {
  return fields.map(([key, label]) => {
    const value = String(form[key] || "").trim();
    return value ? `${label}: ${value}` : "";
  }).filter(Boolean).join("\n");
}
