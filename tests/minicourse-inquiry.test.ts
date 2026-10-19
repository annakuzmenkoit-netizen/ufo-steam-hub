import test from "node:test";
import assert from "node:assert/strict";
import { buildRegistrationEmailFields, buildRegistrationSubject, type RegistrationContext } from "../src/lib/registration-context.ts";

test("a minicourse inquiry reaches the hub as a question rather than a booking", () => {
  const context: RegistrationContext = { registrationType: "course", intent: "inquiry", sourcePage: "Головна — мінікурси", program: "Анімація — Театр тіней" };
  assert.equal(buildRegistrationSubject(context), "[UFO] Запит про мінікурс — Анімація — Театр тіней");
  const fields = buildRegistrationEmailFields(context, { parentName: "Тест", phone: "+380000000000" });
  assert.equal(fields["Тип заявки"], "Запит про мінікурс");
  assert.equal(fields["Програма"], context.program);
  assert.equal(fields["Ім’я дитини"], undefined);
  assert.equal(buildRegistrationSubject({ ...context, intent: undefined }), "[UFO] Курс — Анімація — Театр тіней");
});
