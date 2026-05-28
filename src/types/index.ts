export type LikeLevel = 1 | 2 | 3 | 4 | 5;

export type Participant = {
  id: string;
  name: string;
  contact: string;
  topics: string[];
  favoritePoints: string[];
  likeLevel: LikeLevel;
  vibe: string;
  tension: string;
  note: string;
  consent: boolean;
  createdAt: string;
};

export type Team = {
  id: string;
  members: Participant[];
  commonTopics: string[];
  commonFavoritePoints: string[];
  averageLikeLevel: number;
  vibeComment: string;
};

export type EmailPreview = {
  to: string;
  subject: string;
  body: string;
};
