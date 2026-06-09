export type RecurrenceFrequency =
  | 'secondly'
  | 'minutely'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'

import type { Category, AutoCategoryRule } from './categories'

export type AttendeePartstat = 'ACCEPTED' | 'DECLINED' | 'TENTATIVE' | 'NEEDS-ACTION' | 'DELEGATED'

export interface CalendarAttendee {
  email: string
  name?: string
  role?: string
  partstat?: AttendeePartstat
  rsvp?: boolean
}

export interface CalendarOrganizer {
  email: string
  name?: string
}

export interface RecurrenceRule {
  frequency: RecurrenceFrequency
  interval: number
  endDate?: string
  count?: number
  byWeekday?: number[]
  byMonthDay?: number[]
  byMonth?: number[]
  bySetPos?: number[]
}

export interface Reminder {
  id: string
  minutesBefore: number
  method: 'popup'
}

export type EventType = 'event' | 'task' | 'journal'
export type SyncStatus = 'synced' | 'pending' | 'failed'
export type TaskPriority = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface CalendarAttachment {
  href: string // URL or data URI for inline attachments
  contentType: string // MIME type
  size?: number // bytes
  filename?: string // display name
}

export interface BrokenEvent {
  event: CalendarEvent
  reason: string
  detectedAt: string
}

export interface CalendarEvent {
  id: string
  calendarId: string
  title: string
  description?: string
  location?: string
  start: string
  end: string
  isAllDay: boolean
  color?: string
  categories?: string[]
  recurrence?: RecurrenceRule
  reminders?: Reminder[]
  rruleString?: string
  travelDuration?: number
  type?: EventType
  dueDate?: string
  completed?: boolean
  priority?: TaskPriority
  percentComplete?: number
  transparency?: 'opaque' | 'transparent'
  sequence?: number
  etag?: string
  excludedDates?: string[]
  recurrenceId?: string
  isFragment?: boolean
  isFirstFragment?: boolean
  isLastFragment?: boolean
  originalStart?: string
  originalEnd?: string
  syncStatus?: SyncStatus
  attachments?: CalendarAttachment[]
  url?: string
  relatedTo?: string[]
  created?: string
  lastModified?: string
}

export interface Calendar {
  id: string
  name: string
  color: string
  isVisible: boolean
  isDefault: boolean
  accountId?: string
  showTasksInViews: boolean
}

export type ViewType = 'month' | 'week' | 'day' | 'agenda' | 'todo' | 'journal' | 'contacts'

export interface CalendarState {
  events: CalendarEvent[]
  brokenEvents: BrokenEvent[]
  calendars: Calendar[]
  categories: Category[]
  autoCategoryRules: AutoCategoryRule[]
  selectedCategoryIds: string[]
  currentDate: string
  currentView: ViewType
  selectedEventId: string | null
  isModalOpen: boolean
  selectedDate: string | null
  selectedEndDate: string | null
  isOverlayOpen: boolean
  selectedEventType: EventType
  showAddCalendar: boolean
  previewEventId: string | null
  previewPosition: { x: number; y: number } | null
  isJournalModalOpen: boolean
  journalModalDate: string | null
  journalStartInCompose: boolean
}

export interface CalendarActions {
  addEvent: (event: CalendarEvent) => void
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void
  deleteEvent: (id: string) => void
  addBrokenEvent: (event: CalendarEvent, reason: string) => void
  removeBrokenEvent: (eventId: string) => void
  fixBrokenEvent: (eventId: string) => void
  duplicateEvent: (id: string) => string | null
  addCalendar: (calendar: Calendar) => void
  updateCalendar: (id: string, updates: Partial<Calendar>) => void
  deleteCalendar: (id: string) => void
  toggleCalendarVisibility: (id: string) => void
  setDefaultCalendar: (id: string) => void
  addCategory: (category: Category) => void
  updateCategory: (id: string, updates: Partial<Category>) => void
  deleteCategory: (id: string) => void
  addAutoCategoryRule: (rule: AutoCategoryRule) => void
  updateAutoCategoryRule: (id: string, updates: Partial<AutoCategoryRule>) => void
  deleteAutoCategoryRule: (id: string) => void
  toggleCategoryFilter: (categoryId: string) => void
  setCurrentDate: (date: string) => void
  setCurrentView: (view: ViewType) => void
  setSelectedEventId: (id: string | null) => void
  openModal: (date?: string, endDate?: string, eventId?: string, mode?: EventType) => void
  closeModal: () => void
  setOverlayOpen: (isOpen: boolean) => void
  setShowAddCalendar: (show: boolean) => void
  openPreview: (eventId: string, position: { x: number; y: number }) => void
  closePreview: () => void
  openJournalModal: (date: string, startInCompose?: boolean) => void
  closeJournalModal: () => void
  getEventsForDateRange: (start: string, end: string) => CalendarEvent[]
  getVisibleEvents: () => CalendarEvent[]
}

export type CalendarStore = CalendarState & CalendarActions

export type DateFormat = 'MM/dd/yyyy' | 'dd/MM/yyyy' | 'yyyy-MM-dd'
export type TimeFormat = '12h' | '24h'
export type FirstDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6
export type EventDensity = 'comfortable' | 'compact'
export type DefaultDuration = 15 | 30 | 60 | 90 | 120
export type ThemeMode = 'light' | 'dark' | 'auto'

export interface UserSettings {
  timezone: string
  dateFormat: DateFormat
  timeFormat: TimeFormat
  firstDayOfWeek: FirstDayOfWeek
  defaultDuration: DefaultDuration
  defaultView: ViewType
  showWeekNumbers: boolean
  eventDensity: EventDensity
  defaultReminderMinutes: number
  defaultEventColor: string
  enableDesktopNotifications: boolean
  enableSoundAlerts: boolean
  syncEnabled: boolean
  syncIntervalMinutes: number
  conflictResolution: 'server-wins' | 'local-wins' | 'ask'
  compactRecurringEvents: boolean
  compressPastWeeks: boolean
  monthViewEventLimit: number
  hasCompletedOnboarding: boolean
  themeMode: ThemeMode
  lightTheme: string
  darkTheme: string
  caldavDebugMode: boolean
  hideCompletedTasksInMonthView: boolean
  useCategoryColors: boolean
  sidebarWidth: number
  sidebarCollapsed: boolean
  journalEnabled: boolean
  contactsEnabled: boolean
}

export type SettingsState = UserSettings

export interface SettingsActions {
  updateSettings: (updates: Partial<UserSettings>) => void
  resetSettings: () => void
}

export type SettingsStore = SettingsState & SettingsActions
