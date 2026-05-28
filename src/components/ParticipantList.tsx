import { Trash2, Users } from "lucide-react";
import { likeLevelLabels } from "../data/options";
import type { Participant } from "../types";

type Props = {
  participants: Participant[];
  onDelete: (id: string) => void;
};

export const ParticipantList = ({ participants, onDelete }: Props) => (
  <section className="rounded-2xl border border-white/60 bg-white/90 p-5 shadow-glow backdrop-blur">
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-fuchsia-100 p-2 text-fuchsia-600">
          <Users size={22} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-950">参加者一覧</h2>
          <p className="text-sm text-slate-600">{participants.length}人がエントリー中</p>
        </div>
      </div>
    </div>

    {participants.length === 0 ? (
      <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">まだ参加者がいません。最初の乾杯メンバーを登録してください。</p>
    ) : (
      <div className="grid gap-3">
        {participants.map((participant) => (
          <article key={participant.id} className="rounded-2xl border border-pink-100 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-950">{participant.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{participant.contact}</p>
              </div>
              <button
                type="button"
                onClick={() => onDelete(participant.id)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600 transition hover:bg-red-100"
                aria-label={`${participant.name}を削除`}
                title="削除"
              >
                <Trash2 size={17} aria-hidden="true" />
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {participant.topics.slice(0, 3).map((topic) => (
                <span key={topic} className="rounded-full bg-pink-50 px-3 py-1 text-pink-700">
                  {topic}
                </span>
              ))}
              <span className="rounded-full bg-orange-50 px-3 py-1 text-orange-700">
                好き度 {participant.likeLevel}: {likeLevelLabels[participant.likeLevel]}
              </span>
              <span className="rounded-full bg-violet-50 px-3 py-1 text-violet-700">{participant.tension}</span>
            </div>
          </article>
        ))}
      </div>
    )}
  </section>
);
