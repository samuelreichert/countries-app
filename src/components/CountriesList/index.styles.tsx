import styled from 'styled-components'
import { colors } from '../shared/constants'

const { white, ligthModeBlue } = colors

interface FlagProps {
  flag: string
}


export const Content = styled.div`
  color: ${ligthModeBlue};
  padding: 18px 18px 30px;
`

export const Flag = styled.div`
  background-image: url(${(props: FlagProps) => props.flag});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  height: 128px;
  width: 100%;
`

export const Link = styled.a`
  background-color: ${white};
  border-radius: 6px;
  box-shadow: 0px 0px 8px 0px rgba(133,133,133,0.2);
  cursor: pointer;
  display: inline-block;
  margin-bottom: 52px;
  overflow: hidden;
  position: relative;
  width: 210px;
`

export const Text = styled.p`
  font-size: 11px;
  font-weight: 300;
  margin-bottom: 4px;

  b {
    font-weight: 600;
  }
`

export const Title = styled.p`
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 12px;
`

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 40px 54px;
  width: 100%;
`
