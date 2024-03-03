/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { sectionContainer } from "./Rules";
import { useState } from "react";
import { TriangleSVG } from "./TriangleSVG";
import { AnimatePresence, motion } from "framer-motion";
export function RuleSection({ title, content }) {
  const [visible, setVisible] = useState(false);
  return (
    <div css={sectionContainer}>
      <div onClick={() => setVisible((n) => !n)}>
        <h3>{title}</h3>
        <motion.div animate={(visible && { rotate: 180 }) || { rotate: 0 }}>
          <TriangleSVG></TriangleSVG>
        </motion.div>
      </div>
      <AnimatePresence>
        {visible && (
          <motion.section
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
          >
            {content}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
