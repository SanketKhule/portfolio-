import { GradientText } from '@/components/animate-ui/primitives/texts/gradient';

interface GradientTextDemoProps {
  neon: boolean;
}

export const GradientTextDemo = ({ neon }: GradientTextDemoProps) => {
  return (
    <GradientText
      className="mx-auto mb-4 block w-full max-w-5xl text-center text-[clamp(1rem,0.9rem+1vw,2rem)] leading-normal font-semibold whitespace-normal wrap-break-word"
      text="Motivated Full Stack Developer with hands-on experience in creating responsive and dynamic web applications. I’m eager to contribute, learn quickly, and deliver impactful solutions in a professional environment."
    />
  );
};

export default function Page() {
  return <GradientTextDemo neon={true} />;
}