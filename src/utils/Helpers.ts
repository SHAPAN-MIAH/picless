import * as Moment from 'moment'

const dateFormat = 'DD/MM/YYYY HH:mm:ss'

export const unixTimestampToDate = (unixTimestamp: number): string => {
  return Moment.unix(unixTimestamp).format(dateFormat)
}

export const dateToUnixTimestamp = (date: string): string => {
  return date
}
