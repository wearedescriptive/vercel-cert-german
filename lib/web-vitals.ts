import { onCLS, onINP, onLCP } from "web-vitals";

export function registerWebVitals() {
  onLCP((metric) => {
    console.log("LCP:", metric.value, "ms", "Target: <250ms");
  });

  onINP((metric) => {
    console.log("INP:", metric.value, "ms", "Target: <200ms");
  });

  onCLS((metric) => {
    console.log("CLS:", metric.value, "Target: <0.1");
  });
}
