import { Mail } from "lucide-react";
import type { EmailPreview } from "../types";

type Props = {
  preview: EmailPreview | null;
};

export const EmailPreviewPanel = ({ preview }: Props) => (
  <section className="rounded-2xl border border-white/60 bg-white/90 p-5 shadow-glow backdrop-blur">
    <div className="mb-4 flex items-center gap-3">
      <div className="rounded-full bg-violet-100 p-2 text-violet-600">
        <Mail size={22} aria-hidden="true" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-slate-950">メール送信プレビュー</h2>
        <p className="text-sm text-slate-600">現時点では送信せず、内容だけ確認します</p>
      </div>
    </div>

    {!preview ? (
      <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">マッチング結果を作成するとプレビューが表示されます。</p>
    ) : (
      <div className="space-y-3">
        <div className="rounded-xl bg-slate-50 p-3 text-sm">
          <p>
            <span className="font-bold">To:</span> {preview.to}
          </p>
          <p className="mt-1">
            <span className="font-bold">Subject:</span> {preview.subject}
          </p>
        </div>
        <pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded-xl bg-slate-950 p-4 text-sm leading-6 text-white">
          {preview.body}
        </pre>
      </div>
    )}
  </section>
);
