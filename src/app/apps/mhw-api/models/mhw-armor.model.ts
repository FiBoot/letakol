import { MHWSkillRank } from './mhw-skill.model';
import { MHWArmorRank, MHWArmorType, MHWGender } from './mhw.enum';
import { MHWCraftingCost, MHWDefense, MHWResistances, MHWSetInfo, MHWSlot } from './mhw.model';

export interface MHWArmorAssets {
  imageMale: string;
  imageFemale: string;
}

export interface MHWArmorCraftingInfo {
  materials: Array<MHWCraftingCost>;
}

export interface MHWArmorAttributes {
  requiredGender: MHWGender;
}

export interface MHWArmor {
  id: number;
  slug: string;
  name: string;
  type: MHWArmorType;
  rank: MHWArmorRank;
  rarity: number;
  defense: MHWDefense;
  resistances: MHWResistances;
  slots: Array<MHWSlot>;
  skills: Array<MHWSkillRank>;
  armorSet: MHWSetInfo;
  assets: MHWArmorAssets;
  crafting: MHWArmorCraftingInfo;
  attributes: MHWArmorAttributes;
}
