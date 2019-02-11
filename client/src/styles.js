import { createGlobalStyle } from "styled-components";

export const ItupferlGlobalStyle = createGlobalStyle`
  body {
    padding: 400px 0 20px;
  }

  .stepper {
    position: sticky;
    border: 1px solid #E0E5F2;
    margin-top: 15px;
    max-width: 1140px;
  }

  .centered-container {
    padding: 0;
  }
`;

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700|PT+Serif:400i');

  html {
    background-color: #201c61 !important;
    height: 100%;
  }

  body {
    min-height: 100%;
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 600 !important;
    background-image: linear-gradient(${p => p.inverted ? '90deg' : '-225deg'}, ${p => p.inverted ? p.theme.secondary : p.theme.fadedLightblue}, ${p => p.inverted ? p.theme.primary : p.theme.lightblue}) !important;
    color: ${p => p.theme.secondaryText} !important;
    -webkit-font-smoothing: antialiased !important; /* This needs to be set or some font faced fonts look bold on Mac in Chrome/Webkit based browsers. */
    -moz-osx-font-smoothing: grayscale !important; /* Fixes font bold issue in Firefox version 25+ on Mac */
  }

  .notification-bar {
    z-index: 5;
    bottom: 100px !important;
    opacity: 0;
  }
  .notification-bar-active {
    opacity: 1;
  }

  .sv_q_matrix td {
    min-width: 7em !important;
    line-height: 18px;

    &:not(:first-child) {
      text-align: center !important;
    }
    &:not(:first-child):hover {
      background-color: white;
    }

    @media (max-width: 600px) {
      &:not(:first-child) {
        text-align: left !important;
      }
      line-height: inherit !important;
    }
  }
  .sv_q_matrix tr {
    height: 57px !important;
    border-bottom: 1px solid #E9EAEE !important;

    &:not(:only-child):hover {
      background-color: #FFFFFF73;

      & td {
        color: ${p => p.theme.primary} !important;
      }
    }

    &:last-child {
      border: none !important;
    }

    @media (max-width: 600px) {
      height: inherit !important;
    }
  }
  .sv_p_root table th {
    min-width: 7em !important;
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 700 !important;
    text-align: center !important;
  }
  .sv_p_root table td {
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 600 !important;
    color: ${p => p.theme.primaryText} !important;
  }
  .sv_complete_btn {
    &&& {
      background: ${p => p.theme.primary};
      float: inherit !important;
      color: white;
      font-size: 13px;
      padding: 13px 50px;
      border-radius: 5px;
      display: block;
      transition: all 200ms ease-in-out;
      font-weight: 700;
    }
  }
  .sv_complete_btn:hover {
    &&& {
      background: ${p => p.theme.secondary};
    }
  }
  .sv_nav {
    &&& {
      padding: 0 !important;
    }
  }
  .sv_q_erbox {
    &&&&& {
      margin-bottom: 3px !important;
      background: ${p => p.theme.red}4D;
      color: ${p => p.theme.darkRed};
      border-radius: 4px;
      border: none;
      font-weight: 700;
    }
  }
  .sv_completed_page {
    &&&&& {
      padding: 25px !important;
    }
  }

  .sv_completed_page > span#title {
    font-family: 'Montserrat', sans-serif !important;
    color: ${p => p.theme.primary};
    font-size: 15px;
    font-weight: 700;
    display: block;
    margin-bottom: 10px;
  }
  .sv_completed_page > span#subtitle {
    font-family: 'Montserrat', sans-serif !important;
    color: ${p => p.theme.secondaryText};
    font-size: 14px;
    font-weight: 600;
    display: block;
    margin: auto;
    max-width: 900px;
  }
  .sv_main {
    &&& {
      color: ${p => p.theme.primaryText};
      text-align: left;
      border: none;
      border-radius: 10px;
      margin-bottom: 7px;
    }
  }
  .sv_body {
    &&& {
      border-radius: 10px;
      border: none;
      padding-bottom: 14px !important;
    }
  }
  .sv_custom_header {
    &&& {
      background-color: transparent;
    }
  }
  .sv_row {
    &&&&& {
      border: none;
      background-color: white;
    }
  }
  .sv_qstn {
    &&& {
      margin-bottom: 14px;
      padding: 7px 14px !important;
      border: none;
      border-radius: 4px;
      background-color: ${p => p.theme.fadedLightblue};
    }
  }
  .sv_q_title {
    &&& {
      font-family: 'Montserrat', sans-serif !important;
      color: ${p => p.theme.primaryText} !important;
      font-weight: 700 !important;
    }
  }
  .sv_qcbc {
    &&& {
      font-family: 'Montserrat', sans-serif !important;
      font-weight: 600 !important;
    }
  }
`;

const themeColors = {
  primary: "#2E71F0",
  secondary: "#5D26CF",
  primaryText: "#3C3D41",
  secondaryText: "#6B7476",
  green: "#88D68F",
  darkGreen: "#62BE6A",
  fadedGreen: "#62BE6A8C",
  red: "#F17B7B",
  darkRed: "#DF7070",
  fadedRed: "#DF70708C",
  lightblue: "#EFF1F7",
  fadedLightblue: "#F6F7FA",
  midnightBlue: "#4F5159",
}

export const theme = {
  ...themeColors,

  checkbox: {
    normal: {
      checked: {
        background: themeColors.green,
        border: themeColors.green,
      },
      unchecked: {
        background: '#FAFAFC',
        border: '#E3E6F1',
      }
    },
    hover: {
      checked: {
        background: themeColors.green,
        border: themeColors.darkGreen,
      },
      unchecked: {
        background: '#FAFAFC',
        border: themeColors.green,
      }
    }
  },
  
  feedbackButton: {
    like: {
      normal: {
        active: {
          background: themeColors.darkGreen,
          foreground: "#FFFFFF"
        },
        inactive: {
          background: "#F2F4FA",
          foreground: themeColors.darkGreen
        },
        faded: {
          background: "#F2F4FA",
          foreground: themeColors.fadedGreen
        }
      },
      hover: {
        active: {
          background: themeColors.green,
          foreground: "#FFFFFF"
        },
        inactive: {
          background: "#E5E9F5",
          foreground: themeColors.darkGreen
        },
        faded: {
          background: "#E5E9F5",
          foreground: themeColors.fadedGreen
        }
      }
    },
    dislike: {
      normal: {
        active: {
          background: themeColors.darkRed,
          foreground: "#FFFFFF"
        },
        inactive: {
          background: "#F2F4FA",
          foreground: themeColors.darkRed
        },
        faded: {
          background: "#F2F4FA",
          foreground: themeColors.fadedRed
        }
      },
      hover: {
        active: {
          background: themeColors.red,
          foreground: "#FFFFFF"
        },
        inactive: {
          background: "#E5E9F5",
          foreground: themeColors.darkRed
        },
        faded: {
          background: "#E5E9F5",
          foreground: themeColors.fadedRed
        }
      }
    }
  },
  
  step: {
    active: {
      background: `linear-gradient(-225deg, ${themeColors.secondary}, ${themeColors.primary}) no-repeat;`,
      text: themeColors.secondaryText
    },
    inactive: {
      background: `linear-gradient(-225deg, ${themeColors.lightblue}, ${themeColors.fadedLightblue}) no-repeat;`,
      text: `${themeColors.secondaryText}80`
    },
    finished: {
      background: `linear-gradient(-225deg, ${themeColors.darkGreen}, ${themeColors.green}) no-repeat;`,
      text: themeColors.secondaryText
    }
  }
};
