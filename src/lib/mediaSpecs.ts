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
    color: 'bg-blue-100',
  },
  'ps1': {
    height: 142,
    depth: 10,
    topBuffer: 2,
    bottomBuffer: 2,
    label: 'PlayStation',
    color: 'clear',
  },
  'ds': {
    height: 142,
    depth: 14,
    topBuffer: 3,
    bottomBuffer: 3,
    label: 'Nintendo DS',
    color: 'darkgray',
  },
  '3ds': {
    height: 135,
    depth: 14,
    topBuffer: 3,
    bottomBuffer: 3,
    label: 'Nintendo 3DS',
    color: 'white',
  },
  'vita': {
    height: 135,
    depth: 14,
    topBuffer: 3,
    bottomBuffer: 3,
    label: 'PS Vita',
    color: 'blue',
  },
  'psp': {
    height: 170,
    depth: 14,
    topBuffer: 3,
    bottomBuffer: 3,
    label: 'PSP',
    color: 'clear',
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
    height: 171,
    depth: 14,
    topBuffer: 10,  // Early PS3 had clear plastic on top
    bottomBuffer: 4,
    label: 'PlayStation 3',
    color: 'bg-slate-300',
  },
  'ps3-late': {
    height: 171,
    depth: 14,
    topBuffer: 4,   // Later PS3 cases standardized
    bottomBuffer: 4,
    label: 'PlayStation 3',
    color: 'blue',
  },
  'ps4': {
    height: 171,
    depth: 14,
    topBuffer: 4,
    bottomBuffer: 4,
    label: 'PlayStation 4',
    color: 'blue',
  },
  'ps5': {
    height: 171,
    depth: 14,
    topBuffer: 2,
    bottomBuffer: 2,
    label: 'PlayStation 5',
    color: 'bg-blue-700',
  },
  'switch': {
    height: 171,
    depth: 11,
    topBuffer: 4,
    bottomBuffer: 4,
    label: 'Nintendo Switch',
    color: 'clear',
  },
  'xboxone': {
    height: 171,
    depth: 14,
    topBuffer: 4,
    bottomBuffer: 4,
    label: 'Xbox One',
    color: 'grean',
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
    height: 190,
    depth: 14,
    topBuffer: 4,
    bottomBuffer: 4,
    label: 'PlayStation 2',
    color: 'bg-slate-900',
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
    height: 190,
    depth: 14,
    topBuffer: 4,
    bottomBuffer: 4,
    label: 'Xbox 360',
    color: 'green',
  },
  'wii': {
    height: 190,
    depth: 14,
    topBuffer: 4,
    bottomBuffer: 4,
    label: 'Wii',
    color: 'white',
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