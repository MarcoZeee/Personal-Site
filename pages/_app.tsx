import React from "react";
import { motion } from "framer-motion";

import { Layout } from "@components";

import "@styles/globals.css";
import { useClient } from "utils/useClient";


const App = ({ Component, pageProps }: {
  Component: React.FC<any>;
  pageProps: any;
}): JSX.Element| null => { 
  const isClient = useClient();
  return isClient ? (
  <Layout>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Component {...pageProps} />
    </motion.div>
  </Layout>
): null};

export default App;
