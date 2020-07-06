import { createGlobalStyle } from 'styled-components';

const TermsStyles = createGlobalStyle`

:root {
  --primary700: #101c4c;
  --primary600: #182a72;
  --primary100: #f4f5fb;
  --deepgrey: #343742;
  --primary400: #2946be;
  --grey500: #525561;
  --primary500: #203898;
  --white: #ffffff;
  --grey200: #dcdee1;
  --primary200: #e1e7ff;
  --orange: #ffa100;
  --green400: #44c46d;
  --grey300: #b9bcc1;
  --black: #141721;
  --red: #fc2b38;
  --primary300: #a9b5e5;
  --grey400: #8d909d;
  --grey100: #f5f6f6;
}

.terms .content{
  margin-bottom: 24px;
  margin:8px 0;
  width: 100%;
}

.terms .title {
  padding-top: var(--defaultPadding);
  padding-left: var(--defaultPadding);
  padding-right: var(--defaultPadding);
  
  font-size: 17px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.18;
  letter-spacing: 0.2px;
  color: var(--black);
}

.terms .subtitle {
  padding-top: 8px;
  padding-left: var(--defaultPadding);
  padding-right: var(--defaultPadding);

  font-size: 14px;
  line-height: 1.43;
  letter-spacing: 0.17px;
  color: var(--black);
}

.terms .subtitle p {
  color: var(--deepgrey);
}
.terms .label {
  margin-bottom: -2px;
  padding-left: var(--defaultPadding);
  padding-right: var(--defaultPadding);
}

.terms .label ul {
  list-style-type: decimal;
  list-style-position: outside;
  padding-left: 16px;
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: 0.17px;
  color: var(--black);
}

.terms .label li {
  counter-increment: any-name;
  padding-left: 1em;
  padding-bottom: 8px;
  text-indent: -0.1em;
}

.terms .top-space{
  margin-top: 16px;
}

.terms .table-title {
  margin-top: 36px;
  padding-left: var(--defaultPadding);
  padding-right: var(--defaultPadding);
  
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: 0.17px;
  color: var(--black);
}

.terms .table {
  margin-top: 8px;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: 0.17px;
  color: var(--black);
}

.terms .table-space{
  padding-left:16px;
  padding-right: 16px;
}

.terms .table table {
  width: 100%;
}

.terms .table tr {
  border: 1px solid var(--grey200);
}

.terms .table th{
  padding: 8px;
  vertical-align: middle;
  text-align: center;
  background-color:var(--primary100);
}

.terms .table td {
  padding: 12px 8px 10px 8px;
  vertical-align: top;
  text-align: left;
  
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: 0.17px;
  color: var(--deepgrey);
}

.terms .table td.highlight{
  font-weight: bold;
  color: var(--black);
}

`;

export default TermsStyles;
