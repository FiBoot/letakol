
interface MHWArmorAssets {
  imageMale: string;
  imageFemale: string;
}

interface MHWArmorCraftingInfo {
  materials: Array<MHWCraftingCost>;
}

interface MHWArmorAttributes {
  requiredGender: MHWGender;
}

interface MHWArmor {
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
