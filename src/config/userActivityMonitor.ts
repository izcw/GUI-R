import { onMounted, onUnmounted } from 'vue'
import { appConfig } from './appConfig'

// 用户活动类型定义
type ActivityType = 'mousemove' | 'keydown' | 'click' | 'scroll' | 'checkActivity'

// 活动日志接口
interface ActivityLog {
  timestamp: number
  type: ActivityType
  message: string
}

// 监听器配置选项
interface ActivityMonitorOptions {
  inactiveTimeout?: number // 超时时间（毫秒）
  checkInterval?: number // 检查间隔（毫秒）
  logEnabled?: boolean // 是否启用日志
  onTimeout?: () => void // 超时回调函数
}

export class UserActivityMonitor {
  // 配置参数
  private inactiveTimeout: number
  private checkInterval: number
  private logEnabled: boolean
  private onTimeout?: () => void

  // 状态跟踪
  private lastActivityTime: number
  private activityLogs: ActivityLog[]
  private checkIntervalId: ReturnType<typeof setInterval> | null
  private isActive: boolean
  private isTimedOut: boolean // 超时状态标志

  constructor(options: ActivityMonitorOptions = {}) {
    // 从应用配置读取默认值
    this.inactiveTimeout = options.inactiveTimeout || appConfig.ACTIVITY_SessionTimeout
    this.checkInterval = options.checkInterval || appConfig.ACTIVITY_CheckInterval
    this.logEnabled = options.logEnabled ?? appConfig.ACTIVITY_logEnabled
    this.onTimeout = options.onTimeout

    // 初始化状态
    this.lastActivityTime = Date.now()
    this.activityLogs = []
    this.checkIntervalId = null
    this.isActive = true
    this.isTimedOut = false // 初始未超时

    // 绑定事件处理器
    this.handleActivity = this.handleActivity.bind(this)
    this.checkActivity = this.checkActivity.bind(this)
  }

  /**
   * 启动活动监听（幂等操作）
   * 支持在超时后重新启动
   */
  public start(): void {
    // 如果已经启动，则不再启动
    if (this.checkIntervalId !== null) {
      this.logActivity('checkActivity', '活动监听已启动（无需重复启动）')
      return
    }

    // 如果已超时，重置超时状态
    if (this.isTimedOut) {
      this.logActivity('checkActivity', '重置超时状态并重新启动')
      this.isTimedOut = false
    }

    // 添加事件监听
    window.addEventListener('mousemove', this.handleActivity)
    window.addEventListener('keydown', this.handleActivity)
    window.addEventListener('click', this.handleActivity)
    window.addEventListener('scroll', this.handleActivity)

    // 启动定时检查
    this.checkIntervalId = setInterval(this.checkActivity, this.checkInterval)

    // 重置活动状态
    this.lastActivityTime = Date.now()
    this.isActive = true

    // 记录启动日志
    this.logActivity('checkActivity', '用户活动监听已启动')
  }

  /**
   * 停止活动监听（幂等操作）
   */
  public stop(): void {
    // 如果已经停止，则不再执行
    if (this.checkIntervalId === null) {
      this.logActivity('checkActivity', '活动监听已停止（无需重复停止）')
      return
    }

    // 移除事件监听
    window.removeEventListener('mousemove', this.handleActivity)
    window.removeEventListener('keydown', this.handleActivity)
    window.removeEventListener('click', this.handleActivity)
    window.removeEventListener('scroll', this.handleActivity)

    // 清除定时器
    clearInterval(this.checkIntervalId)
    this.checkIntervalId = null

    // 记录停止日志
    this.logActivity('checkActivity', '用户活动监听已停止')
  }

  /**
   * 处理用户活动事件
   */
  private handleActivity(event: Event): void {
    if (this.isTimedOut) return // 超时后不再处理活动事件

    this.lastActivityTime = Date.now()
    this.isActive = true

    // 记录活动日志
    const eventType = event.type as ActivityType
    this.logActivity(eventType, `用户活动: ${eventType}`)
  }

