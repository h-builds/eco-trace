import { getRequestContext } from "@cloudflare/next-on-pages";
import ActorForm from "./ActorForm";
import AssetForm from "./AssetForm";
import { DemoScenario } from "../../../lib/demoScenario";
export const runtime = "edge";

// Demo Fixture: Infers role based on seeded name for the portfolio demo.
// Do not use in production without a proper 'role' column in D1.
function getActorRole(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('origin') || lower.includes('cooperative') || lower.includes('farm')) return 'Origin Supplier';
  if (lower.includes('process') || lower.includes('veridian')) return 'Processor';
  if (lower.includes('logistic') || lower.includes('transport') || lower.includes('northstar')) return 'Logistics Partner';
  if (lower.includes('audit')) return 'External Auditor';
  return 'Supply Chain Actor';
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  all<T = unknown>(): Promise<D1Result<T>>;
  first<T = unknown>(colName?: string): Promise<T | null>;
  run<T = unknown>(): Promise<D1Result<T>>;
}

interface D1Result<T = unknown> {
  success: boolean;
  results: T[];
}

interface Env {
  DB: D1Database;
}

interface Actor {
  id: string;
  name: string;
  public_key: string;
  status: string;
  created_at: string;
  asset_count?: number;
}

interface Asset {
  id: string;
  name: string;
  description: string;
  owner_id: string;
  owner_name: string;
  created_at: string;
}

