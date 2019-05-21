import { createGlobalStyle } from 'styled-components'
import { reset } from 'styled-reset'
import { color, fontStyles, fontSizing } from './theme'

const GlobalStyle = createGlobalStyle`
${reset}
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,600i,700,700i,900|Roboto:400,500,700');
@import url('https://fonts.googleapis.com/css?family=Bangers');
@import url('https://fonts.googleapis.com/css?family=Fresca');
@import url('https://use.fontawesome.com/releases/v5.0.13/css/all.css');

* {
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body * {
  font-family: ${fontStyles.defaultFont};
}

body {
  color: ${color.darkText};
  // background: ${color.primaryBgShading};
  font-family: ${fontStyles.defaultFont}  
}

h1, h2, h3, h4, h5 {
  font-family: ${fontStyles.headingFont};
  font-weight: bold;  
}

p {
  font-size: ${fontSizing.xs};
  line-height: 1.4;
}

img {
    width: 100%;
    height: auto;
}


code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

a.activeSelection {
  color: ${color.secondaryBgShading};
}

`

export default GlobalStyle
