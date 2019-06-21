import { MHWSkillRank } from './mhw-skill.model';

export interface MHWDecoration {
  id: number;
  slug: string;
  name: string;
  rarity: number;
  slot: number;
  skills: Array<MHWSkillRank>;
}
