/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { sectionContainer } from "./Rules";
import { useState } from "react";
import { TriangleSVG } from "./TriangleSVG";
export function RuleSection({ title, content }) {
  const [visible, setVisible] = useState(false);
  return (
    <div css={sectionContainer}>
      <div onClick={() => setVisible((n) => !n)}>
        <h3>{title}</h3>
        <TriangleSVG></TriangleSVG>
      </div>
      {visible && content}
    </div>
  );
}
