import Link from "next/link";

export default function Hero() {
  return (
    <section className="text-center">
      <div className="container max-w-screen-xl mx-auto flex flex-col justify-between items-center py-10 px-4">
        <h1 className="text-4xl md:text-5xl xl:text-6xl font-medium text-gray-800 leading-tight xl:leading-normal">
          Simplify Your Design Workflow
        </h1>

        <p className="text-lg md:text-xl text-gray-600 font-normal max-w-[700px] mt-3">
          Say goodbye to the hassle of picking the perfect colors and fonts.
          Whether you&apos;re an aspiring designer or seasoned professional, our
          platform empowers you to create, organize, and preview unique color
          palettes and typography sets—all in one place.
        </p>

        <Link href="/workspace" className="btn-primary mt-10">
          Start Creating
        </Link>

        <img
          src="/assets/project-ss.png"
          alt="Design Workflow Illustration"
          className="rounded-lg mt-8 max-w-[800px] w-full border-4 border-primary-600 p-2 shadow-lg"
        />
      </div>
    </section>
  );
}
