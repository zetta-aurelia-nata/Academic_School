import { ASSESSMENTS } from '../../features/assessments/assessment.data';

export const CommonTranslationKeys = {
  APP: {
    NAME: 'app.name',
  },
  ACTIONS: {
    SAVE: 'actions.save',
    CANCEL: 'actions.cancel',
    DELETE: 'actions.delete',
    CONFIRM: 'actions.confirm',
    CLOSE: 'actions.close',
  },
  LANGUAGE: {
    LABEL: 'language.label',
    EN: 'language.en',
    FR: 'language.fr',
  },
  LAYOUT: {
    FOOTER: {
      TITLE: 'footer.title',
    },
    HEADER: {
      TOGGLE_SIDEBAR_ARIA: 'header.toggleSidebarAria',
      TITLE: 'header.title',
      USER_AVATAR_ALT: 'header.userAvatarAlt',
      USER_NAME: 'header.userName',
      USER_ROLE: 'header.userRole',
    },
    SIDEBAR: {
      LOGO_TAGLINE: 'sidebar.logoTagline',
      MENU: {
        DASHBOARD: 'sidebar.dashboard',
        ASSESSMENTS: 'sidebar.assessments',
        SUBMENU: {
          LIST: 'submenu.list',
          SCORING: 'submenu.scoring',
          REVIEW: 'submenu.review',
        },
      },
    },
  },
} as const;
