// 背景色
export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
}

// Layout 布局
export enum ThemeLayout {
	Vertical = "vertical",
	Horizontal = "horizontal",
	Mini = "mini",
}

// 提供的主题色
export enum ThemeColorPresets {
  Default = 'default',
  Cyan = 'cyan',
  Purple = 'purple',
  Blue = 'blue',
  Orange = 'orange',
  Red = 'red',
}

export enum BasicStatus {
  DISABLE = 0,
  ENABLE = 1,
}

export enum PermissionType {
  CATALOGUE = 0,
  MENU = 1,
  BUTTON = 2,
}

export enum LocalEnum {
  en_US = 'en_US',
  zh_CN = 'zh_CN',
}

export enum StorageEnum {
  UserInfo = 'userInfo',
  UserToken = 'userToken',
  Settings = 'settings',
  I18N = 'i18nextLng',
}

export enum ResultEnum {
  SUCCESS = 0,
  ERROR = -1,
  TIMEOUT = 401,
}
