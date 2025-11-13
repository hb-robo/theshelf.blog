// src/lib/mediaSpecs.ts

export interface MediaSpec {
  height: number;        // Height in mm
  depth: number;         // Depth/thickness in mm
  topBuffer: number;     // Extra space above spine art (mm)
  bottomBuffer: number;  // Extra space below spine art (mm)
  leftBuffer?: number;
  rightBuffer?: number;
  label: string;         // Display name
  color?: string;        // Optional color for generated spines
  topRounding?: string;  // Tailwind classes for top rounding (e.g., 'rounded-t-md')
  bottomRounding?: string; // Tailwind classes for bottom rounding (e.g., 'rounded-b-sm')
}

/**
 * Physical dimensions for media cases
 * All measurements in millimeters for accuracy
 * Buffers account for case chrome (clear plastic, structural elements, etc.)
 */
export const MEDIA_SPECS: Record<string, MediaSpec> = {
  // CD-height cases (~142mm)
  'cd': {
    height: 125,
    depth: 10,
    topBuffer: 2,
    bottomBuffer: 2,
    leftBuffer: 1,
    rightBuffer: 1,
    label: 'CD Jewel Case',
    color: 'bg-blue-50',
  },
  'cd-slip-cover': {
    height: 125,
    depth: 10,
    topBuffer: 0,
    bottomBuffer: 0,
    leftBuffer: 0,
    rightBuffer: 0,
    label: 'CD w/ Slipcover',
    color: 'bg-none',
  },
  'ps1': {
    height: 142,
    depth: 10,
    topBuffer: 2,
    bottomBuffer: 2,
    label: 'PlayStation',
    color: 'bg-gray-50',
  },
  'ds': {
    height: 123,
    depth: 15,
    topBuffer: 3,
    bottomBuffer: 3,
    label: 'Nintendo DS',
    color: 'bg-gray-700',
    topRounding: 'rounded-t-md',
    bottomRounding: 'rounded-b-md'
  },
  '3ds': {
    height: 123,
    depth: 12,
    topBuffer: 3,
    bottomBuffer: 3,
    label: 'Nintendo 3DS',
    color: 'bg-neutral-50',
    topRounding: 'rounded-t-lg',
    bottomRounding: 'rounded-b-lg'
  },
  'vita': {
    height: 135,
    depth: 14,
    topBuffer: 3,
    bottomBuffer: 3,
    label: 'PS Vita',
    color: 'bg-blue-700',
  },
  'psp': {
    height: 175,
    depth: 13,
    topBuffer: 5,
    bottomBuffer: 4,
    label: 'PSP',
    color: 'bg-slate-100',
    topRounding: 'rounded-t-lg',
    bottomRounding: 'rounded-b-lg' 
  },

  // Blu-ray height cases (~171mm)
  'bluray': {
    height: 171,
    depth: 14,
    topBuffer: 4,
    bottomBuffer: 4,
    label: 'Blu-ray',
    color: 'blue',
  },
  'ps3': {
    height: 169,
    depth: 14,
    topBuffer: 15,  // Early PS3 had clear plastic on top
    bottomBuffer: 4,
    label: 'PlayStation 3',
    color: 'bg-gray-100',
    topRounding: 'rounded-t-md',
    bottomRounding: 'rounded-b-md'
  },
  'ps4': {
    height: 170,
    depth: 13,
    topBuffer: 4,
    bottomBuffer: 4,
    label: 'PlayStation 4',
    color: 'bg-blue-500',
    topRounding: 'rounded-t-md',
    bottomRounding: 'rounded-b-md'
  },
  'ps5': {
    height: 170,
    depth: 13,
    topBuffer: 4,
    bottomBuffer: 4,
    label: 'PlayStation 5',
    color: 'bg-blue-500',
    topRounding: 'rounded-t-md',
    bottomRounding: 'rounded-b-md'
  },
  'switch': {
    height: 167,
    depth: 10,
    topBuffer: 3,
    bottomBuffer: 4,
    label: 'Nintendo Switch',
    color: 'bg-slate-100',
    topRounding: 'rounded-t-sm',
    bottomRounding: 'rounded-b-sm'
  },
  'xboxone': {
    height: 168,
    depth: 12,
    topBuffer: 14,
    bottomBuffer: 5,
    label: 'Xbox One',
    color: 'bg-lime-500', // this is really off but no closer default class
    topRounding: 'rounded-t-xs',
    bottomRounding: 'rounded-b-xs'
  },
  'xboxseries': {
    height: 171,
    depth: 14,
    topBuffer: 4,
    bottomBuffer: 4,
    label: 'Xbox Series',
    color: 'green',
  },

  // DVD height cases (~190mm)
  'dvd': {
    height: 190,
    depth: 14,
    topBuffer: 4,
    bottomBuffer: 4,
    label: 'DVD',
    color: 'darkgray',
  },
  'ps2': {
    height: 188,
    depth: 14,
    topBuffer: 3,
    bottomBuffer: 3,
    label: 'PlayStation 2',
    color: 'bg-slate-800',
    topRounding: 'rounded-t-lg',
    bottomRounding: 'rounded-b-lg'
  },
  'xbox': {
    height: 190,
    depth: 14,
    topBuffer: 4,
    bottomBuffer: 4,
    label: 'Xbox',
    color: 'green',
  },
  'xbox360': {
    height: 189,
    depth: 14,
    topBuffer: 4,
    bottomBuffer: 3,
    label: 'Xbox 360',
    color: 'bg-lime-400',
    topRounding: 'rounded-t-md',
    bottomRounding: 'rounded-b-md'
  },
  'wii': {
    height: 189,
    depth: 14,
    topBuffer: 4,
    bottomBuffer: 4,
    label: 'Wii',
    color: 'bg-neutral-50',
    topRounding: 'rounded-t-lg',
    bottomRounding: 'rounded-b-lg'
  },
  'wiiu': {
    height: 190,
    depth: 14,
    topBuffer: 4,
    bottomBuffer: 4,
    label: 'Wii U',
    color: 'cyan',
  },
  'gamecube': {
    height: 190,
    depth: 14,
    topBuffer: 3,
    bottomBuffer: 3,
    label: 'GameCube',
    color: 'darkgray',
  },
};

/**
 * Get specs for a media subtype, with fallback to generic defaults
 */
export function getMediaSpec(subtype?: string): MediaSpec {
  if (!subtype) {
    return {
      height: 171,
      depth: 14,
      topBuffer: 4,
      bottomBuffer: 4,
      label: 'Unknown',
    };
  }

  return MEDIA_SPECS[subtype.toLowerCase()] || {
    height: 171,
    depth: 14,
    topBuffer: 4,
    bottomBuffer: 4,
    label: subtype,
  };
}

/**
 * Base scale factor - all dimensions multiply by this
 * Adjust this to make the entire shelf bigger/smaller
 */
export const BASE_SCALE = 0.8; // 80% of actual size for screen display

/**
 * Convert mm to CSS pixels at current scale
 */
export function mmToPx(mm: number, scale: number = BASE_SCALE): number {
  // Rough conversion: 1mm ≈ 3.78px at 96 DPI
  return mm * 3.78 * scale;
}