import { ShieldCheck } from "lucide-react";

export const ConsentNotice = () => (
  <section className="rounded-2xl border border-white/50 bg-white/80 p-5 shadow-glow backdrop-blur">
    <div className="flex items-start gap-3">
      <div className="rounded-full bg-emerald-100 p-2 text-emerald-700">
        <ShieldCheck size={22} aria-hidden="true" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-slate-900">同意とプライバシー</h2>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          このアプリは、本人・参加者の同意を得たイベント用です。登録内容は山本周さんを囲む会の席組みと連絡確認にのみ使い、
          嫌がらせ、晒し、追跡、本人や参加者が望まない連絡には使わない前提で運用してください。
        </p>
      </div>
    </div>
  </section>
);
