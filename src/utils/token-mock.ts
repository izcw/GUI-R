/* ========================= 类型定义 ========================= */
/** 模拟 JWT 载荷结构 */
export interface MockPayload {
  ID: string // 用户唯一标识
  Name: string // 用户名
  Role: string // 角色
  Type?: 'access' | 'refresh' // 令牌类型（可选）
  ExpTime: number // 过期时间（Unix 秒）
  [key: string]: any // 允许任意扩展字段
}

/* ========================= 常量 ========================= */
/** 签名密钥：access 与 refresh 分开，降低泄露风险 */
const SECRET_ACCESS = 'demo-access-secret'
const SECRET_REFRESH = 'demo-refresh-secret'

/* ========================= 小工具 ========================= */
/** Base64Url 编码（去掉填充符 +/ → _-） */
function base64UrlEncode(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

/** Base64Url 解码 */
function base64UrlDecode(str: string): string {
  str += '=='.substring(0, (4 - (str.length % 4)) % 4)
  return atob(str.replace(/-/g, '+').replace(/_/g, '/'))
}

/** 当前 Unix 时间戳（秒） */
function nowSeconds(): number {
  return Math.floor(Date.now() / 1000)
}

/** 使用 Web Crypto API 计算 HMAC-SHA256 */
async function hmacSha256(message: string, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message))

  const bytes = new Uint8Array(signature)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

/* ========================= 公共逻辑 ========================= */
/**
 * 创建 JWT 字符串（Header.Payload.Signature）
 * @param payload  载荷对象
 * @param secret   签名密钥
 */
async function createJWT(payload: MockPayload, secret: string): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' }
  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedPayload = base64UrlEncode(JSON.stringify(payload))
  const signature = await hmacSha256(`${encodedHeader}.${encodedPayload}`, secret)
  return `${encodedHeader}.${encodedPayload}.${signature}`
}

/**
 * 验证并解析 JWT
 * @param token  原始 JWT 字符串
 * @param secret 签名密钥（根据 type 选择）
 */
async function verifyJWT(token: string, secret: string): Promise<MockPayload | null> {
  const parts = token.split('.')
  if (parts.length !== 3) return null
  try {
    const payload = JSON.parse(base64UrlDecode(parts[1])) as MockPayload
    // 过期检查
    if (payload.ExpTime && payload.ExpTime < nowSeconds()) return null
    // 签名校验
    const rebuiltSign = await hmacSha256(`${parts[0]}.${parts[1]}`, secret)
    return rebuiltSign === parts[2] ? payload : null
  } catch {
    return null
  }
}

/* ========================= 业务函数 ========================= */
/** 生成访问令牌 accessToken（默认 1 小时） */
export async function generateMockToken(
  payload: Omit<MockPayload, 'ExpTime' | 'Type'> & { ExpTime?: number },
): Promise<string> {
  const body: MockPayload = {
    ID: 'anonymous',
    Name: 'guest',
    Role: 'user',
    Type: 'access',
    ExpTime: payload.ExpTime ?? nowSeconds() + 3600,
    ...payload, // 允许覆盖/扩展
  }
  return createJWT(body, SECRET_ACCESS)
}

/** 生成刷新令牌 refreshToken（默认 7 天） */
export async function generateMockRefreshToken(
  payload: Pick<MockPayload, 'ID'> & Partial<Omit<MockPayload, 'ID' | 'ExpTime' | 'Type'>>,
): Promise<string> {
  const body: MockPayload = {
    Name: 'guest',
    Role: 'user',
    Type: 'refresh',
    ExpTime: nowSeconds() + 3600 * 24 * 7,
    ...payload, // 允许覆盖/扩展
  }
  return createJWT(body, SECRET_REFRESH)
}

/** 统一解析入口（自动根据 type 选密钥） */
export async function parseMockToken(token: string): Promise<MockPayload | null> {
  // 先轻量解析出 payload 拿 type
  const parts = token.split('.')

  if (parts.length !== 3) return null
  try {
    const payload = JSON.parse(base64UrlDecode(parts[1])) as MockPayload

    // 处理 Type 可能未定义的情况
    const tokenType = payload.Type || 'access' // 默认为 access

    const secret = tokenType === 'refresh' ? SECRET_REFRESH : SECRET_ACCESS
    // 重新验签
    return await verifyJWT(token, secret)
  } catch (error) {
    console.error('[Token令牌] 解析令牌出错:', error)
    return null
  }
}
