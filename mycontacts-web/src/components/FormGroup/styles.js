import styled from 'styled-components';

export const Container = styled.div`
  //sempre que houver um FormGroup seguido de outro FormGroup faca:
  & + & {
    margin-top: 16px;
  }
`;
