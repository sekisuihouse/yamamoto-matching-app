import { useEffect, useMemo, useState } from "react";
import { GlassWater, HeartHandshake, Sparkles } from "lucide-react";
import { BgmPanel } from "./components/BgmPanel";
import { ConsentNotice } from "./components/ConsentNotice";
import { EmailPreviewPanel } from "./components/EmailPreviewPanel";
import { MatchingResults } from "./components/MatchingResults";
import { ParticipantForm } from "./components/ParticipantForm";
import { ParticipantList } from "./components/ParticipantList";
import { createEmailPreview } from "./lib/emailPreview";
import { createTeams } from "./lib/matching";
import type { Participant, Team } from "./types";

const storageKey = "yamamoto-matching-participants";

const loadParticipants = (): Participant[] => {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as Participant[]) : [];
  } catch {
    return [];
  }
};

function App() {
  const [participants, setParticipants] = useState<Participant[]>(loadParticipants);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(participants));
  }, [participants]);

  const preview = useMemo(() => (teams.length > 0 ? createEmailPreview(teams) : null), [teams]);

  const addParticipant = (participant: Participant) => {
    setParticipants((current) => [participant, ...current]);
    setTeams([]);
  };

  const deleteParticipant = (id: string) => {
    setParticipants((current) => current.filter((participant) => participant.id !== id));
    setTeams([]);
  };

  const runMatching = () => {
    setTeams(createTeams(participants));
    window.requestAnimationFrame(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.35),_transparent_32%),linear-gradient(135deg,_#fff7ed_0%,_#fdf2f8_36%,_#f5f3ff_72%,_#fff7ed_100%)] text-slate-900">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-[8%] top-24 h-3 w-3 rounded-full bg-pink-400 shadow-glow" />
        <div className="absolute right-[12%] top-40 h-2 w-2 rounded-full bg-orange-400 shadow-glow" />
        <div className="absolute bottom-28 left-[18%] h-2 w-2 rounded-full bg-fuchsia-400 shadow-glow" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-8 md:py-10">
        <header className="grid gap-6 pb-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <section className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-pink-700 shadow-sm">
              <Sparkles size={16} aria-hidden="true" />
              本人・参加者の同意を得たイベント用です
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">Kanpai Matching</p>
              <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                山本周さんを囲む会
                <span className="block bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent">
                  マッチングアプリ
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
                山本周さんと話したい参加者を、話題・好きポイント・テンションの近さで3人組にします。
                明るく浮かれつつ、個人情報と同意をきちんと扱うイベント用ツールです。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#entry"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-slate-800"
              >
                <GlassWater size={18} aria-hidden="true" />
                参加者を登録
              </a>
              <button
                type="button"
                onClick={runMatching}
                disabled={participants.length < 2}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-pink-700 shadow-sm transition hover:bg-pink-50 disabled:cursor-not-allowed disabled:text-slate-300"
              >
                <HeartHandshake size={18} aria-hidden="true" />
                席替えマッチング
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-glow backdrop-blur">
            <p className="text-sm font-bold text-fuchsia-600">今日の流れ</p>
            <ol className="mt-4 space-y-3 text-sm text-slate-700">
              <li className="rounded-xl bg-pink-50 p-3">1. 参加者が話したいことを登録</li>
              <li className="rounded-xl bg-orange-50 p-3">2. 乾杯テンションと雰囲気を確認</li>
              <li className="rounded-xl bg-violet-50 p-3">3. 3人チームを発表</li>
              <li className="rounded-xl bg-emerald-50 p-3">4. 山本周さんへの送信内容をプレビュー</li>
            </ol>
          </section>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <ConsentNotice />
            <ParticipantForm onAdd={addParticipant} />
            <MatchingResults teams={teams} canMatch={participants.length >= 2} onCreateTeams={runMatching} />
          </div>
          <aside className="space-y-6">
            <BgmPanel />
            <ParticipantList participants={participants} onDelete={deleteParticipant} />
            <EmailPreviewPanel preview={preview} />
          </aside>
        </div>
      </div>
    </main>
  );
}

export default App;
