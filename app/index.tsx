// app/index.tsx
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Use a timeout to ensure the layout component is mounted
    const timer = setTimeout(() => {
      router.replace("/Menu");
    }, 0); 

    return () => clearTimeout(timer);  // Cleanup timer on unmount
  }, [router]);

  return null;
}