  /**
   * 定期检查用户活动状态
   */
  private checkActivity(): void {
    if (this.isTimedOut) return // 超时后不再检查

    const now = Date.now()
    const inactiveDuration = now - this.lastActivityTime // 当前空闲时间

    // 记录检查日志
    this.logActivity(
      'checkActivity',
      `活动检查 | 空闲时间: ${Math.round(inactiveDuration / 1000)}/${Math.round(this.inactiveTimeout / 1000)}秒 | 状态: ${this.isActive ? '活跃' : '空闲'}`,
    )

    // 检测超时
    if (inactiveDuration > this.inactiveTimeout && this.isActive) {
      this.isActive = false
      this.isTimedOut = true // 标记为已超时
      this.logActivity('checkActivity', `用户会话超时 (${this.inactiveTimeout / 1000 / 60}分钟)`)

      // 停止监听
      this.stop()

      // 触发超时回调
      if (this.onTimeout) {
        this.onTimeout()
      } else {
        console.warn('[活动监听] 会话超时警告: 用户长时间无操作')
      }
    }
  }

  /**
   * 记录活动日志
   */
  private logActivity(type: ActivityType, message: string): void {
    if (!this.logEnabled) return // 如果日志禁用，直接返回

    const logEntry: ActivityLog = {
      timestamp: Date.now(),
      type,
      message,
    }

    this.activityLogs.push(logEntry)

    const timeStr = new Date(logEntry.timestamp).toLocaleTimeString()
    console.log(`[活动监听 ${timeStr}] ${logEntry.message}`)
  }

  /**
   * 获取活动日志
   */
  public getActivityLogs(): ActivityLog[] {
    return [...this.activityLogs]
  }

  /**
   * 重置活动计时器（包括超时状态）
   */
  public resetTimer(): void {
    this.lastActivityTime = Date.now()
    this.isActive = true
    this.isTimedOut = false // 重置超时状态
    this.logActivity('checkActivity', '活动计时器已重置')

    // 如果之前已停止，重新启动
    if (!this.checkIntervalId) {
      this.start()
    }
  }

  /**
   * 获取当前活动状态
   */
  public getActivityStatus(): {
    isRunning: boolean
    isActive: boolean
    inactiveDuration: number
    isTimedOut: boolean
    logEnabled: boolean
    inactiveTimeout: number
    checkInterval: number
  } {
    return {
      isRunning: this.checkIntervalId !== null,
      isActive: this.isActive,
      inactiveDuration: Date.now() - this.lastActivityTime,
      isTimedOut: this.isTimedOut,
      logEnabled: this.logEnabled,
      inactiveTimeout: this.inactiveTimeout,
      checkInterval: this.checkInterval,
    }
  }

  /**
   * 动态更新日志设置
   */
  public setLogEnabled(enabled: boolean): void {
    this.logEnabled = enabled
    this.logActivity('checkActivity', `日志设置已更新: ${enabled ? '启用' : '禁用'}`)
  }

  /**
   * 更新超时时间
   */
  public updateInactiveTimeout(timeout: number): void {
    this.inactiveTimeout = timeout
    this.logActivity('checkActivity', `超时时间已更新: ${timeout / 1000}秒`)
  }

  /**
   * 更新检查间隔
   */
  public updateCheckInterval(interval: number): void {
    this.checkInterval = interval
    this.logActivity('checkActivity', `检查间隔已更新: ${interval}毫秒`)

    // 如果正在运行，需要重启定时器
    if (this.checkIntervalId) {
      this.stop()
      this.start()
    }
  }
}

// Vue Composition API 集成
export function useUserActivityMonitor(options?: ActivityMonitorOptions) {
  const monitor = new UserActivityMonitor(options)

  onMounted(() => {
    monitor.start()
  })

  onUnmounted(() => {
    monitor.stop()
  })

  return {
    getActivityLogs: monitor.getActivityLogs.bind(monitor),
    resetTimer: monitor.resetTimer.bind(monitor),
    getActivityStatus: monitor.getActivityStatus.bind(monitor),
    start: monitor.start.bind(monitor),
    stop: monitor.stop.bind(monitor),
    setLogEnabled: monitor.setLogEnabled.bind(monitor),
    updateInactiveTimeout: monitor.updateInactiveTimeout.bind(monitor),
    updateCheckInterval: monitor.updateCheckInterval.bind(monitor),
  }
}