export default async function EntitiesPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams;
  const db = (getRequestContext().env as unknown as Env).DB;

  const actorPage = Number(searchParams?.actorPage) || 1;
  const assetPage = Number(searchParams?.assetPage) || 1;
  const q = typeof searchParams?.q === 'string' ? searchParams.q : '';
  const limit = 5;

  let actors: Actor[] = [];
  let assets: Asset[] = [];

  try {
    let actorQueryStr = "SELECT t.*, (SELECT COUNT(a.id) FROM assets a WHERE a.owner_id = t.id) as asset_count FROM trusted_actors t";
    let assetQueryStr = "SELECT a.*, t.name as owner_name FROM assets a JOIN trusted_actors t ON a.owner_id = t.id";
    const bindParams: string[] = [];
    
    if (q) {
      actorQueryStr += " WHERE t.name LIKE ?";
      assetQueryStr += " WHERE a.name LIKE ? OR t.name LIKE ?";
      bindParams.push(`%${q}%`);
    }

    actorQueryStr += ` ORDER BY created_at DESC LIMIT ${limit} OFFSET ${(actorPage - 1) * limit}`;
    assetQueryStr += ` ORDER BY a.created_at DESC LIMIT ${limit} OFFSET ${(assetPage - 1) * limit}`;

    const actorsQuery = await db.prepare(actorQueryStr).bind(...(q ? [bindParams[0]] : [])).all<Actor>();
    actors = actorsQuery.results || [];

    const assetsQuery = await db.prepare(assetQueryStr).bind(...(q ? [bindParams[0], bindParams[0]] : [])).all<Asset>();
    assets = assetsQuery.results || [];
  } catch (error) {
    console.error("Failed to fetch entities", error);
  }


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light text-white mb-2">Trusted Actors & Assets</h1>
        <p className="text-[#607D8B]">Only trusted actors can contribute verifiable events to the product journey.</p>
      </div>

      <div className="bg-[#1A1C1E] border border-[#607D8B]/30 rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-white font-medium mb-1">Featured Demo Scenario</h2>
          <p className="text-sm text-[#607D8B]">
            {DemoScenario.name} — <span className="text-[#8ED5B4]">{DemoScenario.assetId}</span>
          </p>
        </div>
        <a 
          href={`/dashboard/entities?q=${DemoScenario.assetId}`}
          className="bg-[#607D8B]/20 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-[#607D8B]/40 transition-colors"
        >
          Filter by Scenario
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <ActorForm />
          <AssetForm actors={actors} />
        </div>

        <div className="space-y-8">
          <form className="flex gap-2 mb-4" method="GET">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search actors or assets..."
              className="flex-1 bg-[#1A1C1E] border border-[#607D8B]/50 rounded-md py-2 px-3 text-white focus:outline-none focus:border-[#8ED5B4] transition-colors"
            />
            <button type="submit" className="bg-[#8ED5B4] text-[#1A1C1E] font-medium py-2 px-4 rounded-md hover:bg-[#8ED5B4]/90 transition-colors">
              Search
            </button>
            {q && (
              <a href="/dashboard/entities" className="bg-[#607D8B]/20 text-white font-medium py-2 px-4 rounded-md hover:bg-[#607D8B]/40 transition-colors">
                Clear
              </a>
            )}
          </form>

          <div className="bg-[#1A1C1E] p-6 rounded-lg shadow-elevation-1 border border-[#607D8B]/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-white flex items-center gap-2">
                Trusted Actors
                <span className="text-[10px] uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded">
                  {DemoScenario.demoDataLabel}
                </span>
              </h3>
              <div className="flex gap-2">
                <a href={`?actorPage=${Math.max(1, actorPage - 1)}${q ? `&q=${q}` : ''}${assetPage > 1 ? `&assetPage=${assetPage}` : ''}`} className="text-xs px-2 py-1 bg-[#607D8B]/20 rounded text-white hover:bg-[#607D8B]/40">Prev</a>
                <span className="text-xs text-[#607D8B] py-1">Page {actorPage}</span>
                <a href={`?actorPage=${actorPage + 1}${q ? `&q=${q}` : ''}${assetPage > 1 ? `&assetPage=${assetPage}` : ''}`} className="text-xs px-2 py-1 bg-[#607D8B]/20 rounded text-white hover:bg-[#607D8B]/40">Next</a>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#607D8B]">
                <thead className="text-xs uppercase bg-[#1A1C1E] border-b border-[#607D8B]/30 text-white">
                  <tr>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Role</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Public Key (Truncated)</th>
                    <th className="px-4 py-3 font-medium text-right">Assets</th>
                  </tr>
                </thead>
                <tbody>
                  {actors.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-4 text-center">No actors registered.</td>
                    </tr>
                  ) : actors.map((actor) => (
                    <tr key={actor.id} className="border-b border-[#607D8B]/10 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 font-medium text-white">{actor.name}</td>
                      <td className="px-4 py-3 text-xs">{getActorRole(actor.name)}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${actor.status === 'ACTIVE' ? 'bg-[#287A33]/20 text-[#8ED5B4]' : 'bg-[#D32F2F]/20 text-[#D32F2F]'}`}>
                          {actor.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs" title={actor.public_key}>
                        {actor.public_key.substring(0, 12)}...{actor.public_key.substring(actor.public_key.length - 8)}
                      </td>
                      <td className="px-4 py-3 text-right">{actor.asset_count || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#1A1C1E] p-6 rounded-lg shadow-elevation-1 border border-[#607D8B]/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-white flex items-center gap-2">
                Registered Assets
                <span className="text-[10px] uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded">
                  {DemoScenario.demoDataLabel}
                </span>
              </h3>
              <div className="flex gap-2">
                <a href={`?assetPage=${Math.max(1, assetPage - 1)}${q ? `&q=${q}` : ''}${actorPage > 1 ? `&actorPage=${actorPage}` : ''}`} className="text-xs px-2 py-1 bg-[#607D8B]/20 rounded text-white hover:bg-[#607D8B]/40">Prev</a>
                <span className="text-xs text-[#607D8B] py-1">Page {assetPage}</span>
                <a href={`?assetPage=${assetPage + 1}${q ? `&q=${q}` : ''}${actorPage > 1 ? `&actorPage=${actorPage}` : ''}`} className="text-xs px-2 py-1 bg-[#607D8B]/20 rounded text-white hover:bg-[#607D8B]/40">Next</a>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#607D8B]">
                <thead className="text-xs uppercase bg-[#1A1C1E] border-b border-[#607D8B]/30 text-white">
                  <tr>
                    <th className="px-4 py-3 font-medium">ID</th>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Owner</th>
                    <th className="px-4 py-3 font-medium">Created</th>
                    <th className="px-4 py-3 font-medium text-right">Events</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-4 text-center">No assets registered.</td>
                    </tr>
                  ) : assets.map((asset) => (
                    <tr key={asset.id} className="border-b border-[#607D8B]/10 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs">{asset.id}</td>
                      <td className="px-4 py-3 font-medium text-white">{asset.name}</td>
                      <td className="px-4 py-3">{asset.owner_name}</td>
                      <td className="px-4 py-3 text-xs">
                        {new Date(asset.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <a href={`/dashboard/events?q=${asset.id}`} className="text-[#8ED5B4] hover:underline text-xs">
                          View Events &rarr;
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
