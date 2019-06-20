interface MHWWeaponElement {
  type: MHWElementType; // The element's damage type
  damage: number; // The power of the element
  hidden: Boolean; // Indicates whether or not the element is a hidden element
}

interface MHWWeaponCraftingInfo {
  craftable: Boolean; // Indicates whether or not the weapon may be directly crafted
  previous: number | null; // The ID of the weapon that this weapon is upgraded from, or null if nothing upgrades into this weapon
  branches: Array<number>; // An array of IDs that the weapon may be upgraded into
  craftingMaterials: Array<MHWCraftingCost>; // An array containing the material cost to create the weapon; will always be empty if craftable is false
  upgradeMaterials: Array<MHWCraftingCost>; // An array containing the material cost to upgrade the weapon identified by previous into this weapon; will always be empty if previous is null
}

interface MHWWeaponAssets {
  icon: string; // The weapon's icon
  image: string; // An image showing the weapon's in game model
}

interface MHWWeaponSharpness {
  red: number; // The red sharpness value
  orange: number; // The orange sharpness value
  yellow: number; // The yellow sharpness value
  green: number; // The green sharpness value
  blue: number; // The blue sharpness value
  white: number; // The white sharpness value
}

interface MHWWeaponAttributes {}

interface MHWWeapon {
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
