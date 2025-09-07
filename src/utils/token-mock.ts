// src/utils/token-mock.ts
import CryptoJS from 'crypto-js'

/* ========================= 类型定义 ========================= */
/** 模拟 JWT 载荷结构 */
export interface MockPayload {
  sub: string // 用户唯一标识
  name: string // 用户名
  role: string // 角色
  exp: number // 过期时间（Unix 秒）
  type?: 'access' | 'refresh' // 令牌类型（可选）
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

/* ========================= 公共逻辑 ========================= */
/**
 * 创建 JWT 字符串（Header.Payload.Signature）
 * @param payload  载荷对象
 * @param secret   签名密钥
 */
function createJWT(payload: MockPayload, secret: string): string {
  const header = { alg: 'HS256', typ: 'JWT' }
  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedPayload = base64UrlEncode(JSON.stringify(payload))
  const signature = CryptoJS.HmacSHA256(`${encodedHeader}.${encodedPayload}`, secret).toString(
    CryptoJS.enc.Base64url,
  )
  return `${encodedHeader}.${encodedPayload}.${signature}`
}

/**
 * 验证并解析 JWT
 * @param token  原始 JWT 字符串
 * @param secret 签名密钥（根据 type 选择）
 */
function verifyJWT(token: string, secret: string): MockPayload | null {
  const parts = token.split('.')
  if (parts.length !== 3) return null
  try {
    const payload = JSON.parse(base64UrlDecode(parts[1])) as MockPayload
    // 过期检查
    if (payload.exp && payload.exp < nowSeconds()) return null
    // 签名校验
    const rebuiltSign = CryptoJS.HmacSHA256(`${parts[0]}.${parts[1]}`, secret).toString(
      CryptoJS.enc.Base64url,
    )
    return rebuiltSign === parts[2] ? payload : null
  } catch {
    return null
  }
}

/* ========================= 业务函数 ========================= */
/** 生成 accessToken（默认 1 小时） */
export function generateMockToken(
  payload: Omit<MockPayload, 'exp' | 'type'> & { exp?: number },
): string {
  const body: MockPayload = {
    sub: payload.sub ?? 'anonymous',
    name: payload.name ?? 'guest',
    role: payload.role ?? 'user',
    type: 'access',
    exp: payload.exp ?? nowSeconds() + 3600,
    ...payload, // 允许覆盖/扩展
  }
  return createJWT(body, SECRET_ACCESS)
}

/** 生成 refreshToken（默认 7 天） */
export function generateMockRefreshToken(
  payload: Pick<MockPayload, 'sub'> & Partial<Omit<MockPayload, 'sub' | 'exp' | 'type'>>,
): string {
  const body: MockPayload = {
    // 1. 先把默认值写全
    name: 'guest',
    role: 'user',
    type: 'refresh',
    exp: nowSeconds() + 3600 * 24 * 7,
    ...payload,
  }
  return createJWT(body, SECRET_REFRESH)
}

/** 统一解析入口（自动根据 type 选密钥） */
export function parseMockToken(token: string): MockPayload | null {
  // 先轻量解析出 payload 拿 type
  const parts = token.split('.')
  if (parts.length !== 3) return null
  try {
    const payload = JSON.parse(base64UrlDecode(parts[1])) as MockPayload
    const secret = payload.type === 'refresh' ? SECRET_REFRESH : SECRET_ACCESS
    // 重新验签
    return verifyJWT(token, secret)
  } catch {
    return null
  }
}
