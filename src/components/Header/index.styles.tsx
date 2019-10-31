import styled from 'styled-components'
import { colors } from '../shared/constants'

const { white, ligthModeBlue } = colors

export const HeaderWrapper = styled.div`
  align-items: center;
  background-color: ${white};
  box-shadow: 0px 0px 8px 0px rgba(133,133,133,0.2);
  color: ${ligthModeBlue};
  display: flex;
  justify-content: space-between;
  padding: 20px 54px;
  width: 100%;
`

export const ToggleMode = styled.div`
  cursor: pointer;
  font-size: 14px;

  i {
    margin-right: 8px;
  }
`
