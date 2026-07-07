/**
 * Скрипт автоперевода UI-строк (БЕСПЛАТНО).
 * Читает messages/ru.json → переводит через MyMemory API → пишет en.json и ky.json.
 *
 * Запуск: npm run translate
 * API-ключ НЕ нужен. Лимит: ~1000 слов/день (для 150 UI-строк хватает).
 *
 * Опционально: если есть OPENAI_API_KEY — использует GPT (лучше качество).
 */

import * as fs from "fs";
import * as path from "path";

const MESSAGES_DIR = path.join(process.cwd(), "messages");
const USE_OPENAI = !!process.env.OPENAI_API_KEY;

type JsonValue = string | string[] | Record<string, unknown>;
type JsonObject = Record<string, JsonValue>;

// ─── MyMemory (бесплатно) ─────────────────────────────────────────────────────

async function myMemory(text: string, from: string, to: string): Promise<string> {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`MyMemory error ${res.status}`);
  const data = (await res.json()) as { responseData: { translatedText: string } };
  return data.responseData.translatedText;
}

// ─── OpenAI (опционально, платно) ───────────────────────────────────────────

async function openAI(text: string, targetLang: string): Promise<string> {
  const langName = targetLang === "en" ? "English" : "Kyrgyz";
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `Translate tourism UI text from Russian to ${langName}. Return ONLY the translation.`,
        },
        { role: "user", content: text },
      ],
    }),
  });
  if (!res.ok) throw new Error(`OpenAI error ${res.status}`);
  const data = (await res.json()) as { choices: { message: { content: string } }[] };
  return data.choices[0].message.content.trim();
}

async function translateText(text: string, targetLang: "en" | "ky"): Promise<string> {
  if (!text.trim()) return text;

  // Не переводим плейсхолдеры и числа
  if (/^\{[\w]+\}$/.test(text.trim())) return text;

  if (USE_OPENAI) {
    return openAI(text, targetLang);
  }

  const to = targetLang;
  const result = await myMemory(text, "ru", to);
  await new Promise((r) => setTimeout(r, 500)); // rate limit
  return result;
}

async function translateValue(value: JsonValue, targetLang: "en" | "ky"): Promise<JsonValue> {
  if (typeof value === "string") {
    return translateText(value, targetLang);
  }
  if (Array.isArray(value)) {
    const result: string[] = [];
    for (const item of value) {
      result.push(typeof item === "string" ? await translateText(item, targetLang) : item);
    }
    return result;
  }
  if (typeof value === "object" && value !== null) {
    const result: JsonObject = {};
    for (const [key, val] of Object.entries(value)) {
      result[key] = await translateValue(val as JsonValue, targetLang);
    }
    return result;
  }
  return value;
}

async function main() {
  const ruPath = path.join(MESSAGES_DIR, "ru.json");
  if (!fs.existsSync(ruPath)) {
    console.error("❌ messages/ru.json не найден");
    process.exit(1);
  }

  const source = JSON.parse(fs.readFileSync(ruPath, "utf-8")) as JsonObject;

  console.log(USE_OPENAI ? "🤖 Режим: OpenAI (платно)" : "🆓 Режим: MyMemory (бесплатно)");
  console.log("   Для OpenAI добавь OPENAI_API_KEY в .env.local\n");

  for (const lang of ["en", "ky"] as const) {
    const targetPath = path.join(MESSAGES_DIR, `${lang}.json`);
    const existing = fs.existsSync(targetPath)
      ? (JSON.parse(fs.readFileSync(targetPath, "utf-8")) as JsonObject)
      : {};

    const langLabel = lang === "en" ? "English" : "Kyrgyz";
    console.log(`🌍 Перевожу на ${langLabel}...`);

    const sections = Object.keys(source);
    const result: JsonObject = { ...existing };

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      process.stdout.write(`  [${i + 1}/${sections.length}] ${section} ... `);

      // Пропускаем уже переведённые секции
      const sourceSection = source[section];
      const targetSection = existing[section];
      if (
        targetSection !== undefined &&
        JSON.stringify(targetSection) !== JSON.stringify(sourceSection)
      ) {
        console.log("пропущено");
        continue;
      }

      result[section] = await translateValue(sourceSection, lang);
      console.log("✓");
    }

    fs.writeFileSync(targetPath, JSON.stringify(result, null, 2) + "\n", "utf-8");
    console.log(`✅ messages/${lang}.json сохранён\n`);
  }

  console.log("🎉 Готово!");
}

main().catch((e) => {
  console.error("❌ Ошибка:", e.message);
  process.exit(1);
});
