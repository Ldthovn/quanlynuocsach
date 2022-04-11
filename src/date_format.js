import moment from 'moment'

const defaultMoment = (d, format) => moment(d).format(format)

const date_format = {
  DD__MM: d => defaultMoment(d, 'DD-MM'),
  YYYY__MM__DD: d => defaultMoment(d, 'YYYY-MM-DD'),
  DD_MM_YYYY: d => defaultMoment(d, 'DD-MM-YYYY'),
}

export default date_format
