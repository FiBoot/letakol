import {
  MHWBoostType,
  MHWBowCoating,
  MHWBowgunDeviaion,
  MHWDamageType,
  MHWEldersealType,
  MHWElementType,
  MHWPhialType,
  MHWShellingType,
  MHWSpecialAmmoType,
  MHWWeaponType
} from './mhw.enum';
import { MHWAttack, MHWCraftingCost, MHWSlot } from './mhw.model';

export interface MHWWeaponElement {
  type: MHWElementType; // The element's damage type
  damage: number; // The power of the element
  hidden: Boolean; // Indicates whether or not the element is a hidden element
}

export interface MHWWeaponCraftingInfo {
  craftable: Boolean; // Indicates whether or not the weapon may be directly crafted
  previous: number | null; // The ID of the weapon that this weapon is upgraded from, or null if nothing upgrades into this weapon
  branches: Array<number>; // An array of IDs that the weapon may be upgraded into
  craftingMaterials: Array<MHWCraftingCost>; // An array containing the material cost to create the weapon; will always be empty if craftable is false
  upgradeMaterials: Array<MHWCraftingCost>; // An array containing the material cost to upgrade the weapon identified by previous into this weapon; will always be empty if previous is null
}

export interface MHWWeaponAssets {
  icon: string; // The weapon's icon
  image: string; // An image showing the weapon's in game model
}

export interface MHWWeaponSharpness {
  red: number; // The red sharpness value
  orange: number; // The orange sharpness value
  yellow: number; // The yellow sharpness value
  green: number; // The green sharpness value
  blue: number; // The blue sharpness value
  white: number; // The white sharpness value
}

export interface MHWAmmoCapacities {
  normal: Array<number>;
  flaming: Array<number>;
  piercing: Array<number>;
  water: Array<number>;
  spread: Array<number>;
  freeze: Array<number>;
  sticky: Array<number>;
  thunder: Array<number>;
  cluster: Array<number>;
  dragon: Array<number>;
  recover: Array<number>;
  slicing: Array<number>;
  poison: Array<number>;
  wyvern: Array<number>;
  paralysis: Array<number>;
  demon: Array<number>;
  sleep: Array<number>;
  armor: Array<number>;
  exhaust: Array<number>;
  tranq: Array<number>;
}

export interface MHWWeaponAttributes {
  ammoCapacities: MHWAmmoCapacities; // 	For "light-bowgun" and "heavy-bowgun" weapons only
  affinity: number; // 	The affinity of the weapon
  boostType: MHWBoostType; // 	For "insect-glaive" weapons only
  coatings: Array<MHWBowCoating>; // 	For "bow" weapons only
  damageType: MHWDamageType; // 	The type of damage the weapon deals
  defense: number; // 	Some weapons (namely "gunlance" types) augment player defense; such weapons indicate that with this field
  deviation: MHWBowgunDeviaion; // 	For "light-bowgun" and "heavy-bowgun" weapons only
  elderseal: MHWEldersealType; // 	The elderseal type attributed to the weapon
  phialType: MHWPhialType; // 	For "switch-axe" and "charge-blade" weapons only
  shellingType: MHWShellingType; // 	For "gunlance" weapons only
  specialAmmo: MHWSpecialAmmoType; // 	For "light-bowgun" and "heavy-bowgun" weapons only
}

export interface MHWWeapon {
  id: number;
  slug: string;
  name: string;
  type: MHWWeaponType;
  rarity: number;
  attack: MHWAttack;
  slots: Array<MHWSlot>;
  elements: Array<MHWWeaponElement>;
  crafting: MHWWeaponCraftingInfo;
  assets: MHWWeaponAssets;
  sharpness: MHWWeaponSharpness; // (deprecated) Contains sharpness information
  durability: Array<MHWWeaponSharpness>;
  attributes: MHWWeaponAttributes;
}
