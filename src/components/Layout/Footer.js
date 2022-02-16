import styled from "styled-components";

function Footer() {
  return (
    <Wrapper>
      <h5>
        &copy; {new Date().getFullYear()}
        <span>Foodie</span>
      </h5>
      <h5>All rights reserved</h5>
    </Wrapper>
  );
}
export default Footer;

const Wrapper = styled.footer`
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #8a2b06;
  text-align: center;
  font-size: 1.5rem;
  span {
    color: white;
    margin: 0 0.5rem;
  }
  h5 {
    color: black;
    margin: 0rem;
    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }
  @media (min-width: 800px) {
    flex-direction: row;
  }
`;
