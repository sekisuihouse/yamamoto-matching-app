import { PartyPopper, Shuffle } from "lucide-react";
import { likeLevelLabels } from "../data/options";
import type { Team } from "../types";

type Props = {
  teams: Team[];
  canMatch: boolean;
  onCreateTeams: () => void;
};

export const MatchingResults = ({ teams, canMatch, onCreateTeams }: Props) => (
  <section id="results" className="rounded-2xl border border-white/60 bg-white/90 p-5 shadow-glow backdrop-blur">
    <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-pink-100 p-2 text-pink-600">
          <PartyPopper size={22} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-950">チーム発表</h2>
          <p className="text-sm text-slate-600">似ている話題とテンションで席替え</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onCreateTeams}
        disabled={!canMatch}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        <Shuffle size={18} aria-hidden="true" />
        マッチング実行
      </button>
    </div>

    {teams.length === 0 ? (
      <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
        参加者を2人以上登録すると、山本周さんを囲むチームを発表できます。
      </p>
    ) : (
      <div className="grid gap-4">
        {teams.map((team, index) => (
          <article key={team.id} className="rounded-2xl border border-fuchsia-100 bg-gradient-to-br from-white to-pink-50 p-4">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
              <div>
                <p className="text-sm font-semibold text-pink-600">チーム {index + 1}</p>
                <h3 className="mt-1 text-lg font-bold text-slate-950">
                  {team.members.map((member) => member.name).join("・")}
                </h3>
              </div>
              <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-bold text-orange-700">
                平均好き度 {team.averageLikeLevel.toFixed(1)}
              </span>
            </div>

            <p className="mt-4 rounded-xl bg-white/80 p-3 text-sm leading-6 text-slate-700">{team.vibeComment}</p>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {team.members.map((member) => (
                <div key={member.id} className="rounded-xl bg-white p-3 text-sm">
                  <p className="font-bold text-slate-950">{member.name}</p>
                  <p className="mt-2 text-slate-600">話題: {member.topics.join("、")}</p>
                  <p className="mt-1 text-slate-600">好きなところ: {member.favoritePoints.join("、")}</p>
                  <p className="mt-1 text-slate-600">
                    好き度: {member.likeLevel}（{likeLevelLabels[member.likeLevel]}）
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {(team.commonTopics.length > 0 ? team.commonTopics : ["話題ミックス"]).map((topic) => (
                <span key={topic} className="rounded-full bg-pink-100 px-3 py-1 text-pink-700">
                  {topic}
                </span>
              ))}
              {(team.commonFavoritePoints.length > 0 ? team.commonFavoritePoints : ["好きポイントミックス"]).map((point) => (
                <span key={point} className="rounded-full bg-orange-100 px-3 py-1 text-orange-700">
                  {point}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    )}
  </section>
);
