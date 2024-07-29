import hero_image from "../public/hero_image.jpg";
import Link from "next/link";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${hero_image.src})`,
        }}
      >
        <div className="hero-overlay bg-opacity-75"></div>
        <div className="hero-content text-neutral-content text-start">
          <div className="max-w-2xl">
            <h1 className="mb-5 text-5xl font-bold text-warning">
              Salad Maker
            </h1>
            <p className="mb-5 text-base">
              Create delicious salads effortlessly with Salad Maker. Select
              ingredients, customize flavors, and enjoy a fresh, healthy meal
              tailored to your taste. Simplify meal prep and explore endless
              salad possibilities with our intuitive app.
            </p>
            <Link href="pages/salad-maker" className="btn btn-warning">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
