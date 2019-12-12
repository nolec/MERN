import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
 ${reset};

 * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Raleway', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  background-color: #fff;
  color: #333;
}

a {
  color: #17a2b8;
  text-decoration: none;
}

ul {
  list-style: none;
}

img {
  width: 100%;
}
`;

export default globalStyles;
