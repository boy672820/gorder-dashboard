declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

// ----------------------------------------------------------------------

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
    tablet: 640,
    laptop: 1024,
    desktop: 1200,
  },
};

export default breakpoints;
