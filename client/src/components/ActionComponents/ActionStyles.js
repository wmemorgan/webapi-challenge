import styled from 'styled-components'
import { color, colorScheme, fontSizing, flex, breakpoints } from '../DesignComponents/theme'

export const ActionBoardContainer = styled.div`
  width: 95%;
  max-width: 800px;
  ${flex('column', 'center')};
  margin-top: 20px;
  padding-bottom: 20px;
  border: 1px solid ${color.primaryDark};
  border-radius: 5px;

  h2 {
      margin: 20px 0;
      text-align: center;
      color: ${colorScheme.headingColor};
      font-size: ${fontSizing.s};
  }
`


export const ActionFormContainer = styled.div`
  width: 100%;
   ${flex('column')}
  
  form {
    width: 80%;
  }

`

export const FormContainer = styled.form`
  width: 95%;
  max-width: 600px;
  font-size: ${fontSizing.xs};
`

export const FormGroup = styled.div`
  width: 100%;
  ${flex('row', 'center', 'space-between')}
  
  
  & input  {
    width: 42%;
    height: 40px
    padding: 5px;
    border: 1px solid ${colorScheme.defaultBorderColor};
    border-radius: 5px;
    font-size: ${fontSizing.xs};
  }

  button {
    width: 10%;
    height: 40px;
    border: 1px solid ${colorScheme.defaultBorderColor};
    color: ${color.lightText};
    background: ${color.accent}
    border-radius: 5px;
    font-size: ${fontSizing.ml};
    font-weight: bold;
    cursor: pointer;
  }

  button:hover {
    border: 1px solid ${color.accent};
    color: ${color.accent};
    background: ${color.lightText};
  }
`

export const ActionListContainer = styled.div`
    width: 95%;
    max-width: 600px;
    ${flex('column', 'flex-start')};

    ul {
      width: 100%;
      padding: 0;
      list-style-type: none;
    }
`

export const ActionContainer = styled.div`
    width: 100%;
    ${flex('row', 'baseline', 'space-between')};
    margin: 5px 0;
    padding-left: 10px;
    border: 1px solid ${colorScheme.defaultBorderColor};
    border-radius: 5px;

    div {
      padding: 5px 0;
      font-size: ${fontSizing.xs};
    }

    div:last-child {
      justify-self: 'flex-end';
      flex: 0 0 14%;
    }

    i {
      justify-self: 'flex-end';
      font-size: ${fontSizing.xs};
    }
`

export const ActionList = styled.div`
    ${flex('row')};
    width: 100%;
    
    @media ${breakpoints[0]} {
      ${flex('column', 'center')};
    }

`

export const ActionItemWrapper = styled.div`
  ${flex('column')};
  flex: 0 0 86%;

`

export const ItemGroup = styled.div`
  width: 100%;
  
`

export const Action = styled.div`
    
`

export const DeleteContainer = styled.div`
  flex: 0 0 2%;
  ${flex('column', 'flex-end')};

  .fa-ellipsis-v, .fa-edit {
    margin: 5px;
  }

  .fa-ellipsis-v, .fa-trash, .fa-edit {
    cursor: pointer;
  }  
`

export const CheckBoxGroup = styled.div`
  align-self: flex-start;
  width: 85px;
  ${flex('row', 'center', 'space-between')}
  margin: 10px 0;
  font-size: ${fontSizing.s};
`