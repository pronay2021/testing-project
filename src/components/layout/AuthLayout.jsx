export default function AuthLayout({ image, imageAlt, children, wide = false }) {
  return (
    <main className="min-h-screen bg-white md:grid md:grid-cols-2">
      <div className="bg-white p-4 sm:p-6 md:sticky md:top-0 md:h-screen md:p-8">
        <img
          src={image}
          alt={imageAlt}
          className="h-64 w-full rounded-2xl object-cover shadow-sm sm:h-80 md:h-[calc(100vh-4rem)]"
        />
      </div>
      <section className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#e7faf3_0%,#f4fdf9_46%,#ffffff_100%)] px-5 py-10 sm:px-10">
        <div className={`w-full ${wide ? "max-w-[560px]" : "max-w-[460px]"}`}>{children}</div>
      </section>
    </main>
  );
}
