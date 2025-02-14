export const settings = {
  edge_config_id: process.env.EDGE_CONFIG_ID,
  vercel_team_id: process.env.VERCEL_TEAM_ID,
  vercel_api_token: process.env.VERCEL_API_TOKEN,
}

const baseVercelUrl = `https://vercel.com/api/v1/edge-config/${settings.edge_config_id}`

export const vercelApiUrl = `${baseVercelUrl}/items?teamId=${settings.vercel_team_id}`
