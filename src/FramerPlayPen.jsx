import { motion } from "framer-motion";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const boxCss = css`
  width: 100px;
  height: 100px;
  background: blue;
`;

export function FramerMotionPlayPen() {
  return (
    <div>
      <button>click for animation</button>
      <motion.div css={boxCss}></motion.div>
    </div>
  );
}
