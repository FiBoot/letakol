import { MHWSkillRank } from './mhw-skill.model';
import { MHWCraftingCost } from './mhw.model';

export interface MHWCharmRankCrafting {
  craftable: Boolean;
  materials: Array<MHWCraftingCost>;
}

export interface MHWCharmRank {
  name: string;
  level: number;
  rarity: number;
  skills: Array<MHWSkillRank>;
  crafting: MHWCharmRankCrafting;
}

export interface MHWCharm {
  id: number;
  slug: string;
  name: string;
  ranks: Array<MHWCharmRank>;
}
