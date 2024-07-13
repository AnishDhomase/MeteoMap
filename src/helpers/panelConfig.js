export function panelConfig(direction) {
  const configUp = {
    initial: {
      opacity: 0,
      y: -30,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -30,
    },
  };
  const configDown = {
    initial: {
      scaleX: 0,
      y: 200,
    },
    animate: {
      scaleX: 1,
      y: 0,
    },
    exit: {
      // scaleX: 0,
      y: 200,
    },
  };
  const config = direction === "up" ? configUp : configDown;
  return config;
}
