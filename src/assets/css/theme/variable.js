import base from './base.less';

// 字体变量
const baseSize = {
    "--font-size-large-x": "22px",
    "--font-size-large": "18px",
    "--font-size-medium": "14px",
    "--font-size-medium-x": "16px",
    "--font-size-small-s": "10px",
    "--font-size-small": "12px",
  };  

  //浅色
  export const lightTheme = {
    '--sider-bg': base.c_fff,
    '--sider-tit': base.main_color,  
    '--sider-bar-item': base.main_color_light,
    '--main-f-color': base.c_121212,
    '--switch-theme': base.main_color,
    '--content-bg': base.gray_white,
    '--fotter-bg': base.gray_white,


    "--fill-1": "#fff",
    "--text": "#3c3c3c",
    "--text-1": "#757575",
    "--text-2": "#f00",
    ...baseSize,
  };
  
  // 深色
  export const darkTheme = {
    '--sider-bg': base.c_121212,  
    '--sider-tit': base.c_fff,  
    '--sider-bar-item': base.main_color,
    '--main-f-color': base.c_fff,
    '--switch-theme': 'rgba(255,255,255,.2)',
    '--content-bg': base.light_dark,
    '--fotter-bg': base.c_121212,
    
    

    "--fill-1": "#222",
    "--text": "#fff",
    "--text-1": "rgba(255, 255, 255, 0.3)",
    "--text-2": "#ffcd32",
    ...baseSize,
  };