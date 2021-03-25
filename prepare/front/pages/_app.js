import PropTypes from "prop-types";
import "antd/dist/antd.css";
import wrapper from "../store/configureStore";
import Head from "next/head";

const Nodebird = ({ Component }) => {
  return (
    <>
    <Head>
      <meta charSet="utf-8"/>
      <title>NodeBird</title>
    </Head>
      <Component />
    </>
  );
};


Nodebird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(Nodebird)
