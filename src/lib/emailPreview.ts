import type { EmailPreview, Team } from "../types";
import { likeLevelLabels } from "../data/options";

export const createEmailPreview = (teams: Team[]): EmailPreview => {
  const lines = teams.flatMap((team, index) => [
    `【チーム${index + 1}】`,
    `共通点: ${[...team.commonTopics, ...team.commonFavoritePoints].join(" / ") || "ほどよくミックス"}`,
    `雰囲気: ${team.vibeComment}`,
    ...team.members.map(
      (member) =>
        `- ${member.name}: 話したい内容=${member.topics.join("、")} / 好きなところ=${member.favoritePoints.join(
          "、",
        )} / 好き度=${member.likeLevel}（${likeLevelLabels[member.likeLevel]}）`,
    ),
    "",
  ]);

  return {
    to: "YAMAMOTO_EMAIL（実送信時にサーバー側環境変数から参照）",
    subject: "山本周さんを囲む会 マッチング結果",
    body: [
      "山本周さんを囲む会のマッチング結果プレビューです。",
      "本人・参加者の同意を得たイベント用途として取り扱ってください。",
      "",
      ...lines,
      "※ 現時点ではプレビューのみです。実送信機能は後続で実装予定です。",
    ].join("\n"),
  };
};

export const sendMatchingEmail = async () => {
  // TODO: サーバー側のYAMAMOTO_EMAILを使い、同意済みの結果のみ送信する。
  throw new Error("メール送信はまだ実装されていません。");
};
