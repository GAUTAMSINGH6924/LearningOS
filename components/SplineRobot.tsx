"use client";
import dynamic from "next/dynamic";
//import Spline from "@splinetool/react-spline";
// ✅ load Spline safely
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className="text-white"></div>,
});
export default function SplineRobot() {
  return (
    <Spline scene="https://prod.spline.design/eiN6zBNiuWxycNix/scene.splinecode" />
  );
} 
