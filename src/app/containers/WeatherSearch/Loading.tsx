import React from "react";

import Image from "next/image";

export const Loading = () => {
  return (
    <div className="loader-container">
      <Image
        width={40}
        height={40}
        className="loader"
        src="/loader.svg"
        alt="loader"
      />
    </div>
  );
};
