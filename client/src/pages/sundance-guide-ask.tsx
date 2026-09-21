import { useEffect } from "react";
import { useLocation } from "wouter";

export default function SundanceGuideAsk() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation("/sundance/guide/plan#ask-guide", { replace: true });
  }, [setLocation]);
  return null;
}