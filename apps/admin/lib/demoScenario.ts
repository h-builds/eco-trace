export interface DemoScenarioData {
  name: string;
  assetId: string;
  productName: string;
  trustedSupplier: string;
  processingActor: string;
  logisticsActor: string;
  auditorLabel: string;
  demoDataLabel: string;
}

export const DemoScenario: DemoScenarioData = {
  name: 'Verified Product Journey',
  assetId: 'ASSET-COFFEE-2026-001',
  productName: 'Andes Trace Coffee Lot 001',
  trustedSupplier: 'Andes Organic Cooperative',
  processingActor: 'Veridian Processing Node',
  logisticsActor: 'NorthStar Logistics',
  auditorLabel: 'Eco Trace Demo Auditor',
  demoDataLabel: 'Demo data only',
};
