import React from "react";
import { motion } from "framer-motion";

import { Layout } from "@components";

import "@styles/globals.css";


const App = ({ Component, pageProps }: {
  Component: React.FC<any>;
  pageProps: any;
}): JSX.Element => (
  <Layout>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Component {...pageProps} />
    </motion.div>
  </Layout>
);

export default App;
