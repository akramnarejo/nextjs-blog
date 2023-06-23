"use client"
import React, { useEffect, useRef } from 'react';

function ParseHTML({ htmlString }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(htmlString, 'text/html');
    const { body } = parsedHtml;

    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    
    containerRef.current.appendChild(body);
  }, [htmlString]);

  return <div ref={containerRef}></div>;
}

export default ParseHTML;
