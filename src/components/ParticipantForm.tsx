import { FormEvent, useState } from "react";
import { Sparkles, UserPlus } from "lucide-react";
import { favoritePointOptions, likeLevelLabels, tensionOptions, topicOptions, vibeOptions } from "../data/options";
import type { LikeLevel, Participant } from "../types";

type Props = {
  onAdd: (participant: Participant) => void;
};

const emptyForm = {
  name: "",
  contact: "",
  topics: [] as string[],
  favoritePoints: [] as string[],
  likeLevel: 3 as LikeLevel,
  vibe: vibeOptions[0],
  tension: tensionOptions[1],
  note: "",
  consent: false,
};

const toggle = (items: string[], value: string) =>
  items.includes(value) ? items.filter((item) => item !== value) : [...items, value];

export const ParticipantForm = ({ onAdd }: Props) => {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.contact.trim() || form.topics.length === 0 || form.favoritePoints.length === 0) {
      setError("名前、連絡先、話したい内容、好きなところを入力してください。");
      return;
    }
    if (!form.consent) {
      setError("本人・参加者の同意を確認してください。");
      return;
    }

    onAdd({
      ...form,
      id: crypto.randomUUID(),
      name: form.name.trim(),
      contact: form.contact.trim(),
      note: form.note.trim(),
      createdAt: new Date().toISOString(),
    });
    setForm(emptyForm);
    setError("");
  };

  return (
    <section id="entry" className="rounded-2xl border border-white/60 bg-white/90 p-5 shadow-glow backdrop-blur">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-full bg-orange-100 p-2 text-orange-600">
          <UserPlus size={22} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-950">参加者登録</h2>
          <p className="text-sm text-slate-600">席替え前のプロフィールを軽く入力</p>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm font-semibold text-slate-800">
            名前
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="mt-2 w-full rounded-xl border border-pink-100 bg-white px-4 py-3 outline-none ring-pink-300 transition focus:ring-4"
              placeholder="例：佐藤 花子"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-800">
            メールアドレス、または連絡先
            <input
              value={form.contact}
              onChange={(event) => setForm({ ...form, contact: event.target.value })}
              className="mt-2 w-full rounded-xl border border-pink-100 bg-white px-4 py-3 outline-none ring-pink-300 transition focus:ring-4"
              placeholder="例：hanako@example.com"
            />
          </label>
        </div>

        <fieldset>
          <legend className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Sparkles size={16} aria-hidden="true" />
            山本周さんと話したい内容
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {topicOptions.map((option) => (
              <label key={option} className="flex items-center gap-2 rounded-xl bg-pink-50 px-3 py-2 text-sm text-slate-800">
                <input
                  type="checkbox"
                  checked={form.topics.includes(option)}
                  onChange={() => setForm({ ...form, topics: toggle(form.topics, option) })}
                  className="accent-pink-500"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-sm font-semibold text-slate-800">山本周さんの好きなところ</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {favoritePointOptions.map((option) => (
              <label key={option} className="flex items-center gap-2 rounded-xl bg-orange-50 px-3 py-2 text-sm text-slate-800">
                <input
                  type="checkbox"
                  checked={form.favoritePoints.includes(option)}
                  onChange={() => setForm({ ...form, favoritePoints: toggle(form.favoritePoints, option) })}
                  className="accent-orange-500"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="block text-sm font-semibold text-slate-800">
            好き度
            <select
              value={form.likeLevel}
              onChange={(event) => setForm({ ...form, likeLevel: Number(event.target.value) as LikeLevel })}
              className="mt-2 w-full rounded-xl border border-pink-100 bg-white px-4 py-3 outline-none ring-pink-300 transition focus:ring-4"
            >
              {([1, 2, 3, 4, 5] as LikeLevel[]).map((level) => (
                <option key={level} value={level}>
                  {level}: {likeLevelLabels[level]}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-semibold text-slate-800">
            自分の雰囲気
            <select
              value={form.vibe}
              onChange={(event) => setForm({ ...form, vibe: event.target.value })}
              className="mt-2 w-full rounded-xl border border-pink-100 bg-white px-4 py-3 outline-none ring-pink-300 transition focus:ring-4"
            >
              {vibeOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-semibold text-slate-800">
            希望する合コンテンション
            <select
              value={form.tension}
              onChange={(event) => setForm({ ...form, tension: event.target.value })}
              className="mt-2 w-full rounded-xl border border-pink-100 bg-white px-4 py-3 outline-none ring-pink-300 transition focus:ring-4"
            >
              {tensionOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="block text-sm font-semibold text-slate-800">
          備考
          <textarea
            value={form.note}
            onChange={(event) => setForm({ ...form, note: event.target.value })}
            className="mt-2 min-h-28 w-full rounded-xl border border-pink-100 bg-white px-4 py-3 outline-none ring-pink-300 transition focus:ring-4"
            placeholder="話すときの配慮事項など"
          />
        </label>

        <label className="flex items-start gap-3 rounded-xl bg-emerald-50 p-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(event) => setForm({ ...form, consent: event.target.checked })}
            className="mt-1 accent-emerald-600"
          />
          本人・参加者の同意を得たイベント用途であり、登録内容の取り扱いとメール送信プレビュー作成に同意しています。
        </label>

        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400 px-5 py-3 font-bold text-white shadow-glow transition hover:scale-[1.01] md:w-auto"
        >
          <UserPlus size={18} aria-hidden="true" />
          乾杯メンバーとして登録
        </button>
      </form>
    </section>
  );
};
