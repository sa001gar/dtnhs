
/**
 * Custom Tailwind CSS extensions that can be imported in other files
 */

export const customAnimations = {
  keyframes: {
    "pulse-slow": {
      "0%, 100%": { opacity: "0.6" },
      "50%": { opacity: "0.8" }
    }
  },
  animation: {
    "pulse-slow": "pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite"
  }
};
