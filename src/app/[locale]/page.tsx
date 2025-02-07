import Typewriter from "@/cuicui/other/text-animation/typewritter/typewritter";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();
  return (
    <div className="text-xl flex items-center justify-center h-screen px-2">
      <p className="whitespace-pre-wrap">
        <span>{t("ui.home.t1")}</span>
        <Typewriter
          text={[
            t("ui.home.t2"),
            t("ui.home.t3"),
            t("ui.home.t4"),
            t("ui.home.t5"),
            t("ui.home.t6"),
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
