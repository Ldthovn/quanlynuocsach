import React from 'react'

/** App util */

const utils = {

  /** Add commas for separate thousand in number */
  thousandSeparator: num => {
    // let parts = num.toString().split('.')
    // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    // return parts.join(',')
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },

  nonAccentVietnamese: (str) => {
    if (typeof str !== 'string') return
    str = str.toLowerCase().trim()
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    str = str.replace(/đ/g, 'd')
    // Một số hệ thống mã hóa tiếng Việt kết hợp dấu thành các ký tự utf-8 riêng lẻ
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, '') // Â, Ê, Ă, Ơ, Ư
    return str
  },

  /** get extension file*/
  getExtensionFile: (file_name) => {
    if (!file_name) return ''
    return file_name.toLowerCase().split('.').pop()
  },

  /** Compare time, return -1 for sooner, 0 for equal, 1 for later */
  compareTime: (DateA, DateB) => {
    let a = new Date(DateA)
    let b = new Date(DateB)
    let msDateA = Date.UTC(a.getFullYear(), a.getMonth() + 1, a.getDate())
    let msDateB = Date.UTC(b.getFullYear(), b.getMonth() + 1, b.getDate())
    if (parseFloat(msDateA) < parseFloat(msDateB))
      return -1  // lt
    else if (parseFloat(msDateA) === parseFloat(msDateB))
      return 0  // eq
    else if (parseFloat(msDateA) > parseFloat(msDateB))
      return 1  // gt
    else
      return null // error
  },

  removeVietnameseCharMark: str => {
    if (str) {
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      str = str.replace(/đ/g, 'd')
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
      str = str.replace(/Đ/g, 'D')
      return str
    }
    return str
  },

  /** Decode JWT token */
  jwtDecode: token => {
    let base64Url = token.split('.')[1]
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    return JSON.parse(jsonPayload)
  },

  /** Filter unique object in array */
  getUnique: (arr, comp) => {
    return arr.map(e => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((e) => arr[e]).map(e => arr[e])
  },

  /** Get gender name */
  getGenderName: gender => {
    let genderName = ''
    switch (gender) {
      case 0:
        genderName = 'Nữ'
        break
      case 1:
        genderName = 'Nam'
        break
      case 2:
        genderName = 'Khác'
        break
      default:
        genderName = undefined
        break
    }
    return genderName
  },

  urlify(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    return text.replace(urlRegex, function(url) {
      return '<a href="' + url + '" target="_blank">' + url + '</a>'
    })
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
  },

  /** Render weekday name */
  renderWeekday: day => {
    switch (day) {
      case 1:
        return 'Thứ hai'
      case 2:
        return 'Thứ ba'
      case 3:
        return 'Thứ tư'
      case 4:
        return 'Thứ năm'
      case 5:
        return 'Thứ sáu'
      case 6:
        return 'Thứ bảy'
      default:
        return 'Chủ nhật'
    }
  },

  /** Check nullish */
  isNullish: value => {
    return value === undefined || value === null || value === ''
  },

  /** Capitalize name */
  getNameInCapitalize: string => {
    if (!string) return ''
    return string.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())
  },

  isIOSDevice: () => {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod',
      ].includes(navigator.platform)
      // iPad on iOS 13 detection
      || (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  },

  /** remove html */
  removeHtml: string => {
    if (!string) return ''
    return string.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, '')
  },

  /** Get date range between 2 dates
   * Input values should be in string format (YYYY-MM-DD)
   * */
  getDateRange: date => {
    if (typeof date !== 'string') {
      throw new Error('Input date should be a string in format YYYY-MM-DD')
    }
    let d1 = new Date(date)
    let d2 = new Date()
    let diff = d1.getTime() - d2.getTime()
    return diff / (1000 * 3600 * 24)
  },

  /** Return the date range from week number and year
   * For example: Input weekNo = 3, year = 2020 will return 2020-01-13 and 2020-01-19
   * Remember to use moment('YYYY-MM-DD').isoWeekYear()
   * */
  getDateRangeOfWeek: (weekNo, yearNo) => {
    if (!(Number.isInteger(weekNo) && Number.isInteger(yearNo) && weekNo >= 1 && yearNo >= 1970)) return false
    Date.prototype.getWeek = function() {
      let date = new Date(this.getTime())
      date.setHours(0, 0, 0, 0)
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7)
      let week1 = new Date(date.getFullYear(), 0, 4)
      return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
    }
    let d1, numOfdaysPastSinceLastMonday, month, date
    let rangeIsFrom, rangeIsTo
    d1 = new Date('' + yearNo + '')
    numOfdaysPastSinceLastMonday = d1.getDay() - 1
    d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday)
    d1.setDate(d1.getDate() + (7 * (weekNo - d1.getWeek())))
    month = d1.getMonth() + 1 < 10 ? `0${d1.getMonth() + 1}` : d1.getMonth() + 1
    date = d1.getDate() < 10 ? `0${d1.getDate()}` : d1.getDate()
    rangeIsFrom = `${d1.getFullYear()}-${month}-${date}`
    d1.setDate(d1.getDate() + 6)
    month = d1.getMonth() + 1 < 10 ? `0${d1.getMonth() + 1}` : d1.getMonth() + 1
    date = d1.getDate() < 10 ? `0${d1.getDate()}` : d1.getDate()
    rangeIsTo = `${d1.getFullYear()}-${month}-${date}`
    return [rangeIsFrom, rangeIsTo]
  },
}

export default utils
