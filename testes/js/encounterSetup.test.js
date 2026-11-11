import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { carryEncounterSetup, encounterSetupValues } from "../../src/clinical/encounterSetup.js";
import { returnAssessmentBody } from "../../src/views/exams.js";

describe("configuração inicial do atendimento", () => {
  it("exige escolha explícita entre presencial e online", () => {
    assert.throws(() => encounterSetupValues({}), /Presencial ou Online/);
    assert.throws(() => encounterSetupValues({ consultationMode: "HYBRID" }), /Presencial ou Online/);
  });

  it("inicia registro manual quando a transcrição não foi aceita", () => {
    const setup = encounterSetupValues({ consultationMode: "IN_PERSON", acceptsTranscription: [] });
    assert.equal(setup.anamnesisInputMode, "manual");
    assert.equal(setup.acceptsTranscription, false);
    assert.deepEqual(setup.teleconsultaConsentimento, []);
    assert.doesNotMatch(returnAssessmentBody(setup), /data-action="voice"/);
  });

  it("inicia transcrição quando aceita e mantém a escolha na troca de paciente", () => {
    const setup = encounterSetupValues({
      consultationMode: "TELECONSULTATION",
      acceptsTranscription: "yes",
      teleconsultaConsentimento: ["Consentimento registrado"],
      teleconsultaLocalPaciente: " Fortaleza/CE "
    });
    assert.equal(setup.anamnesisInputMode, "microphone");
    assert.equal(setup.teleconsultaLocalPaciente, "Fortaleza/CE");
    assert.match(returnAssessmentBody(setup), /data-action="voice"/);
    assert.deepEqual(carryEncounterSetup({ ...setup, id: "registro-antigo", nome: "Não transportar" }), setup);
  });
});
