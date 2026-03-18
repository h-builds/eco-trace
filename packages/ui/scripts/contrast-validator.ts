/// <reference types="node" />
import tokens from '../tokens.json';

/**
 * Validates WCAG 2.1 Level AA contrast ratios (4.5:1 for normal text).
 * This is a build-time validator to ensure architectural integrity.
 */

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function getLuminance(rgb: number[]) {
  const a = rgb.map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrast(hex1: string, hex2: string) {
  const l1 = getLuminance(hexToRgb(hex1));
  const l2 = getLuminance(hexToRgb(hex2));
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

const combinations = [
  { name: 'Brand Blue on Canvas', fg: tokens.tokens.colors.brand['integrity-blue'].value, bg: tokens.tokens.colors.surface.canvas.value },
  { name: 'Brand Blue on Card', fg: tokens.tokens.colors.brand['integrity-blue'].value, bg: tokens.tokens.colors.surface.card.value },
  { name: 'Deep Charcoal on Canvas', fg: tokens.tokens.colors.brand['deep-charcoal'].value, bg: tokens.tokens.colors.surface.canvas.value },
  { name: 'Deep Charcoal on Card', fg: tokens.tokens.colors.brand['deep-charcoal'].value, bg: tokens.tokens.colors.surface.card.value },
  { name: 'Verification Green on Canvas', fg: tokens.tokens.colors.brand['verification-green'].value, bg: tokens.tokens.colors.surface.canvas.value },
  { name: 'Alert Red on Canvas', fg: tokens.tokens.colors.functional.alert.value, bg: tokens.tokens.colors.surface.canvas.value },
];

console.log('--- WCAG 2.1 Level AA Contrast Validation ---');
let failed = false;

combinations.forEach((combo) => {
  const contrast = getContrast(combo.fg, combo.bg);
  const pass = contrast >= 4.5;
  console.log(`${pass ? '✅' : '❌'} ${combo.name}: ${contrast.toFixed(2)}:1`);
  if (!pass) failed = true;
});

if (failed) {
  console.error('\nFAIL: Some color combinations do not meet WCAG 2.1 AA 4.5:1 contrast requirements.');
  process.exit(1);
} else {
  console.log('\nPASS: All tested combinations meet accessibility standards.');
}
