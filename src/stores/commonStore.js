import { action, observable } from 'mobx'

class CommonStore {

  /** App theme */
  @observable appTheme = {
    name: 'blue',
    solidDarkColor: 'rgb(44, 101, 172)',
    solidColor: 'rgb(205, 218, 244)',
    solidLightColor: 'rgb(228, 234, 242)',
    gradientColor: 'linear-gradient(108.88deg, #4481EB 0%, #2d65ac 100%)',
    shadowColor: '0 2px 10px rgba(68, 129, 235, 0.5)',
    lightShadowColor: '0 2px 4px rgba(61, 147, 190, 0.24), 0 4px 8px rgba(61, 153, 190, 0.16)',
  }
  @action setTheme = color => {
    switch (color) {
      case 'pink':
        this.appTheme = {
          name: 'pink',
          solidDarkColor: 'rgb(244, 67, 54)',
          solidLightColor: 'rgb(254, 237, 235)',
          gradientColor: 'linear-gradient(108.84deg, #F77062 0%, #FE5196 100%)',
          shadowColor: '0 2px 10px rgba(254, 81, 150, 0.5)',
          lightShadowColor: '0 2px 4px rgba(190, 61, 97, 0.24), 0 4px 8px rgba(190, 61, 61, 0.16)',
        }
        return
      case 'green':
        this.appTheme = {
          name: 'green',
          solidDarkColor: '#3DBEA3',
          solidLightColor: '#ecf9f6',
          gradientColor: 'linear-gradient(167.51deg, #2ECF94 24.37%, #3DBEA3 78.07%)',
          shadowColor: '0 2px 10px rgba(46,207,148,0.6)',
          lightShadowColor: '0 2px 4px rgba(61, 190, 163, 0.24), 0 4px 8px rgba(61, 190, 163, 0.16)',
        }
        return
      case 'violet':
        this.appTheme = {
          name: 'violet',
          solidDarkColor: 'rgb(229,46,113)',
          solidLightColor: 'rgba(229,46,113, .2)',
          gradientColor: 'linear-gradient(to top left,#ff8a00,#e52e71)',
          shadowColor: '0px 2px 10px rgba(229,46,113, 0.5)',
          lightShadowColor: '0 2px 4px rgba(190, 61, 97, 0.24), 0 4px 8px rgba(190, 61, 61, 0.16)',
        }
        return
      case 'black':
        this.appTheme = {
          name: 'black',
          solidDarkColor: 'rgb(70, 70, 70)',
          solidLightColor: 'rgb(200, 200, 200)',
          gradientColor: 'linear-gradient(108.88deg, rgb(121, 121, 121) 0%, rgb(70, 70, 70) 100%)',
          shadowColor: '0px 2px 10px rgba(70, 70, 70, 0.5)',
          lightShadowColor: '0 2px 4px rgba(0, 0, 0, 0.22), 0 4px 8px rgba(0, 0, 0, 0.04)',
        }
        return
      default:
        this.appTheme = {
          name: 'blue',
          solidDarkColor: 'rgb(44, 101, 172)',
          solidColor: 'rgb(205, 218, 244)',
          solidLightColor: 'rgb(228, 234, 242)',
          gradientColor: 'linear-gradient(108.88deg, #4481EB 0%, #2d65ac 100%)',
          shadowColor: '0 2px 10px rgba(68, 129, 235, 0.5)',
          lightShadowColor: '0 2px 4px rgba(61, 147, 190, 0.24), 0 4px 8px rgba(61, 153, 190, 0.16)',
        }
    }
  }

  /** Sidebar */
  @observable compactSidebar = false
  @action toggleSidebar = state => {
    this.compactSidebar = state
  }

  /** Mouse coordinate */
  @observable mouseCoordinate = {
    x: 0,
    y: 0,
  }

  @action setMouseCoordinate(x, y) {
    this.mouseCoordinate = { x: x, y: y }
  }

  /** Pagename */
  @observable pageName = ['']
  @action setPageName = pageName => {
    if (!Array.isArray(pageName)) return
    this.pageName = pageName
  }

  /** Responsive */
  @observable isTablet = false
  @observable isMobile = false
  @observable isDesktop = false
  @action checkIsDesktop = state => {
    this.isDesktop = state
  }
  @action checkIsTablet = state => {
    this.isTablet = state
  }
  @action checkIsMobile = state => {
    this.isMobile = state
  }

  /** Toggle Modal*/
  @observable isEditMode = false
  @action setIsEditMode = (mode) => {
    this.isEditMode = mode
  }
}

export default new CommonStore()
