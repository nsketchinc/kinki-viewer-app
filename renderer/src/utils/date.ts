import { DateTime } from 'luxon'

export const formatDate = (__date: string) => {
  const date = DateTime.fromISO(__date)
  const date_str = date.toFormat('yyyy/MM/dd hh:mm')
  return date_str
}

export const getMonthDate = (__date: string) => {
  const date = DateTime.fromISO(__date)
  const date_str = date.toFormat('MM/dd')
  return date_str
}

export const getUnixTime = (__date: string) => {
  const date = DateTime.fromISO(__date)
  const unix: string = date.toMillis().toString()
  return unix
}
