import styled from 'styled-components'
import {
  color, colorScheme, fontSizing,
  flex, breakpoints
} from '../DesignComponents/theme'

export const ProjectListContainer = styled.div`
  width: 600px;
  ${flex('column', 'center', 'center')}
  padding: 20px 10px;
  border: 1px solid ${colorScheme.defaultBorderColor};
  border-radius: 5px;
  box-shadow: 0 8px 6px -6px rgba(0,0,0,0.75);
  background: ${color.lightText};
  font-size: ${fontSizing.s};

  h1 {
    font-size: ${fontSizing.l};
    letter-spacing: 0.15rem;
    color: ${colorScheme.headingColor};
  }

  a {
    text-decoration: none;
    color: ${colorScheme.defaultFontColor};
  }

  @media ${breakpoints[0]} {
    width: 100%;
    font-size: ${fontSizing.sm};

    h1 {
      font-size: ${fontSizing.ml};
    }
  }


`

export const Preview = styled.div`
  width: 500px;
  ${flex('column','center','center')}
  margin: 10px 0;
  padding: 10px;
  border: 1px solid ${colorScheme.defaultBorderColor};
  border-radius: 5px;
  background: ${color.primaryBgShading};
  font-size: ${fontSizing.xs};
  cursor: pointer;

  & div {
    margin: 5px 0;
  }

  & div:first-child {
    font-weight: bold;
  }

  &:hover {
    color: ${color.lightText};
    background: ${colorScheme.defaultFontColor};
  } 

`

export const ProjectInfoContainer = styled.div`
  ${flex('column','center')};
  width: 600px;
  margin: 20px 0;
  padding-bottom: 20px;
  border: 1px solid ${colorScheme.defaultBorderColor};
  border-radius: 5px;
  box-shadow:  0 8px 6px -6px rgba(0,0,0,0.75);
  background: ${color.lightText};

  @media ${breakpoints[0]} {
    width: 100%;
  }

  header {
    width: 100%;
    ${flex('row', 'center', 'flex-end')};
    margin: 0;
    padding: 10px;
    border-radius: 5px 5px 0 0;
    background: linear-gradient(to top, #cccccc 0%, #d6d6d6 1px, #ebebeb 100%); 
    
    @media ${breakpoints[0]} {
      padding: 5px;
    }

    i {
        margin: 0 10px;
        font-size: ${fontSizing.xs};
        cursor: pointer;
    }
  }

  .project-info {
    ${flex('column', 'flex-start', 'center')}
    padding: 20px;

    h3 {
      margin: 10px 0;
      font-size: ${fontSizing.m};
      letter-spacing: 0.15rem;
      color: ${colorScheme.headingColor};
    }

    input:first-child {
      margin: 10px 0;
      font-size: ${fontSizing.m};
    }
    
    .project-stats {
      display: grid;
      grid-template-columns: 1fr 4fr;
      grid-gap: 10px;
      
      & * {
        font-size: ${fontSizing.s};

        @media ${breakpoints[0]} {
          font-size: ${fontSizing.xs};
        }
      }

      .stat-category {
        font-weight: bold;
        color: ${color.primaryDark};
      }

      .stat-data {
        font-size: ${fontSizing.xs};
        word-spacing: 1.4;
        line-height: 1.4;
      }
      

    }

    @media ${breakpoints[0]} {
      h3 {
        font-size: ${fontSizing.sm};
      }

      .stat-data {
        font-size: ${fontSizing.xxs};
      }
    }
}

`

export const ButtonMenu = styled.nav`
  align-self: center;
  width: 80%;
  margin-top: 20px;
  display: ${props => !props.edit ? 'none' : 'flex'};
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    width: 100px;
    font-size: ${fontSizing.m};
  }

  @media ${breakpoints[0]} {
    button {
      font-size: ${fontSizing.s};
      margin-bottom: 20px;
    }
  }
`

export const SpinnerContainer = styled.div`
  width: 90%;
  ${flex('column', 'center', 'center')};
  background: ${color.primaryBgShading};
  color: ${color.primaryColor};
`

export const CheckBoxGroup = styled.div`
  align-self: flex-start;
  width: 105px;
  ${flex('row', 'center', 'space-between')}
  font-size: ${fontSizing.s};
  font-weight: bold;
  color: ${color.emphasis};
`

