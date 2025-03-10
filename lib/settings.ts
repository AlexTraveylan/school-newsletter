const edgeConfigId = process.env.EDGE_CONFIG_ID
const vercelTeamId = process.env.VERCEL_TEAM_ID
const vercelApiToken = process.env.VERCEL_API_TOKEN
const secretKey = process.env.SECRET_KEY
const jwtSecretKey = process.env.JWT_SECRET_KEY

if (!edgeConfigId || !vercelTeamId || !vercelApiToken || !secretKey || !jwtSecretKey) {
  throw new Error("Missing environment variables")
}

if (secretKey.length !== 32) {
  throw new Error("The secret key must be 32 characters long")
}

export const settings = {
  edge_config_id: edgeConfigId,
  vercel_team_id: vercelTeamId,
  vercel_api_token: vercelApiToken,
  secret_key: secretKey,
  jwt_secret_key: jwtSecretKey,
} as const

const baseVercelUrl = `https://vercel.com/api/v1/edge-config/${settings.edge_config_id}`

export const vercelApiUrl = `${baseVercelUrl}/items?teamId=${settings.vercel_team_id}`
