/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
export function WhiteOutlineText({ text, fillCss }) {
  return (
    <svg width={100} height={100}>
      <filter id="myfilter">
        <feMorphology
          operator={dilate}
          radius={4}
          in="SourceAlpha"
          result="BEVEL"
        ></feMorphology>
        <feFlood floodColor="var(--off-white)" result="COLOR-WHITE"></feFlood>
        <feComposite
          in="COLOR-WHITE"
          in2="BEVEL"
          operator="in"
          result="WHITE-BEVEL"
        ></feComposite>
        <feMerge result="FINISH">
          <feMergeNode in="WHITE-BEVEL"></feMergeNode>
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <g>
        <text
          width={20}
          height={20}
          x="50%"
          y="50%"
          css={[
            fillCss,
            css`
              font-size: 4.5rem;
              filter: url(#myfilter);
            `,
          ]}
        >
          {text}
        </text>
      </g>
    </svg>
  );
}
