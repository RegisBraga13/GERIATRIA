import { geriatricHistoryFields, geriatricPhysicalFields } from "../clinical/geriatrics.js";
import { textarea } from "../ui/controls.js";

function fieldCard(title, fields, form) {
  return `<div class="clinical-card"><h4>${title}</h4>
    <p class="field-hint">Registre os achados avaliados. Campos em branco permanecem como não avaliados.</p>
    ${fields.map(([key, label]) => textarea(key, label, form[key])).join("")}
  </div>`;
}

export function geriatricHistoryBody(form) {
  return fieldCard("Avaliação multidimensional da pessoa idosa", geriatricHistoryFields, form);
}

export function geriatricPhysicalBody(form) {
  return fieldCard("Exame físico geriátrico", geriatricPhysicalFields, form);
}
