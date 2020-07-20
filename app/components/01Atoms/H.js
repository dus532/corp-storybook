import styled from 'styled-components';

const H1 = styled.h1`
  margin: ${({ margin }) => margin || 0};
  color: ${({ color }) => color || 'inherit'};
  font-weight: ${({ fontWeight }) => fontWeight || 'inherit'};
`;

const H2 = styled.h2`
  margin: ${({ margin }) => margin || 0};
  color: ${({ color }) => color || 'inherit'};
  font-weight: ${({ fontWeight }) => fontWeight || 'inherit'};
`;

const H3 = styled.h3`
  margin: ${({ margin }) => margin || 0};
  color: ${({ color }) => color || 'inherit'};
  font-weight: ${({ fontWeight }) => fontWeight || 'inherit'};
`;

const H4 = styled.h4`
  margin: ${({ margin }) => margin || 0};
  color: ${({ color }) => color || 'inherit'};
  font-weight: ${({ fontWeight }) => fontWeight || 'inherit'};
`;

const H5 = styled.h5`
  margin: ${({ margin }) => margin || 0};
  color: ${({ color }) => color || 'inherit'};
  font-weight: ${({ fontWeight }) => fontWeight || 'inherit'};
`;

const H6 = styled.h6`
  margin: ${({ margin }) => margin || 0};
  color: ${({ color }) => color || 'inherit'};
  font-weight: ${({ fontWeight }) => fontWeight || 'inherit'};
`;

const Sub = styled.sub`
  margin: ${({ margin }) => margin || 0};
  color: ${({ color }) => color || 'inherit'};
  font-weight: ${({ fontWeight }) => fontWeight || 'inherit'};
`;

export { H1, H2, H3, H4, H5, H6, Sub };
