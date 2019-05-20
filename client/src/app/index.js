import React from 'react'

import * as S from './AppStyles'
import Header from '../components/SharedComponents/Header'
import Routes from '../config/routes'

const App = () => {
  return (
    <S.AppContainer>
      <Header />
      <Routes />
    </S.AppContainer>
  )
}

export default App;
