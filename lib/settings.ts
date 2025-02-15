const edgeConfigId = process.env.EDGE_CONFIG_ID
const vercelTeamId = process.env.VERCEL_TEAM_ID
const vercelApiToken = process.env.VERCEL_API_TOKEN
const secretKey = process.env.SECRET_KEY

if (!edgeConfigId || !vercelTeamId || !vercelApiToken || !secretKey) {
  throw new Error("Missing environment variables")
}

export const settings = {
  edge_config_id: edgeConfigId,
  vercel_team_id: vercelTeamId,
  vercel_api_token: vercelApiToken,
  secret_key: secretKey,
} as const

const baseVercelUrl = `https://vercel.com/api/v1/edge-config/${settings.edge_config_id}`

export const vercelApiUrl = `${baseVercelUrl}/items?teamId=${settings.vercel_team_id}`
