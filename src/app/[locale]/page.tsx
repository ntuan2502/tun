import Typewriter from "@/cuicui/other/text-animation/typewritter/typewritter";

export default function Home() {
  return (
    <div className="text-xl flex items-center justify-center h-screen px-2">
      <p className="whitespace-pre-wrap">
        <span>{"We're born 🌞 to "}</span>
        <Typewriter
          text={[
            "experience",
            "dance",
            "love",
            "be alive",
            "create things that make the world a better place",
          ]}
          speed={70}
          className="text-yellow-500"
          waitTime={1500}
          deleteSpeed={40}
          cursorChar={"_"}
        />
      </p>
    </div>
  );
}
