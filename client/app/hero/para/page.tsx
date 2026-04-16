import {
  TypingText,
  TypingTextCursor,
} from '@/components/animate-ui/primitives/texts/typing';

interface TypingTextDemoProps {
  delay: number;
  holdDelay: number;
  loop: boolean;
  cursor: boolean;
}

export const TypingTextDemo = ({
  delay,
  holdDelay,
  loop,
  cursor,
}: TypingTextDemoProps) => {
  return (
    <TypingText
      key={`${delay}-${holdDelay}-${loop}-${cursor}`}
      delay={delay}
      holdDelay={holdDelay}
      className=" font-light text-black dark:text-gray-300"
      text="Passionate fresher developer focused on building responsive and user-friendly web applications.
Continuously learning and creating real-world projects to grow in the tech industry."
      
    >
    </TypingText>
  );
};

export default function Page() {
  return <TypingTextDemo delay={100} holdDelay={1000} loop={true} cursor={true} />;
}