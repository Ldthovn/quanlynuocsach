import styled from 'styled-components'

export const AuthLayoutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${props => props.bg}) no-repeat center center/cover;
  min-height: 100vh;
`
export const FormWrapper = styled.section`
  padding: 30px;
  width: 370px;
  background: rgba(0, 21, 41, 0.8);
  border-radius: 4px;
  .ant-form-item-label {
    label {
      color: white;
    }
  }
`
export const Logo = styled.div`
  text-align: center;
  margin-bottom: 24px;
`
export const Title = styled.h1`
  text-align: center;
  font-size: 21px;
  font-weight: bold;
  color: white;
  margin-bottom: 24px;
`
