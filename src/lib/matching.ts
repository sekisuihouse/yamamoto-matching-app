import type { Participant, Team } from "../types";

const intersection = (a: string[], b: string[]) => a.filter((item) => b.includes(item));

const jaccardSimilarity = (a: string[], b: string[]) => {
  const union = Array.from(new Set([...a, ...b]));
  if (union.length === 0) return 0;
  return intersection(a, b).length / union.length;
};

export const calculateSimilarity = (a: Participant, b: Participant) => {
  const topicScore = jaccardSimilarity(a.topics, b.topics) * 0.36;
  const favoriteScore = jaccardSimilarity(a.favoritePoints, b.favoritePoints) * 0.28;
  const likeScore = (1 - Math.abs(a.likeLevel - b.likeLevel) / 4) * 0.18;
  const vibeScore = (a.vibe === b.vibe ? 0.1 : 0) + (a.tension === b.tension ? 0.08 : 0);

  return topicScore + favoriteScore + likeScore + vibeScore;
};

const teamPairScore = (members: Participant[]) => {
  if (members.length <= 1) return 0;
  let score = 0;
  let pairs = 0;

  for (let i = 0; i < members.length; i += 1) {
    for (let j = i + 1; j < members.length; j += 1) {
      score += calculateSimilarity(members[i], members[j]);
      pairs += 1;
    }
  }

  return score / pairs;
};

const createVibeComment = (
  members: Participant[],
  commonTopics: string[],
  commonFavoritePoints: string[],
) => {
  const topicText = commonTopics.length > 0 ? `「${commonTopics.slice(0, 2).join("」「")}」` : "それぞれ違う話題";
  const favoriteText =
    commonFavoritePoints.length > 0
      ? `山本周さんの「${commonFavoritePoints.slice(0, 2).join("」「")}」`
      : "山本周さんへの興味";
  const tension = members[0]?.tension ?? "ほどよくワイワイ";

  return `このチームは${topicText}をきっかけに話が広がりそうです。${favoriteText}に惹かれているメンバーが集まり、${tension}な雰囲気で乾杯できそうです。`;
};

const buildTeam = (members: Participant[], index: number): Team => {
  const [first, ...rest] = members;
  const commonTopics = first ? rest.reduce((acc, member) => intersection(acc, member.topics), first.topics) : [];
  const commonFavoritePoints = first
    ? rest.reduce((acc, member) => intersection(acc, member.favoritePoints), first.favoritePoints)
    : [];
  const averageLikeLevel =
    members.length === 0 ? 0 : members.reduce((sum, member) => sum + member.likeLevel, 0) / members.length;

  return {
    id: `team-${index + 1}`,
    members,
    commonTopics,
    commonFavoritePoints,
    averageLikeLevel,
    vibeComment: createVibeComment(members, commonTopics, commonFavoritePoints),
  };
};

const rebalanceRemainder = (groups: Participant[][]) => {
  const last = groups[groups.length - 1];
  if (!last || last.length !== 1 || groups.length < 2) return groups;

  const previous = groups[groups.length - 2];
  if (previous.length === 3) {
    previous.push(last[0]);
    return groups.slice(0, -1);
  }

  previous.push(last[0]);
  return groups.slice(0, -1);
};

export const createTeams = (participants: Participant[]): Team[] => {
  const remaining = [...participants];
  const groups: Participant[][] = [];

  while (remaining.length > 0) {
    const seed = remaining.shift();
    if (!seed) break;

    const group = [seed];

    // Greedy grouping: pick the participant who improves the average pair score the most.
    while (group.length < 3 && remaining.length > 0) {
      let bestIndex = 0;
      let bestScore = -1;

      remaining.forEach((candidate, index) => {
        const score = teamPairScore([...group, candidate]);
        if (score > bestScore) {
          bestScore = score;
          bestIndex = index;
        }
      });

      const [best] = remaining.splice(bestIndex, 1);
      group.push(best);
    }

    groups.push(group);
  }

  return rebalanceRemainder(groups).map(buildTeam);
};
