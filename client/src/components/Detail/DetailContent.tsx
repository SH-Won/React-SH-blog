import React from 'react'
import styled from 'styled-components';
import { ArticleTypes } from '../../services/api';

const ContentContainer = styled.div`
margin:0 auto;
width:100%;

`

const DetailContent : React.FC<{data : React.ReactElement | null}> = ({data}) => {

  return (
    <ContentContainer>
    {data}
    </ContentContainer>
  )
}

export default DetailContent