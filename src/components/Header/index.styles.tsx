import styled from 'styled-components'
import { colors } from '../shared/constants'

const { white } = colors

export const HeaderWrapper = styled.div`
  background-color: ${white};
  box-shadow: 0 6px 9px -7px #cecece;
  display: flex;
  justify-content: center;
  width: 100%;
`

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  max-width: 1440px;
  padding: 20px 42px;
  width: 100%;
`

export const ToggleMode = styled.div`
  cursor: pointer;
  font-size: 14px;

  i {
    margin-right: 8px;
  }
`
