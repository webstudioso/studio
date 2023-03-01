const config = {
    // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
    // like '/berry-material-react/react/default'
    basename: '',
    defaultPath: 'builder/dashboard/default',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 2,
    outlinedFilled: true,
    theme: 'light', // light, dark
    presetColor: 'theme', // default, theme1, theme2, theme3, theme4, theme5, theme6
    i18n: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    rtlLayout: false,
    firebase: {
        apiKey: 'AIzaSyBernKzdSojh_vWXBHt0aRhf5SC9VLChbM',
        authDomain: 'berry-material-react.firebaseapp.com',
        projectId: 'berry-material-react',
        storageBucket: 'berry-material-react.appspot.com',
        messagingSenderId: '901111229354',
        appId: '1:901111229354:web:a5ae5aa95486297d69d9d3',
        measurementId: 'G-MGJHSL8XW3'
    }
};

export default config;
