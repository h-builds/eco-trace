import './style.css';

const adminUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:8788';
const consumerUrl = import.meta.env.VITE_CONSUMER_URL || 'http://localhost:5173';

const adminLink = document.getElementById('link-admin');
if (adminLink instanceof HTMLAnchorElement) {
  adminLink.href = adminUrl;
} else {
  console.error('[Demo Hub] Critical Error: Auditor Workstation routing element (link-admin) is missing from DOM.');
}

const consumerLink = document.getElementById('link-consumer');
if (consumerLink instanceof HTMLAnchorElement) {
  // DEMO DATA: Hardcoded asset ID (ASSET-COFFEE-2026-001) mapping to the seeded Admin Workstation demo scenario
  consumerLink.href = `${consumerUrl}?asset=ASSET-COFFEE-2026-001`;
} else {
  console.error('[Demo Hub] Critical Error: Consumer App routing element (link-consumer) is missing from DOM.');
}
