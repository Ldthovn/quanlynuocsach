import moment from 'moment'

const date_utils = {

  current: () => {
    return new Date
  },

  toBeginDay: (d) => {
    d = new Date(d)
    d.setHours(0, 0, 0, 0)
    return d
  },

  weekRange: (d) => {
    d = new Date(d)
    let day = d.getDay(), diff = d.getDate() - day + (day === 0 ? -6 : 1)
    let monday = new Date(d.setDate(diff))

    let days = []
    let i
    for (i = 0; i < 7; i++) {
      let day = moment(monday).add(i, 'days')
      days.push(date_utils.toBeginDay(day))
    }

    return days
  },

}

export default date_utils