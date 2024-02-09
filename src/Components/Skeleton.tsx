import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
    <ContentLoader
        speed={2}
        width={280}
        height={360}
        viewBox="0 0 280 360"
        backgroundColor="rgba(61, 159, 126, 0.3)"
        foregroundColor="rgba(61, 159, 126, 0.5)"
    >
        <circle cx="168" cy="192" r="3" />
        <rect x="0" y="430" rx="0" ry="0" width="100" height="16" />
        <rect x="168" y="410" rx="10" ry="10" width="105" height="40" />
        <rect x="0" y="300" rx="10" ry="10" width="280" height="60" />
        <rect x="0" y="0" rx="25" ry="25" width="280" height="280" />
    </ContentLoader>
);

export default Skeleton;
