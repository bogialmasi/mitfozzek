import { title, subtitle } from "@/components/primitives";

export default function AboutPage() {
  return (
    <div>
      <h1 className={title()}>Mit főzzek?</h1>
      <div className={subtitle({ class: "mt-4" })}>
        A mitfőzzek célja a mindennapok megkönnyítése azzal, hogy az otthonunkban található összetevők alapján az igényeinknek megfelelő fogásokat készíthettünk.
        Emellett a spájzunk nyilvántartására, a bevásárlólisták írására, valamint a meal planning étrendtervezésre is megoldást nyújt.
        Használatával csökken az ételek pazarlása, így a környezetünkre is jótékony hatással van.
      </div>
    </div>
  );
}
