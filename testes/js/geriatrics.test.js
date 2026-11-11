import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildEvolutionNarrative } from "../../src/clinical/narrative.js";
import { buildDiagnosticSuggestion } from "../../src/clinical/diagnosis.js";
import { clinicalSummaryGroups } from "../../src/views/clinicalSummary.js";
import { geriatricHistoryBody, geriatricPhysicalBody } from "../../src/views/geriatrics.js";
import { treatmentAiMode } from "../../src/views/decisions.js";

describe("campos geriátricos", () => {
  const form = {
    queixa: "Quedas recentes",
    geriatriaFuncionalidade: "Precisa de ajuda para banho e compras",
    geriatriaMobilidadeQuedas: "Duas quedas no último mês",
    geriatriaMarcha: "Marcha lenta com bengala"
  };

  it("mostra campos preenchidos nas duas páginas", () => {
    assert.match(geriatricHistoryBody(form), /name="geriatriaFuncionalidade"/);
    assert.match(geriatricHistoryBody(form), /Precisa de ajuda para banho e compras/);
    assert.match(geriatricPhysicalBody(form), /name="geriatriaMarcha"/);
    assert.match(geriatricPhysicalBody(form), /Marcha lenta com bengala/);
  });

  it("leva os achados ao resumo e à história clínica", () => {
    const groups = clinicalSummaryGroups(form, { nome: "Maria Silva" });
    const history = groups.find(group => group.title === "Anamnese estruturada");
    const physical = groups.find(group => group.title === "Exame físico");
    assert.ok(history.rows.some(row => row.item.includes("atividades básicas") && row.value === form.geriatriaFuncionalidade));
    assert.ok(physical.rows.some(row => row.item.includes("Marcha") && row.value === form.geriatriaMarcha));
    const narrative = buildEvolutionNarrative(form, { nome: "Maria Silva" });
    assert.match(narrative, /Duas quedas no último mês/);
    assert.match(narrative, /Marcha lenta com bengala/);
  });

  it("não presume exame físico normal quando nada foi registrado", () => {
    const physical = clinicalSummaryGroups({}, {}).find(group => group.title === "Exame físico");
    assert.ok(physical.rows.every(row => !/sem alterações/i.test(row.value)));
  });

  it("usa diagnóstico local e fonte de guidelines próprios da Geriatria", () => {
    const sugestao = buildDiagnosticSuggestion({
      module: "geriatria",
      queixa: "Quedas e marcha lenta",
      geriatriaMobilidadeQuedas: "Duas quedas, medo de cair e instabilidade",
      geriatriaFuncionalidade: "Precisa de ajuda para banho"
    });
    assert.match(sugestao.diagnosticoAiSindromico, /fragilidade|quedas/i);
    assert.equal(treatmentAiMode({ module: "geriatria" }), "guidelines");
  });
});
