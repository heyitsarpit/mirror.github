// base is milliseconds
const second = 1000
const minute = 60 * second
const hour = 60 * minute
const day = 24 * hour
const week = 7 * day
const month = 4 * week
const year = 12 * month

type RelativeTimeFormatUnit =
  | 'year'
  | 'years'
  | 'quarter'
  | 'quarters'
  | 'month'
  | 'months'
  | 'week'
  | 'weeks'
  | 'day'
  | 'days'
  | 'hour'
  | 'hours'
  | 'minute'
  | 'minutes'
  | 'second'
  | 'seconds'

export const getRelativeTime = (timeStamp: number) => {
  try {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
    const currentTime = Date.now()
    let distance = Math.abs(timeStamp - currentTime)

    let keyWord: RelativeTimeFormatUnit
    if (distance < second) {
      return 'A few moments ago'
    } else if (distance > second && distance < minute) {
      keyWord = 'second'
      distance /= second
    } else if (distance > minute && distance < hour) {
      keyWord = 'minute'
      distance /= minute
    } else if (distance > hour && distance < day) {
      keyWord = 'hour'
      distance /= hour
    } else if (distance > day && distance < week) {
      keyWord = 'day'
      distance /= day
    } else if (distance > week && distance < month) {
      keyWord = 'week'
      distance /= week
    } else if (distance > month && distance < year) {
      keyWord = 'month'
      distance /= month
    } else {
      keyWord = 'year'
      distance /= year
    }

    distance = Math.round(distance)

    return rtf.format(-1 * distance, keyWord)
  } catch {
    return timeStamp
  }
}
